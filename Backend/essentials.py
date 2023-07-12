from models import *
from schemas import * 
from database import get_sess
from datetime import datetime
import calendar
import json

from sqlalchemy.sql import func
from sqlalchemy import desc

from Path import BestPath

def PrevTrips(user):
    db=get_sess()
    qry=db.query(Trip.End_ID.label("End"),func.count(Trip.End_ID).label("Num")).filter(books.Passg_ID==user).filter(books.Trip_ID==Trip.Trip_ID).group_by(Trip.End_ID).order_by(desc("Num")).limit(5)
    temp=db.execute(qry)

    Frequent=[]
    for entry in temp:
        temp=location(name=entry.End,trips=entry.Num)
        Frequent.append(temp.dict())

    return Frequent


def TopTrips():
    db=get_sess()
    qry=db.query(Trip.End_ID.label("End"),func.count(Trip.End_ID).label("Num")).filter(Trip.Status=="Ongoing").group_by(Trip.End_ID).order_by(desc("Num")).limit(6)
    temp=db.execute(qry)

    Top=[]
    for entry in temp:
        temp=location(name=entry.End,trips=entry.Num)
        Top.append(temp.dict())

    return Top

def Congestion():
    db=get_sess()

    here=db.query(Location).all()
    res=[]

    for entry in here:
        temp_=db.query(adjacency).filter(adjacency.Location_ID==entry.Location_ID).all()
        count=0
        for i in temp_:
            count+=i.Congestion
        temp=cord(x=entry.Cord_X,y=entry.Cord_Y)
        res.append((count,entry.Location_ID,temp.dict()))

    res.sort(reverse=True)

    res=res[0:6]

    result=[]

    for entry in res:
        result.append(entry[2])

    return result

def Live(user=None):
    db=get_sess()
    Cords=[]
    if user:
        trips=db.query(Trip).filter(Driver.Driver_ID==Trip.Driver_ID,Driver.Employee_ID==user,Trip.Status!="Completed",Trip.Status!="SOS").all()
    else:
         trips=db.query(Trip).filter(Trip.Status!="Completed",Trip.Status!="SOS").all()
    for entry in trips:
        temp:Location=db.query(Location).get(entry.At_ID)
        Cords.append(cord(x=temp.Cord_X,y=temp.Cord_Y).dict())
    
    return Cords

def timstamp(here,type=False):
    try:
        temp=datetime.strptime(str(here), '%Y-%m-%d %H:%M:%S.%f')
    except:
        try:
            temp=datetime.strptime(str(here), '%Y-%m-%d %H:%M:%S')
        except:
            temp=datetime.strptime(str(here), '%Y-%m-%d')
            return f'{temp.day} {calendar.month_abbr[temp.month]}\'{temp.year}'

    if(type):
        return temp
    return f'{temp.day} {calendar.month_abbr[temp.month]}\'{temp.year} {temp.hour}:{temp.minute}'
    # return temp.strftime("%d-%m'%y %H:%M")

def Modification(a,b):
    A=None;B=None
    A_=None;B_=None
    try:
        A=datetime.strptime(str(a), '%Y-%m-%d %H:%M:%S.%f')
        B=datetime.strptime(str(b), '%Y-%m-%d %H:%M:%S.%f')
        A_=f'{A.day} {calendar.month_abbr[A.month]}\'{A.year} {A.hour}:{A.minute}'
        B_=f'{B.day} {calendar.month_abbr[B.month]}\'{B.year} {B.hour}:{B.minute}'
    except:
        try:
            A=datetime.strptime(str(a), '%Y-%m-%d %H:%M:%S')
            B=datetime.strptime(str(b), '%Y-%m-%d %H:%M:%S')
            A_=f'{A.day} {calendar.month_abbr[A.month]}\'{A.year} {A.hour}:{A.minute}'
            B_=f'{B.day} {calendar.month_abbr[B.month]}\'{B.year} {B.hour}:{B.minute}'
        except:
            A=datetime.strptime(str(a), '%Y-%m-%d')
            B=datetime.strptime(str(b), '%Y-%m-%d')
            A_=f'{A.day} {calendar.month_abbr[A.month]}\'{A.year}'
            B_=f'{B.day} {calendar.month_abbr[B.month]}\'{B.year}'
            
    return A_ if A>B else B_

