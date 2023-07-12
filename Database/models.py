from sqlalchemy import Column,Integer,String,TIMESTAMP,Date,Boolean,FLOAT
from database import Base


class Person(Base):
    __tablename__="Person"
    User_ID=Column(String,primary_key=True)
    Password=Column(String)
    Token=Column(String)
    First_Name=Column(String)
    Last_Name=Column(String)
    Gender=Column(String)
    Birthday=Column(Date)
    Address_Line_1=Column(String)
    Address_Line_2=Column(String)
    Address_City=Column(String)
    Address_State=Column(String)
    Address_Postal_code=Column(Integer)
    Joining_date=Column(Date)
    Profile_image=Column(Boolean)
    last_update=Column(TIMESTAMP)

class Passenger(Base):
    __tablename__="Passenger"
    Passg_ID=Column(String,primary_key=True)
    Wallet_balance=Column(FLOAT)
    last_update=Column(TIMESTAMP)

class Driver(Base):
    __tablename__="Driver"
    Driver_ID=Column(String,primary_key=True)
    Admin_ID=Column(String)
    Employee_ID=Column(String)
    Status=Column(String)
    Rating=Column(FLOAT)
    Trips=Column(Integer)
    Salary=Column(FLOAT)
    last_update=Column(TIMESTAMP)

class Admin(Base):
    __tablename__="Admin"
    Admin_ID=Column(String,primary_key=True)
    Salary=Column(FLOAT)
    last_update=Column(TIMESTAMP)

class Employee(Base):
    __tablename__="Employee"
    Employee_ID=Column(String,primary_key=True)
    Admin_ID=Column(String)
    Salary=Column(FLOAT)
    Department=Column(String)
    last_update=Column(TIMESTAMP)