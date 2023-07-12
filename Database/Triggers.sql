create trigger lastUpdate_Person on dbo.Person
after update,insert as 
begin 
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Person as here 
    inner join inserted
    on here.User_ID = inserted.User_ID;
end;
GO


create trigger lastUpdate_Admin on dbo.Admin
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Admin as here 
    inner join inserted 
    on here.Admin_ID=inserted.Admin_ID;
end
GO


create trigger lastUpdate_Employee on dbo.Employee
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Employee as here 
    inner join inserted 
    on here.Employee_ID=inserted.Employee_ID;
end
GO


create trigger lastUpdate_Driver on dbo.Driver
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Driver as here 
    inner join inserted 
    on here.Driver_ID=inserted.Driver_ID;
end
GO


create trigger lastUpdate_Passenger on dbo.Passenger
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Passenger as here 
    inner join inserted 
    on here.Passg_ID=inserted.Passg_ID;
end
GO


create trigger lastUpdate_Location on dbo.Location
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Location as here 
    inner join inserted 
    on here.Location_ID=inserted.Location_ID;
end
GO


create trigger lastUpdate_adjacency on dbo.adjacency
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.adjacency as here 
    inner join inserted 
    on here.Edge_ID=inserted.Edge_ID;
end
GO


create trigger lastUpdate_Cab on dbo.Cab
after insert,update as
begin
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Cab as here 
    inner join inserted 
    on here.Vehicle_number=inserted.Vehicle_number;
end
GO


create trigger lastUpdate_Trips on dbo.Trips
after insert,update as 
BEGIN
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Trips as here 
    inner join inserted 
    on here.Trip_ID=inserted.Trip_ID;
END
GO


create trigger lastUpdate_Contacts on dbo.Contacts
after insert,update as 
BEGIN
    update here set last_update=CURRENT_TIMESTAMP
    from dbo.Contacts as here 
    inner join inserted 
    on here.Phone_Number=inserted.Phone_Number;
END
GO


create trigger capacity on dbo.books
after insert AS
if exists(
    select * from dbo.shares inner join inserted as i
    on shares.Trip_ID=i.Trip_ID
    )
BEGIN
    update here set here.[Space]=here.[Space]-1
    from dbo.shares as here inner join inserted as i on 
    here.Trip_ID=i.Trip_ID
END
GO


create trigger rating on dbo.Transactions
after insert as 
    declare @temp int
    select @temp= Rating from inserted
    update here set here.Rating=ROUND((here.Trips*here.Rating + @temp)/(here.Trips+1),2)
    ,here.Trips=here.Trips+1,here.lastTrip=A.Trip_ID
    from dbo.Driver as here inner join 
    (select j.Driver_ID,j.Trip_ID from Trips as j inner join inserted as i on 
    i.Trip_ID=j.Trip_ID) as A
    on here.Driver_ID=A.Driver_ID
GO


create trigger deductWallet on dbo.Transactions
after insert AS
if exists(
    select * from dbo.Transactions inner join inserted as i
    on Transactions.Trip_ID=i.Trip_ID and Transactions.Passg_ID=i.Passg_ID and Transactions.Mode='Wallet'
)
BEGIN
    update here set here.Wallet_balance=here.Wallet_balance-i.Fare
    from dbo.Passenger as here inner join inserted as i 
    on here.Passg_ID=i.Passg_ID
END
GO


create trigger completeTrip on dbo.Transactions
after insert as
BEGIN
    update Passenger set lastTrip=B.Trip_ID,Trips=Trips+1
    from Passenger as here inner join (
        select C.Passg_ID,C.Trip_ID from dbo.books as C inner join inserted as i on C.Trip_ID=i.Trip_ID
    ) as B
    on here.Passg_ID=B.Passg_ID

    update here SET Savings=ROUND(Savings+D.Fare/10,2),Wallet_balance=ROUND(Wallet_balance+D.Fare/10,2)
    from Passenger as here inner join (
        select A.Passg_ID,A.Trip_ID,B.Fare,B.Mode from books as A inner join (
            select C.Trip_ID,C.Fare,i.Mode from Trips as C inner join inserted as i on i.Trip_ID=C.Trip_ID
        ) as B on A.Trip_ID=B.Trip_ID
    ) as D on here.Passg_ID=D.Passg_ID
    where D.Mode='Wallet'
    
    delete here from dbo.Requests as here join
    (select books.Passg_ID from dbo.books inner join inserted as i
        on books.Trip_ID=i.Trip_ID and books.Passg_ID=i.Passg_ID) as A
    on A.Passg_ID=here.Passg_ID

    delete here from dbo.shares as here inner join inserted as i
    on here.Trip_ID=i.Trip_ID

    update dbo.Trips set Status='Completed' where not EXISTS (
        select * from dbo.Requests as here inner join (
            select Driver_ID from Trips as B inner join inserted as i
            on i.Trip_ID=B.Trip_ID
        ) as A
        on A.Driver_ID=here.Driver_ID and here.Status='Fulfilled'
    )
END
GO

create Trigger SOS on dbo.Trips
after update as
if exists (
    select * from inserted where Status='SOS'
)
BEGIN
    delete here from dbo.Requests as here join
    (select books.Passg_ID from dbo.books inner join inserted as i
        on books.Trip_ID=i.Trip_ID) as A
    on A.Passg_ID=here.Passg_ID

    delete here from dbo.shares as here inner join inserted as i
    on here.Trip_ID=i.Trip_ID

    update here set [Status]='Operating'
    from Cab as here inner join (
        select B.Vehicle_Number,B.Driver_ID from drives as B inner join (
            select D.Trip_ID,D.Driver_ID from Trips as D inner join inserted as i
            on i.Trip_ID=D.Trip_ID
        ) as C
        on B.Driver_ID=C.Driver_ID
    ) as A
    on A.Vehicle_Number=here.Vehicle_number

