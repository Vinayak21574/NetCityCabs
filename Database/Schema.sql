-- final schema


-- create database NetCityCabs;

create table Person (
    User_ID varchar(50) NOT NULL,
	[Password] varchar(250) NOT NULL,
	First_Name varchar(30) NOT NULL,
	Last_Name varchar(30) DEFAULT NULL,
	Gender varchar(10) NOT NULL,
    Birthday date NOT NULL,
	Address varchar(250) NOT NULL,
	Joining_date date NOT NULL,
	last_update DATETIME,
	PRIMARY KEY (User_ID)
)

CREATE TABLE Admin (
    Admin_ID varchar(50) NOT NULL,
	Salary float NOT NULL check(Salary>0),
	last_update DATETIME,
	CONSTRAINT admin_key Foreign Key(Admin_ID) REFERENCES Person (User_ID),
    PRIMARY KEY (Admin_ID)
)

CREATE TABLE Employee(
	Employee_ID varchar(50) NOT NULL,
	Admin_ID varchar(50) NOT NULL,
	Salary float NOT NULL check(Salary>0),
	Department varchar(50),
	last_update DATETIME,
	PRIMARY KEY (Employee_ID),
	CONSTRAINT recuiter_employee Foreign Key(Admin_ID) REFERENCES Admin (Admin_ID),
	CONSTRAINT employee_key Foreign Key(Employee_ID) REFERENCES Person (User_ID),
    INDEX emp_admin_index (Admin_ID)
)

CREATE TABLE Driver(
	Driver_ID varchar(50) NOT NULL,
	Admin_ID varchar(50) NOT NULL,
	Employee_ID varchar(50) NOT NULL,
	[Status] varchar(10) DEFAULT NULL,
    -- On Duty Off Duty
	Rating float DEFAULT 0,
    Trips int DEFAULT 0,
	Salary float NOT NULL check(Salary>0),
	last_update DATETIME,
	lastTrip int DEFAULT NULL,
	PRIMARY KEY (Driver_ID),
    CONSTRAINT recuiter_driver Foreign Key(Admin_ID) REFERENCES Admin (Admin_ID),
    CONSTRAINT manager_driver Foreign Key (Employee_ID) REFERENCES Employee(Employee_ID),
	CONSTRAINT driver_key Foreign Key(Driver_ID) REFERENCES Person (User_ID),
	INDEX driver_emp_admin (Employee_ID,Admin_ID)
)

CREATE TABLE Passenger(
	Passg_ID varchar(50) NOT NULL UNIQUE,
	Wallet_balance float NOT NULL DEFAULT 0 check(Wallet_balance>=0),
	Savings float DEFAULT 0,
	Trips int DEFAULT 0,
    lastTrip int DEFAULT NULL,
	last_update DATETIME,
	PRIMARY KEY (Passg_ID),
	CONSTRAINT passg_key Foreign Key(Passg_ID) REFERENCES Person (User_ID),
)

CREATE TABLE Location (
	[Location_ID] varchar(50) NOT NULL,
	Admin_ID varchar(50) NOT NULL,
	[Type] varchar(50) NOT NULL,
	Cord_X int,
	Cord_Y int,
	PRIMARY KEY (Location_ID),
	last_update DATETIME,
    CONSTRAINT location_admin Foreign Key(Admin_ID) REFERENCES Admin (Admin_ID),
)

CREATE TABLE adjacency (
	Edge_ID int IDENTITY(1,1),
	Location_ID varchar(50) NOT NULL,
	Adjacent_ID varchar(50) NOT NULL,
	Congestion int NOT NULL check (Congestion>=0),
	last_update DATETIME,
	PRIMARY KEY (Edge_ID),
    CONSTRAINT location_details Foreign Key (Location_ID) REFERENCES Location (Location_ID),
    CONSTRAINT adjacent_details Foreign Key (Adjacent_ID) REFERENCES Location (Location_ID)
)

CREATE TABLE Cab (
	Vehicle_number varchar(15) NOT NULL,
	Admin_ID varchar(50) NOT NULL,
	At_ID varchar(50) ,
	[Status] varchar(20) NOT NULL default 'Non Operating',
    -- enum("OPerating","Non Operating","Out of Service") NOT NULL DEFAULT 'Non Operating'
	Company varchar(30) NOT NULL,
	Model varchar(30) NOT NULL,
	[Year] int NOT NULL check(Year>0),
	last_update DATETIME,
	PRIMARY KEY (Vehicle_number),
    CONSTRAINT cab_admin Foreign Key(Admin_ID) REFERENCES Admin (Admin_ID),
	CONSTRAINT cab_location Foreign Key(At_ID) REFERENCES Location (Location_ID)
    on update cascade,
)

