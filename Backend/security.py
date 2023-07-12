from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from fastapi import Depends,APIRouter
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

from schemas import LogIN,User
from exceptions import *
from database import get_sess
from models import Person,Passenger,Driver,Employee,Admin,Cab,drives

scheme=OAuth2PasswordBearer(tokenUrl="/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


router = APIRouter(tags=["authentication"])


async def fetchUser(token:str=Depends(scheme)):
    db=get_sess()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    temp:Person=db.query(Person).get(username)
    if(temp):
        temp_:Passenger=db.query(Passenger).get(username)
        if(not(temp_)):
            temp_:Driver=db.query(Driver).get(username)
            if(not(temp_)):
                temp_:Employee=db.query(Employee).get(username)
                if(not(temp_)):
                    return User(id=temp.User_ID,typ="Admin")            
                return User(id=temp.User_ID,typ="Employee")
            
            return User(id=temp.User_ID,typ="Driver")
    
        return User(id=temp.User_ID,typ="Passg")

    return credentials_exception

async def AdminAccess(User:User=Depends(fetchUser)):
    if (User.typ=="Employee" or User.typ=="Admin"):
        return User
    raise credentials_exception


def create_access_token(username):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode={"sub":username,"exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate(usr:LogIN):
    db=get_sess()
    temp:Person=db.query(Person).get(usr.User_ID)
    if temp:
        if(pwd_context.verify(usr.Password,temp.Password)):
            if(db.query(Passenger).get(usr.User_ID)):
                return "Passg"
            if(db.query(Driver).get(usr.User_ID)):
                if db.query(Driver).get(usr.User_ID).Status!="On Duty":
                    cab:Cab=db.query(Cab).filter(Cab.Status=="Non Operating").first()
                    temp=drives(Driver_ID=usr.User_ID,Vehicle_number=cab.Vehicle_number)
                    db.add(temp)
                    db.commit()
                return "Driver"
            if(db.query(Employee).get(usr.User_ID)):
                return "Employee"
            return "Admin"
    return False


@router.post("/token")
async def token_generate(temp : OAuth2PasswordRequestForm = Depends()):
    category=validate(LogIN(**{"User_ID":temp.username,"Password":temp.password}))
    if category:
        return {"access_token":create_access_token(temp.username),"category":category}
    raise details_exception


@router.get("/TestToken")
async def here(dummy:User=Depends(fetchUser)):
   return dummy