END

GO

create trigger shareCab on Trips
after insert as
if exists(
    select * from inserted where Type='Sharing'
)
BEGIN
    insert into shares (Trip_ID) values ((select Trip_ID from inserted))
    update here set [Status]='Shared'
    from Cab as here inner join (
        select A.Vehicle_number from drives as A inner join inserted as i
        on A.Driver_ID=i.Driver_ID
    ) as B
    on here.Vehicle_number=B.Vehicle_number
END
GO


create Trigger lockCab on Trips
after insert as
if exists(
    select * from inserted where Type='Single'
)
BEGIN
    update here set [Status]='Booked'
    from Cab as here inner join (
        select A.Vehicle_number from drives as A inner join inserted as i
        on A.Driver_ID=i.Driver_ID
    ) as B
    on here.Vehicle_number=B.Vehicle_number
END
GO

create trigger releaseCab on Transactions
after insert as
BEGIN
    update here set [Status]='Operating'
    from Cab as here inner join (
        select B.Vehicle_Number,B.Driver_ID from drives as B inner join (
            select D.Trip_ID,D.Driver_ID from Trips as D inner join inserted as i
            on i.Trip_ID=D.Trip_ID
        ) as C
        on B.Driver_ID=C.Driver_ID
    ) as A
    on A.Vehicle_Number=here.Vehicle_number
END
GO


create trigger bookCab on dbo.Requests
after update AS
if exists (
    -- select * from Driver as here inner join
    --     (select * from inserted as i where i.Status='Accepted') as A
    -- on here.Driver_ID=A.Driver_ID where here.Status='On Duty'

    select count(Driver_ID) from (select * from dbo.Requests as here inner join inserted as i
    on i.Driver_ID=here.Driver_ID where i.Staus='Accepted' and here.Status='Accepted') as A
    group by Driver_ID
    having count(Driver_ID)=1
)
BEGIN
    delete here from Requests as here inner join inserted as i on (here.Driver_ID=i.Driver_ID) and (here.Status='Pending')
    delete here from Requests as here inner join inserted as i on (here.Passg_ID=i.Passg_ID) and (here.Status='Pending')

    -- delete Requests from dbo.Requests as here inner join inserted as i on here.Driver_ID=i.Driver_ID and here.[Status]='Pending'

    declare @drv varchar(50)
    declare @psg varchar(50)
    declare @start varchar(50)
    declare @end varchar(50)
    declare @fare int
    declare @typ varchar(10)
    declare @ID bigint

    select @drv= Driver_ID from inserted
    select @psg= Passg_ID from inserted
    select @end= Drop_ID from inserted
    select @fare= Fare from inserted
    select @typ= [Type] from inserted
    select @start= Pickup_ID from inserted

    insert into Trips (Driver_ID,Start_ID,At_ID,End_ID,Fare,Type) values (@drv,@start,@start,@end,@fare,@typ)
    SELECT @ID=@@IDENTITY
    insert into books values (@ID,@psg,CURRENT_TIMESTAMP)
END
GO

create trigger fullFillRequest on dbo.Trips
after update as
if EXISTS(
    select * from inserted as i where i.At_ID=i.End_ID and i.Status='Ongoing'
)
BEGIN
    update here set here.Status='Fulfilled' from dbo.Requests as here inner join (
        select Passg_ID from books as B inner join inserted as i
        on B.Trip_ID=i.Trip_ID
    ) as A
    on here.Passg_ID=A.Passg_ID

    update here set here.Status='PendingPayment'
    from dbo.Trips as here inner join inserted as i on
    here.Trip_ID=i.Trip_ID
END
GO

create trigger shareAccept on dbo.Requests 
after insert as 
if exists (
    select * from dbo.Requests as here inner join inserted as i
    on i.Driver_ID=here.Driver_ID where here.Status='Accepted' and here.Type='Sharing'
)
BEGIN
    update here set Status='Accepted' from dbo.Requests as here inner join inserted as i
    on i.Passg_ID=here.Passg_ID and i.Driver_ID=here.Driver_ID

    declare @ID bigint
    select @psg= Passg_ID from inserted
    select @drv= Driver_ID from inserted
    select @ID=Trip_ID from dbo.Trips where Status='Ongoing' and Driver_ID=@drv
    insert into books values (@ID,@psg,CURRENT_TIMESTAMP)
END
GO


create trigger Startdrive on dbo.drives 
after insert as 
BEGIN
    update here set here.Status='Operating' from 
    dbo.Cab as here inner join inserted on
    here.Vehicle_number=inserted.Vehicle_number

    update here set here.Status='On Duty' from 
    dbo.Driver as here inner join inserted on
    here.Driver_ID=inserted.Driver_ID
END
GO


create trigger Enddrive on dbo.drives 
after delete as 
BEGIN
    update here set here.Status='Non Operating' from 
    dbo.Cab as here inner join deleted on
    here.Vehicle_number=deleted.Vehicle_number

    update here set here.Status='Off Duty' from 
    dbo.Driver as here inner join deleted on
    here.Driver_ID=deleted.Driver_ID
END
GO


-- use master
-- GO
-- drop DATABASE NetCityCabs;
-- GO



-- sp_who
-- kill 56
-- kill 59
-- kill 69
-- kill 72

-- create database NetCityCabs;
