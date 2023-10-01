import json
from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import *
from schemas import *
from exceptions import *
from time import sleep
from datetime import datetime
# from schemas import *
from security import AdminAccess, fetchUser,validate
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.sql import func

from essentials import *

from Path import *

app = FastAPI(title="NetCityCabs")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from database import get_db, get_sess
import security
app.include_router(security.router)

PERCENTAGE_INCOME=0.5

@app.get("/")
async def here():
    # global count
    # # temp=db.query(Person).get('1')
    # sleep(1)
    # count+=1
    # return count-1

    return "BackendTested"

@app.post("/logout")
async def here(User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    if(db.query(Passenger).get(User.id)):
        return
    if(db.query(Driver).get(User.id)):
        temp=db.query(Trip).filter(Trip.Driver_ID==User.id,((Trip.Status=='Ongoing')|(Trip.Status=='PendingPayment'))).all()
        if temp:
            return
        else:
            db.query(drives).filter(drives.Driver_ID==User.id).delete()
            db.commit()
        return
    if(db.query(Employee).get(User.id)):
        return "Employee"
    return "Admin"
    # return "Passg"


@app.post("/Home/Passg")
async def here(User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    sleep(1)

    dummy:Passenger=db.query(Passenger).get(User.id)
    LastTrip=None

    if(dummy.lastTrip):
        trip:Trip=db.query(Trip).get(dummy.lastTrip)
        rate=db.query(Transaction).filter(Transaction.Passg_ID==User.id,Transaction.Trip_ID==trip.Trip_ID).first()
        if(rate):
            rate=rate.Rating
        else:
            rate=0
        LastTrip=prev(start=trip.Start_ID,end=trip.End_ID,fare=trip.Fare,rating=rate,available="Yes")

    result=Home_Passg(wallet=dummy.Wallet_balance,trips=dummy.Trips,savings=dummy.Savings,last=LastTrip,top=PrevTrips(User.id),latest=TopTrips())

    return {"ID":"Passg","AT":"Home","BODY":result}


@app.post("/balance")
async def here(args:str,user:User=Depends(fetchUser),db:Session=Depends(get_db)):
    temp=float(json.loads(args)["topUp"])
    dummy:Passenger=db.query(Passenger).get(user.id)

    dummy.Wallet_balance=temp+dummy.Wallet_balance
    db.commit()


@app.post("/History/Passg")
async def here(User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    # sleep(1)
    temp=db.query(books).filter(books.Passg_ID==User.id).all()
    temp.reverse()
    res=[]
    count=1
    for entry in temp:
        trip:Trip=db.query(Trip).get(entry.Trip_ID)
        trans:Transaction=db.query(Transaction).filter(Transaction.Passg_ID==User.id,Transaction.Trip_ID==trip.Trip_ID).first()
        if(trans):
            temp_=History_Passg(id=count,TripID=entry.Trip_ID,start=trip.Start_ID,end=trip.End_ID,fare=trip.Fare,time=timstamp(trans.Timestamp),driver=trip.Driver_ID,mode=trans.Mode,status=trip.Status,typ=trip.Type,rating=trans.Rating)
            res.append(temp_.dict())
            count+=1

    return {"ID":"Passg","AT":"History","BODY":res}


@app.post("/Book/Passg")
async def here(data,dummy:User=Depends(fetchUser),db:Session=Depends(get_db)):
    temp:Requests=db.query(Requests).filter(Requests.Passg_ID==dummy.id).all()

    if(temp):
        if(temp[0].Status=="Pending"):
            return {"ID":"Passg","AT":"Book","BODY":{
                    "stage":"Requested",
                    "from":temp[0].Pickup_ID,
                    "to":temp[0].Drop_ID,
                    "content":available(at=temp[0].Pickup_ID,to=temp[0].Drop_ID,user=dummy.id),
                }}
        elif(temp[0].Status=="Accepted"):
            return {"ID":"Passg","AT":"Book","BODY":{
                    "stage":"Accepted",
                    "content":Ongoing(dummy.id,data),
                }}
        else:
            return {"ID":"Passg","AT":"Book","BODY":{
                "stage":"Completed",
                "content":Ongoing(dummy.id,data),
            }}
    else:
        if(data):
            try:
                at=json.loads(data)["from"]
                to=json.loads(data)["to"]
            except:
                at=None
                to=None
            return {"ID":"Passg","AT":"Book","BODY":{"stage":"View","content":available(at,to,user=dummy.id)}}
        else:
            return {"ID":"Passg","AT":"Book","BODY":{"stage":"View","content":[]}}
    
@app.post("/Book/Request")
async def here(args:str,User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    args=json.loads(args)

    sleep(1)
    if(not(db.query(Requests).filter(Requests.Driver_ID==args["driver"],Requests.Passg_ID==User.id).first())):
        # print("HEHEHEHEHEE")
        temp:Requests=Requests(Driver_ID=args["driver"],Passg_ID=User.id,Drop_ID=args["to"],Pickup_ID=args["from"],Fare=1,Type=args["typ"],Status="Accepted")
        db.add(temp)
        db.commit()
    
    return True

@app.post("/Book/SOS")
async def here(args:str,User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    args=json.loads(args)
    trip:Trip=db.query(Trip).filter(Trip.Trip_ID==int(args["trip"])).update({Trip.Status:'SOS'})
    db.commit()
    
    return True

@app.post("/Book/Pay")
async def here(args:str,User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    args=json.loads(args)
    print(args)


    sleep(1)

    trip:Trip=db.query(Trip).get(int(args["trip"]))
    dummy:Passenger=db.query(Passenger).get(User.id)

    if(args["mode"]=="Wallet" and dummy.Wallet_balance<trip.Fare):
        raise credentials_exception
    
    temp:Transaction=Transaction(Passg_ID=dummy.Passg_ID,Trip_ID=trip.Trip_ID,Mode=args["mode"],Fare=trip.Fare,Rating=args["rate"],Timestamp=current_timestamp())
    db.add(temp)
    db.commit()
    return True


@app.post("/History/Driver")
async def here(User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    # sleep(1)
    temp=db.query(Trip).filter(Trip.Driver_ID==User.id).all()
    temp.reverse()
    res=[]
    count=1
    for entry in temp:
        trip:Trip=db.query(Trip).get(entry.Trip_ID)
        trans:Transaction=db.query(Transaction).filter(Transaction.Trip_ID==trip.Trip_ID).all()

        for itr in trans:
            if(itr):
                temp_=History_Driver(id=count,TripID=entry.Trip_ID,start=trip.Start_ID,end=trip.End_ID,fare=trip.Fare,time=timstamp(itr.Timestamp),passg=itr.Passg_ID,mode=itr.Mode,status=trip.Status,typ=trip.Type,rating=itr.Rating)
                res.append(temp_.dict())
                count+=1
    return {"ID":"Driver","AT":"History","BODY":res}


@app.post("/Home/Driver")
async def here(User:User=Depends(fetchUser),db:Session=Depends(get_db)):
    sleep(1)

    dummy:Driver=db.query(Driver).get(User.id)
    LastTrip=None

    if(dummy.lastTrip):
        trip:Trip=db.query(Trip).get(dummy.lastTrip)
        temp=db.query(Transaction).filter(Transaction.Trip_ID==trip.Trip_ID).all()
        rate=0
        fare=0
        for entry in temp:
            rate+=(entry.Rating/len(temp))
            fare+=entry.Fare

        LastTrip=prev(start=trip.Start_ID,end=trip.End_ID,fare=trip.Fare,rating=rate)

    money=0
    qry=db.query(Trip.Fare,func.sum(Trip.Fare).label("Money")).filter(Trip.Driver_ID=='driver',Trip.Status=="Completed").group_by(Trip.Fare)
    temp=db.execute(qry)
    for entry in temp:
        money=entry[1]
    
    money*=PERCENTAGE_INCOME

    cab:Cab=db.query(Cab).get(db.query(drives).filter(drives.Driver_ID==dummy.Driver_ID).first().Vehicle_number)

    temp=Cab_S(at=cab.At_ID,space=3,vehicle=cab.Vehicle_number,model=cab.Company+" "+cab.Model)
    

    result=Home_Driver(salary=dummy.Salary,trips=dummy.Trips,income=money,last=LastTrip,cab=temp,latest=TopTrips(),rating=dummy.Rating)

    return {"ID":"Driver","AT":"Home","BODY":result}


@app.post("/Trip/Driver")
async def here(data,dummy:User=Depends(fetchUser),db:Session=Depends(get_db)):
    temp:Requests=db.query(Requests).filter(Requests.Driver_ID==dummy.id).all()

    if(temp):
        flag=False
        for entry in temp:
            if(entry.Status!="Pending"):
                flag=True
                break

        if(not(flag)):
            return {"ID":"Driver","AT":"Trip","BODY":{
                    "stage":"View",
                    "content":requests(dummy.id),
                }}
        # TODO 
        else:
            flag=False
            for entry in temp:
                if(entry.Status=="Fulfilled"):
                    print(entry.Status)
                    flag=True
                    break

            if(not(flag)):
                return {"ID":"Driver","AT":"Trip","BODY":{
                            "stage":"Accepted",
                            "content":Ongoing(dummy.id,data,True),
                        }}
            else:
                return {"ID":"Driver","AT":"Trip","BODY":{
                            "stage":"Completed",
                            "content":Ongoing(dummy.id,data,True),
                        }}
    else:
        return {"ID":"Driver","AT":"Trip","BODY":{"stage":"View","content":requests(dummy.id)}}


@app.post("/Reject")
async def here(args,dummy:User=Depends(fetchUser),db:Session=Depends(get_db)):
    passg=json.loads(args)["passg"]
    db.query(Requests).filter(Requests.Driver_ID==dummy.id,Requests.Passg_ID==passg).delete()
    db.commit()

@app.post("/Accept")
async def here(args,dummy:User=Depends(fetchUser),db:Session=Depends(get_db)):
    passg=json.loads(args)["passg"]
    db.query(Requests).filter(Requests.Driver_ID==dummy.id,Requests.Passg_ID==passg).update({Requests.Status:"Accepted"})
    db.commit()

@app.post("/Travel")
async def here(args,dummy:User=Depends(fetchUser),db:Session=Depends(get_db)):
    args=json.loads(args)
    pathList=args["PathList"]
    temp=db.query(Trip).filter(Trip.Driver_ID==dummy.id,Trip.Status=="Ongoing").first()

    at=temp.At_ID
    next=None
    flag=False
    for entry in pathList:
        if(at==entry):
            flag=True
            continue
        if(flag):
            next=entry
            break

    print(at,pathList,next)
    db.query(Trip).filter(Trip.Trip_ID==temp.Trip_ID).update({Trip.At_ID:next})
    name=db.query(books).filter(books.Trip_ID==temp.Trip_ID).first().Passg_ID
    name=db.query(Requests).filter(Requests.Passg_ID==name).first().Driver_ID
    name=db.query(drives).filter(drives.Driver_ID==name).first().Vehicle_number
    db.query(Cab).filter(Cab.Vehicle_number==name).update({Cab.At_ID:next})
    db.commit()
    print(args)

@app.post("/Home/Employee")
async def here(data:str|None=None,User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    emp:Employee=db.query(Employee).get(User.id)

    count=len(db.query(Trip).filter(Driver.Driver_ID==Trip.Driver_ID,Driver.Employee_ID==User.id,Trip.Status!="Completed",Trip.Status!="SOS").all())

    temp=db.query(Driver).filter(Driver.Employee_ID==User.id).order_by(desc(Driver.Rating)).limit(5)

    temp_=[]
    for entry in temp:
        here=RankDrv(name=entry.Driver_ID,rating=entry.Rating)
        temp_.append(here.dict())

    result=None

    if(data):
        data=json.loads(data)
        if(data=="Live Trips"):
            result={"Live Trips":Live(User.id)}
        elif(data=="Busy Areas"):
            result={"Busy Areas":Congestion()}
        elif(data=="Hotspots"):
            result={"Hotspots":TopTrips()}
    else:
        result={"Live Trips":Live(User.id)}

    temp=Home_Emp(salary=emp.Salary,dept=emp.Department,trips=count,top=temp_)

    return {"ID":"Employee","AT":"Home","BODY":{
        "content":temp.dict(),
        "view":result
        }
    }

@app.post("/Locations/Employee")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    here=db.query(Location).all()
    res=[]

    for entry in here:
        temp_=db.query(adjacency).filter(adjacency.Location_ID==entry.Location_ID).all()
        count=0
        for i in temp_:
            count+=i.Congestion
        temp=Loction(admin=entry.Admin_ID,id=entry.Location_ID,congestion=count,typ=entry.Type)
        res.append(temp.dict())

    return {"ID":"Employee","AT":"Locations","BODY":res}


@app.post("/Drivers/Employee")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]
    temp=db.query(Driver).filter(Driver.Employee_ID==User.id).all()
    count=1
    for entry in temp:
        model="-"
        at="-"
        cab="-"
        curr="-"
        temp_=db.query(drives).filter(drives.Driver_ID==entry.Driver_ID).first()
        if(temp_):
            temp_:Cab=db.query(Cab).get(temp_.Vehicle_number)
            at=temp_.At_ID
            cab=temp_.Vehicle_number
            model=temp_.Company+" "+temp_.Model
        temp_=db.query(Trip).filter(Trip.Driver_ID==User.id,Trip.Status!="SOS",Trip.Status!="Completed").first()
        if(temp_):
            curr=temp_.Trip_ID+ f'({temp_.Type})'

        temp_=drivers(id=count,name=entry.Driver_ID,status=entry.Status,rating=entry.Rating,trips=entry.Trips,salary=entry.Salary,cab=cab,at=at,model=model,curr=curr)
        count+=1
        res.append(temp_.dict())


    return {"ID":"Employee","AT":"Drivers","BODY":res}



@app.post("/Trips/Employee")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]

    temp=db.query(Trip).filter(Driver.Driver_ID==Trip.Driver_ID,Driver.Employee_ID==User.id).all()
    temp.reverse()

    count=1

    for entry in temp:
        at="-"
        if(entry.Status!="Completed" and entry.Status!="PendingPayment"):
            at=entry.At_ID
        temp_=MyTrips(id=count,Tripid=entry.Trip_ID,status=entry.Status,driver=entry.Driver_ID,typ=entry.Type,at=at,start=entry.Start_ID,end=entry.End_ID,fare=entry.Fare,time=timstamp(entry.last_update))
        res.append(temp_.dict())
        count+=1

    return {"ID":"Employee","AT":"Trips","BODY":res}



@app.post("/Home/Admin")
async def here(data:str|None=None,User:User=Depends(AdminAccess),db:Session=Depends(get_db)):

    result=None

    if(data):
        data=json.loads(data)
        if(data=="Live Trips"):
            result={"Live Trips":Live()}
        elif(data=="Busy Areas"):
            result={"Busy Areas":Congestion()}
        elif(data=="Hotspots"):
            result={"Hotspots":TopTrips()}
    else:
        result={"Live Trips":Live()}

    adm:Admin=db.query(Admin).get(User.id)

    count=len(db.query(Trip).filter(Driver.Driver_ID==Trip.Driver_ID,Trip.Status!="Completed",Trip.Status!="SOS").all())

    temp=db.query(Driver).order_by(desc(Driver.Rating)).limit(5)

    temp_=[]
    for entry in temp:
        here=RankDrv(name=entry.Driver_ID,rating=entry.Rating)
        temp_.append(here.dict())

    
    users=len(db.query(Passenger).all())
    

    res=Home_Admin(salary=adm.Salary,trips=count,top=temp_,rev=Revenue(),users=users)

    return {"ID":"Admin","AT":"Home","BODY":{
        "content":res.dict(),
        "view":result
        }
    }

@app.post("/Locations/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    here=db.query(Location).all()
    res=[]

    for entry in here:
        temp_=db.query(adjacency).filter(adjacency.Location_ID==entry.Location_ID).all()
        count=0
        for i in temp_:
            count+=i.Congestion
        temp=Loction(admin=entry.Admin_ID,id=entry.Location_ID,congestion=count,typ=entry.Type)
        res.append(temp.dict())

    return {"ID":"Admin","AT":"Locations","BODY":res}

@app.post("/Trips/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]

    temp=db.query(Trip).all()
    temp.reverse()

    count=1

    for entry in temp:
        at="-"
        if(entry.Status!="Completed" and entry.Status!="PendingPayment"):
            at=entry.At_ID
        temp_=MyTrips(id=count,Tripid=entry.Trip_ID,status=entry.Status,driver=entry.Driver_ID,typ=entry.Type,at=at,start=entry.Start_ID,end=entry.End_ID,fare=entry.Fare,time=timstamp(entry.last_update))
        res.append(temp_.dict())
        count+=1

    return {"ID":"Admin","AT":"Trips","BODY":res}

@app.post("/Drivers/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]
    res_=[]
    temp=db.query(Driver).filter().all()
    count=1
    for entry in temp:
        model="-"
        at="-"
        cab="-"
        curr="-"
        temp_=db.query(drives).filter(drives.Driver_ID==entry.Driver_ID).first()
        if(temp_):
            temp_:Cab=db.query(Cab).get(temp_.Vehicle_number)
            at=temp_.At_ID
            cab=temp_.Vehicle_number
            model=temp_.Company+" "+temp_.Model
        temp_=db.query(Trip).filter(Trip.Driver_ID==User.id,Trip.Status!="SOS",Trip.Status!="Completed").first()
        if(temp_):
            curr=temp_.Trip_ID+ f'({temp_.Type})'

        temp_=drivers(id=count,name=entry.Driver_ID,status=entry.Status,rating=entry.Rating,trips=entry.Trips,salary=entry.Salary,cab=cab,at=at,model=model,curr=curr)

        per:Person=db.query(Person).get(entry.Driver_ID)

        here=db.query(Contacts).filter(Contacts.User_ID==entry.Admin_ID).first()
        if(here):
            here=str(here.Phone_Number)
        else:
            here="-"

        temp__=ViewPeople(
                id=count,
                name=entry.Admin_ID,
                first=per.First_Name,last=per.Last_Name,
                gender=per.Gender,birth=timstamp(per.Birthday),
                addr=per.Address,join=timstamp(per.Joining_date),
                update=timstamp(entry.last_update),
                modi=timstamp(per.last_update),
                phone=here,
                typ="Driver"
            )
        
        
        count+=1

        res.append(dict(**temp_.dict(),**{"emp":entry.Employee_ID}))
        res_.append(temp__.dict())

    return {"ID":"Admin","AT":"Drivers","BODY":{"trip":res,"person":res_}}


@app.post("/Cabs/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    here=db.query(Cab).all()
    res=[]

    for entry in here:
        drv=db.query(drives).get(entry.Vehicle_number)
        if(drv):
            drv=drv.Driver_ID
        else:
            drv="-"
        temp=Cab_Admin(at=entry.At_ID,space=3,model=entry.Company+" "+entry.Model,id=entry.Vehicle_number,drv=drv)

        res.append(temp.dict())

    return {"ID":"Admin","AT":"Cabs","BODY":res}


@app.post("/Admins/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]

    temp=db.query(Admin).all()

    count=1

    for entry in temp:
        per:Person=db.query(Person).get(entry.Admin_ID)

        here=db.query(Contacts).filter(Contacts.User_ID==entry.Admin_ID).first()
        if(here):
            here=str(here.Phone_Number)
        else:
            here="-"

        temp_=ViewPeople(
                id=count,
                name=entry.Admin_ID,
                first=per.First_Name,last=per.Last_Name,
                gender=per.Gender,birth=timstamp(per.Birthday),
                addr=per.Address,join=timstamp(per.Joining_date),
                update=timstamp(entry.last_update),
                modi=timstamp(per.last_update),
                phone=here,
                typ="Admin"
            )
        
        count+=1
        
        res.append(dict(**temp_.dict(),**{"salary":entry.Salary}))

    return {"ID":"Admin","AT":"Admins","BODY":res}

@app.post("/Employees/Admin")
async def here(User:User=Depends(AdminAccess),db:Session=Depends(get_db)):
    res=[]

    temp=db.query(Employee).all()

    count=1

    for entry in temp:
        per:Person=db.query(Person).get(entry.Admin_ID)

        here=db.query(Contacts).filter(Contacts.User_ID==entry.Admin_ID).first()
        if(here):
            here=str(here.Phone_Number)
        else:
            here="-"

        temp_=ViewPeople(
                id=count,
                name=entry.Admin_ID,
                first=per.First_Name,last=per.Last_Name,
                gender=per.Gender,birth=timstamp(per.Birthday),
                addr=per.Address,join=timstamp(per.Joining_date),
                update=timstamp(entry.last_update),
                modi=timstamp(per.last_update),
                phone=here,
                typ="Employee"
            )
        
        count+=1
        
        res.append(dict(**temp_.dict(),**{"salary":entry.Salary},**{"dept":entry.Department}))

    return {"ID":"Admin","AT":"Employees","BODY":res}



