from pydantic import BaseModel,Field, schema_json_of
from typing import List

class LogIN(BaseModel):
    User_ID:str|None
    Password:str|None

class User(BaseModel):
    id:str
    typ:str

class History_Passg(BaseModel):
    id:int
    TripID:int
    start:str
    end:str
    fare:float
    time:str
    driver:str
    mode:str
    status:str
    typ:str
    rating:int

class location(BaseModel):
    name:str
    trips:int

class prev(BaseModel):
    start:str
    end:str
    fare:float
    rating:int

class Home_Passg(BaseModel):
    wallet:float
    trips:int
    savings:float
    last: prev | None
    top:List[location]
    latest:List[location]

class View_trips(BaseModel):
    id:int
    trip:int|None
    space:int|None
    model:str
    vehicle:str
    driver:str
    rating:float
    typ:str
    at:str
    category:str

class On_Trip(BaseModel):
    id:int
    driver:str
    typ:str
    at:str
    pick:str
    drop:str
    fare:float



class History_Driver(BaseModel):
    id:int
    TripID:int
    start:str
    end:str
    fare:float
    time:str
    passg:str
    mode:str
    status:str
    typ:str
    rating:int

class Cab_S(BaseModel):
    at:str
    space:int|None
    model:str
    vehicle:str

class Home_Driver(BaseModel):
    salary:float
    trips:int
    income:float
    last: prev | None
    cab: Cab_S
    latest:List[location]
    rating:float

class req(BaseModel):
    drop:str
    fare:float
    type:str
    id:int
    passg:str

class Loction(BaseModel):
    id:str
    congestion:int
    typ:str
    admin:str

class drivers(BaseModel):
    id:int
    name:str
    status:str
    rating:float
    trips:int
    salary:float
    cab:str
    at:str
    model:str
    curr:str

class MyTrips(BaseModel):
    id:int
    Tripid:int
    status:str
    driver:str
    typ:str
    at:str
    start:str
    end:str
    fare:float
    time:str

class RankDrv(BaseModel):
    name:str
    rating:float

class cord(BaseModel):
    x:int
    y:int

class Home_Emp(BaseModel):
    salary:float
    dept:str
    trips:int
    top:List[RankDrv]

class Cab_Admin(BaseModel):
    at:str
    space:int|None
    model:str
    id:str
    drv:str

class ViewPeople(BaseModel):
    id:int
    name:str
    first:str
    last:str
    gender:str
    birth:str
    addr:str
    join:str
    update:str
    modi:str
    phone:str
    typ:str


class Home_Admin(BaseModel):
    salary:float
    trips:int
    top:List[RankDrv]
    rev:float
    users:int