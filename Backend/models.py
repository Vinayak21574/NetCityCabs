from sqlalchemy import Column,Integer,String,TIMESTAMP,Date,FLOAT,BigInteger
from database import Base


class Person(Base):
    __tablename__="Person"
    User_ID=Column(String,primary_key=True)
    Password=Column(String)
    First_Name=Column(String)
    Last_Name=Column(String)
    Gender=Column(String)
    Birthday=Column(Date)
    Address=Column(String)
    Joining_date=Column(Date)
    last_update=Column(TIMESTAMP)

class Passenger(Base):
    __tablename__="Passenger"
    Passg_ID=Column(String,primary_key=True)
    Wallet_balance=Column(FLOAT)
    Savings=Column(FLOAT)
    Trips=Column(Integer)
    lastTrip=Column(Integer,nullable=True)
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
    lastTrip=Column(Integer,nullable=True)
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

class Requests(Base):
    __tablename__="Requests"
    Driver_ID=Column(String,primary_key=True)
    Passg_ID=Column(String,primary_key=True)
    Status=Column(String,default="Pending")
    Drop_ID=Column(String)
    Pickup_ID=Column(String)
    Fare=Column(FLOAT)
    Type=Column(String)

class Cab(Base):
    __tablename__="Cab"
    Vehicle_number=Column(String,primary_key=True)
    Admin_ID=Column(String)
    At_ID=Column(Integer)
    Status=Column(String)
    Company=Column(String)
    Model=Column(String)
    Year=Column(Integer)
    last_update=Column(TIMESTAMP)

class drives(Base):
    __tablename__="drives"
    Driver_ID=Column(String)
    Vehicle_number=Column(String,primary_key=True)
    last_update=Column(TIMESTAMP)

class Trip(Base):
    __tablename__="Trips"
    Trip_ID=Column(Integer,primary_key=True,autoincrement=True)
    Driver_ID=Column(String)
    At_ID=Column(Integer)
    Start_ID=Column(Integer)
    End_ID=Column(Integer)
    Fare=Column(FLOAT)
    Type=Column(String)
    Status=Column(String)
    last_update=Column(TIMESTAMP)

class shares(Base):
    __tablename__="shares"
    Trip_ID=Column(Integer,primary_key=True)
    Space=Column(Integer)

class books(Base):
    __tablename__="books"
    Trip_ID=Column(Integer,primary_key=True)
    Passg_ID=Column(String,primary_key=True)
    Timestamp=Column(TIMESTAMP)






class Location(Base):
    __tablename__="Location"
    Location_ID=Column(String,primary_key=True)
    Admin_ID=Column(String)
    Type=Column(String)
    last_update=Column(TIMESTAMP)
    Cord_X=Column(Integer)
    Cord_Y=Column(Integer)



class Transaction(Base):
    __tablename__="Transactions"
    Passg_ID=Column(String,primary_key=True)
    Trip_ID=Column(Integer,primary_key=True)
    Mode=Column(String)
    Fare=Column(FLOAT)
    Rating=Column(Integer)
    Timestamp=Column(TIMESTAMP)



class adjacency(Base):
    __tablename__="adjacency"
    Edge_ID=Column(Integer,primary_key=True)
    Location_ID=Column(String)
    Adjacent_ID=Column(String)
    Congestion=Column(Integer)
    last_update=Column(TIMESTAMP)

class Contacts(Base):
    __tablename__="Contacts"
    Phone_Number=Column(BigInteger,primary_key=True)
    User_ID=Column(String)
    last_update=Column(TIMESTAMP)