def available(at,to,user):
    db=get_sess()
    if(at and to):
        lst=db.query(Cab).filter(Cab.At_ID==at,((Cab.Status=="Operating")|(Cab.Status=="Shared"))).all()
        result=[]
        count=1
        for entry in lst:
            driver:Driver=db.query(Driver).get(db.query(drives).get(entry.Vehicle_number).Driver_ID)
            tripID=None
            space=3
            typ="Available"
            if(entry.Status=="Shared"):
                trip=db.query(Trip).filter(Trip.Status=="Ongoing",Trip.Driver_ID==driver.Driver_ID).first()
                tripID=trip.Trip_ID
                if(trip.End_ID!=to):
                    continue
                space=db.query(shares).get(tripID).Space
                typ="Sharing"

            cate="View"
            req=db.query(Requests).filter(Requests.Driver_ID==driver.Driver_ID,Requests.Passg_ID==user).first()
            if(req):
                cate="Request"
                typ=req.Type
            temp=View_trips(category=cate,trip=tripID,id=count,space=space,model=entry.Company+" "+entry.Model,vehicle=entry.Vehicle_number,driver=driver.Driver_ID,rating=driver.Rating,typ=typ,at=at)
            result.append(temp.dict())
            count+=1
        return result
    return []

def Ongoing(user,data,driver=False):
    db=get_sess()
    trip=None
    if(not(driver)):
        temp=db.query(books).filter(books.Passg_ID==user).all()
        for entry in temp:
            trip:Trip=db.query(Trip).filter(Trip.Status!="Completed",Trip.Status!="SOS",Trip.Trip_ID==entry.Trip_ID).first()
            if(trip):
                break
    else:
        trip:Trip=db.query(Trip).filter(Trip.Status!="Completed",Trip.Status!="SOS",Trip.Driver_ID==user).first()

    temp=On_Trip(id=trip.Trip_ID,driver=trip.Driver_ID,typ=trip.Type,at=trip.At_ID,pick=trip.Start_ID,drop=trip.End_ID,fare=trip.Fare)

    drop,at,pathDone,pathDue,PathList=Path(data,start=trip.Start_ID,at=trip.At_ID,end=trip.End_ID)

    return {"main":temp.dict(),"metadata":{
        "drop":drop,
        "at":at,
        "pathDone":pathDone,
        "pathDue":pathDue,
        "PathList":PathList
    }}

def Path(data,at,start,end):

    db=get_sess()
    At_:Location=db.query(Location).get(at)

    At={"x":At_.Cord_X,"y":At_.Cord_Y}

    Drop_:Location=db.query(Location).get(end)

    Drop={"x":Drop_.Cord_X,"y":Drop_.Cord_Y}

    if(not(data)):
        PathList=BestPath(start,end)
    elif(not(json.loads(data))):
         PathList=BestPath(start,end)
    elif(len(json.loads(data))!=5):
        PathList=BestPath(start,end)
    else:
        temp=json.loads(data)
        PathList=temp["PathList"]

    Due=[];Done=[]

    found=False
    for entry in PathList:
        temp:Location=db.query(Location).get(entry)
        if(not(found)):
            Done.append(temp.Cord_X)
            Done.append(temp.Cord_Y)
            if(entry==At_.Location_ID):
                Due.append(temp.Cord_X)
                Due.append(temp.Cord_Y)
                found=True
        else:
            Due.append(temp.Cord_X)
            Due.append(temp.Cord_Y)

    return Drop,At,Done,Due,PathList

def requests(driver):
    db=get_sess()
    temp=db.query(Requests).filter(Requests.Driver_ID==driver).all()
    res=[]
    count=1
    for entry in temp:
        temp_=req(id=count,drop=entry.Drop_ID,fare=entry.Fare,type=entry.Type,passg=entry.Passg_ID)
        count+=1
        res.append(temp_.dict())

    return res

def Revenue():
    db=get_sess()
    temp=db.query(Transaction).all()
    count=0

    for entry in temp:
        if(today(entry.Timestamp)):
            count+=entry.Fare

    return count

def today(a):
    A=timstamp(a,True)
    B=datetime.now()

    return (A.year==B.year and A.month==B.month and A.day==B.day)

