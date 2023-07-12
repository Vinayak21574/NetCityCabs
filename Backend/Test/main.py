from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from fastapi import Depends, FastAPI,HTTPException,status,APIRouter
from pydantic import BaseModel
from typing import Union
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

from time import time

class Person(BaseModel):
    Username:str|None
    Password:str|None


scheme=OAuth2PasswordBearer(tokenUrl="/token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1

dummy=Person(**{"Username":"1","Password":f'{pwd_context.hash("1")}'})
db={dummy.Username:dummy}


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
   )


details_exception= HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password",
    headers={"Authenticate": "Bearer"},
   )
      

# router = APIRouter(tags=["authentication"])
app=FastAPI()


async def fetchUser(token:str=Depends(scheme)):
    print(token)
    try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        
    except JWTError:
        raise credentials_exception
    
    for entry in db.keys():
        dummy=db[entry]
        if username == dummy.Username:
            return dummy

    return credentials_exception


def create_access_token(username):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode={"sub":username,"exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate(usr,pas):
    if usr in db:
        return pwd_context.verify(pas,db[usr].Password)
    return False


@app.post("/token")
async def token_generate(temp : OAuth2PasswordRequestForm = Depends()):
    if validate(temp.username,temp.password):
        access_token = create_access_token(dummy.Username)
        return {"access_token":access_token,"token_type":"Bearer"}
    raise details_exception


@app.get("/")
async def here(User=Depends(fetchUser)):
   return "Authenticated"