CREATE TABLE Trips (
	Trip_ID bigint IDENTITY(1,1),
	Driver_ID varchar(50) NOT NULL,
	At_ID varchar(50) DEFAULT NULL,
	Start_ID varchar(50) NOT NULL ,
	End_ID varchar(50) NOT NULL ,
	Fare float NOT NULL DEFAULT 40 check(Fare>0),
    [Type] varchar(10) NOT NULL DEFAULT 'Single',
	-- Type enum('Sharing','Single') NOT NULL DEFAULT 'Single',
    [Status] varchar(20) DEFAULT 'Ongoing',
	-- Status enum('Completed','Ongoing',,'Cancelled','SOS') NOT NULL DEFAULT 'Yet to start',
	last_update DATETIME,
	PRIMARY KEY (Trip_ID),
    CONSTRAINT trip_driver Foreign Key (Driver_ID) REFERENCES Driver (Driver_ID)
	on update cascade,
    CONSTRAINT trip_start Foreign Key (Start_ID) REFERENCES Location (Location_ID),
    CONSTRAINT trip_at Foreign Key (At_ID) REFERENCES Location (Location_ID),
    CONSTRAINT trip_end Foreign Key (End_ID) REFERENCES Location (Location_ID),
    INDEX trip_driver_index (Driver_ID)
)

CREATE TABLE Transactions (
	Passg_ID varchar(50) NOT NULL,
	Trip_ID bigint NOT NULL,
	-- Status enum('Paid','Due','Failed') NOT NULL DEFAULT 'Due',
    Mode varchar(10) not null,
	-- Mode enum('Online','Cash','Wallet') NOT NULL,
	Fare float NOT NULL check(Fare>0),
	Rating INT check(Rating<=5 and Rating>=0),
	[Timestamp] DATETIME DEFAULT NULL,
	PRIMARY KEY (Trip_ID, Passg_ID),
    CONSTRAINT trans_passg Foreign Key (Passg_ID) REFERENCES Passenger (Passg_ID)
	on update cascade,
    CONSTRAINT trans_trip Foreign Key (Trip_ID) REFERENCES Trips (Trip_ID)
)

CREATE TABLE Contacts (
	Phone_Number bigint NOT NULL check (Phone_Number < 999999999999 and Phone_Number >0),
	User_ID varchar(50) NOT NULL,
	last_update DATETIME,
	PRIMARY KEY (Phone_Number),
    constraint phone_user foreign key (User_ID) references Person(User_ID)
)

CREATE TABLE books (
	Trip_ID bigint NOT NULL ,
	Passg_ID varchar(50) NOT NULL,
	[Timestamp] DATETIME NOT NULL,
	PRIMARY KEY (Trip_ID,Passg_ID),
    CONSTRAINT book_trip Foreign Key (Trip_ID) REFERENCES Trips (Trip_ID),
    CONSTRAINT book_passg Foreign Key (Passg_ID) REFERENCES Passenger (Passg_ID),
    INDEX book_passenger (Passg_ID)
)

CREATE TABLE Requests (
	Driver_ID varchar(50) NOT NULL,
	Passg_ID varchar(50) NOT NULL ,
	[Status] varchar(20) DEFAULT 'Pending',
	Drop_ID varchar(50) NOT NULL,
	Pickup_ID varchar(50) NOT NULL,
	Fare float NOT NULL DEFAULT 40 check(Fare>0),
	[Type] varchar(10) NOT NULL DEFAULT 'Single',
    CONSTRAINT request_driver Foreign Key (Driver_ID) REFERENCES Driver (Driver_ID),
    CONSTRAINT request_passg Foreign Key (Passg_ID) REFERENCES Passenger (Passg_ID),
    PRIMARY KEY(PASSG_ID,Driver_ID)
)

CREATE TABLE drives (
	Driver_ID varchar(50) NOT NULL UNIQUE,
	Vehicle_number varchar(15) NOT NULL,
	last_update DATETIME,
	PRIMARY KEY (Vehicle_number),
    CONSTRAINT drives_driver Foreign Key (Driver_ID) REFERENCES Driver (Driver_ID),
    CONSTRAINT drives_cab Foreign KEY (Vehicle_number) REFERENCES Cab (Vehicle_number)
    on update cascade,
    INDEX cab_driver (Vehicle_number)
)

CREATE TABLE shares (
	Trip_ID bigint NOT NULL,
	Space int NOT NULL DEFAULT 3 check (Space<=3 and Space >=0),
	PRIMARY KEY (Trip_ID),
    CONSTRAINT share_trip Foreign Key (Trip_ID) REFERENCES Trips (Trip_ID)
    on update cascade
)

