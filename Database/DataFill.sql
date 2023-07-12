insert into Person values('admin','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','admin','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')
insert into Person values('employee','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','employee','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')
insert into Person values('driver','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','driver','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')
insert into Person values('passg','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','passg','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')
insert into Person values('1','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','1','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')

insert into Admin values('admin',1,'2008-10-6 14:34:13')
insert into Employee values('employee','admin',1,'Design','2008-10-6 14:34:13')
insert into Driver values('driver','admin','employee','Test',0,0,1,'2008-10-6 14:34:13')
insert into Passenger values('passg',0,0,0,NULL,'2008-10-6 14:34:13')
insert into Passenger values('1',0,0,0,NULL,'2008-10-6 14:34:13')


insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Parking','admin','Parking','2008-10-6 14:34:13',651, 255);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_1','admin','Juction','2018-9-13 2:32:51',777, 320);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('BasketBall Arena','admin','Park','2015-9-23 22:58:34',677, 372);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Enchanted Garden','admin','Hotel','2019-1-21 0:22:15',805, 334);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_2','admin','Juction','2000-4-25 8:36:24',871, 367);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Delegata','admin','Office','2021-8-10 4:43:49',006, 433);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Club Quarters','admin','Dining','2009-12-31 23:21:53',010, 316);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_3','admin','Junction','2001-6-1 8:38:7',047, 297);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Simple Meals','admin','Dining','2014-12-12 21:5:55',102, 271);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('World Trade Park','admin','Market','2022-9-1 15:37:8',957, 251);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Cura Hospitality','admin','Hospital','2004-1-3 17:45:57',180, 362);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_4','admin','Junction','2009-6-18 1:31:39',237, 391);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('The Sprice Route','admin','Dining','2006-3-18 23:42:35',280, 412);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_6','admin','Junction','2012-7-1 12:3:50',397, 475);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Officearc','admin','Theatre','2016-3-21 7:24:59',319, 515);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_7','admin','Junction','2017-2-8 8:20:37',243, 552);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_8','admin','Junction','2021-7-18 8:34:21',084, 631);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('TrustEdge Store','admin','Market','2023-6-26 19:21:44',988, 681);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_9','admin','Junction','2010-8-14 8:2:35',835, 755);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Quarterbacks','admin','Office','2013-3-27 0:46:41',760, 795);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Stack Office','admin','Office','2021-6-22 9:34:22',758, 717);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_10','admin','Junction','2015-9-30 19:23:58',689, 682);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_5','admin','Junction','2005-4-12 10:41:43',090, 476);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Drawbridge','admin','Office','2013-7-13 10:43:5',800, 620);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Spinfluence','admin','Office','2010-1-15 20:16:56',600,1000);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_11','admin','Junction','2000-1-23 7:17:5',939, 553);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Canvas Field','admin','Park','2004-12-2 7:43:55',853, 508);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_12','admin','Junction','2021-6-14 17:58:11',722, 440);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Technologent','admin','Office','2014-4-24 20:51:15',769, 418);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('BaseBall Arena','admin','Park','2000-4-9 13:9:58',659, 473);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Officioty','admin','Office','2022-1-13 7:35:13',574, 514);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_13','admin','Junction','2004-8-1 18:22:34',473, 552);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Sparkline','admin','Office','2017-3-10 7:5:54',470, 615);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('FootBall Arena','admin','Park','2005-6-15 23:32:7',286, 455);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('PeopleScout Park','admin','Park','2008-12-23 16:38:20',410, 517);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('Junction_14','admin','Juction','2022-10-29 16:24:49',408, 584);
insert into Location (Location_ID,Admin_ID,Type,last_update,Cord_X,Cord_Y)  values ('OpenHouse','admin','Theatre','2004-9-26 9:45:6',328, 625);


insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Parking','Junction_1','East',5,'2020-1-24 12:40:48')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_1','BasketBall Arena','North',4,'2018-11-18 20:12:12')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_1','Enchanted Garden','East',1,'2005-7-5 15:22:24')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_1','Parking','West',5,'2020-12-9 19:3:11')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('BasketBall Arena','Junction_1','South',4,'2015-5-12 2:5:45')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Enchanted Garden','Junction_2','East',3,'2018-4-15 8:18:21')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Enchanted Garden','Junction_1','West',1,'2007-6-12 11:37:49')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_2','Technologent','North',3,'2015-11-5 11:59:33')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_2','Delegata','East',5,'2020-3-26 1:46:16')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_2','Club Quarters','South',4,'2014-3-16 15:38:30')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_2','Enchanted Garden','West',3,'2005-12-6 12:41:8')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Delegata','Junction_5','East',3,'2015-2-19 12:50:56')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Delegata','Junction_2','West',5,'2002-4-28 19:59:9')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Club Quarters','Junction_2','North',4,'2002-1-24 7:30:27')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Club Quarters','Junction_3','South',1,'2012-12-14 19:36:30')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_3','Club Quarters','North',1,'2019-1-10 17:33:43')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_3','Cura Hospitality','East',6,'2010-12-18 11:13:33')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_3','Simple Meals','South',2,'2008-2-25 8:41:47')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_3','World Trade Park','West',3,'2010-6-23 17:56:18')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Simple Meals','Junction_3','North',2,'2004-7-9 20:54:34')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('World Trade Park','Junction_3','East',3,'2018-2-9 9:56:57')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Cura Hospitality','Junction_4','East',3,'2002-10-2 2:27:24')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Cura Hospitality','Junction_3','West',6,'2009-11-28 21:9:13')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_4','Junction_5','North',6,'2001-5-15 7:24:49')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_4','The Sprice Route','East',2,'2011-2-21 21:9:27')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_4','Cura Hospitality','West',3,'2010-12-14 7:26:57')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('The Sprice Route','Junction_6','East',5,'2008-6-18 2:7:17')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('The Sprice Route','Junction_4','West',2,'2008-4-22 9:54:0')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_6','Officearc','North',3,'2003-4-3 13:35:20')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_6','The Sprice Route','West',5,'2011-12-3 5:47:0')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Officearc','Junction_7','North',4,'2011-10-2 13:37:40')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Officearc','Junction_6','South',3,'2008-2-1 23:29:14')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_7','Junction_8','North',8,'2011-12-29 13:40:5')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_7','Officearc','South',4,'2006-12-3 19:56:28')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_7','Junction_5','West',6,'2012-7-18 2:44:54')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_8','TrustEdge Store','North',3,'2018-6-10 8:22:50')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_8','Junction_7','South',8,'2009-4-24 16:8:18')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_8','Junction_11','West',7,'2012-12-11 5:3:5')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('TrustEdge Store','Junction_9','North',7,'2016-8-29 6:27:19')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('TrustEdge Store','Junction_8','South',3,'2020-7-27 10:17:9')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_9','Quarterbacks','North',2,'2022-5-22 13:4:46')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_9','TrustEdge Store','South',7,'2008-3-27 15:24:23')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_9','Stack Office','West',3,'2004-2-12 2:48:16')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Quarterbacks','Junction_9','South',2,'2013-9-27 9:39:2')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Stack Office','Junction_9','East',3,'2006-3-30 5:43:36')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Stack Office','Junction_10','West',3,'2008-1-2 13:53:3')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_10','Stack Office','East',3,'2016-2-4 1:34:45')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_10','Drawbridge','South',5,'2019-9-29 6:59:28')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_10','Sparkline','West',10,'2021-5-29 23:48:5')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_5','Spinfluence','North',3,'2022-7-18 22:37:45')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_5','Junction_7','East',6,'2007-8-28 3:34:57')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_5','Junction_4','South',6,'2010-10-20 17:55:59')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_5','Delegata','West',3,'2018-3-26 18:0:47')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Drawbridge','Junction_10','North',5,'2019-5-6 8:11:26')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Drawbridge','Junction_11','South',7,'2013-1-16 9:18:58')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Spinfluence','Junction_11','North',4,'2011-2-13 3:15:55')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Spinfluence','Junction_5','South',3,'2006-11-15 14:9:49')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_11','Drawbridge','North',7,'2006-7-29 21:24:47')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_11','Junction_8','East',7,'2008-2-18 19:39:56')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_11','Spinfluence','South',4,'2022-8-6 11:31:37')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_11','Canvas Field','West',3,'2020-9-6 8:50:13')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Canvas Field','Junction_12','West',6,'2009-9-21 13:22:7')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_12','BaseBall Arena','North',2,'2003-3-31 16:46:5')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_12','Canvas Field','East',6,'2022-10-22 15:33:43')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_12','Technologent','South',2,'2010-12-5 17:34:46')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Technologent','Junction_12','North',2,'2010-4-14 22:38:0')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Technologent','Junction_2','South',3,'2002-7-31 22:3:55')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('BaseBall Arena','Officioty','North',3,'2003-11-7 1:21:46')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('BaseBall Arena','Junction_12','South',2,'2001-11-1 0:2:43')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Officioty','Junction_13','North',2,'2006-4-10 5:31:44')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Officioty','BaseBall Arena','South',3,'2022-5-2 6:56:12')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_13','Junction_14','North',3,'2002-3-3 2:43:14')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_13','Officioty','South',2,'2003-1-20 16:4:24')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_13','PeopleScout Park','West',3,'2020-11-19 14:25:39')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Sparkline','Junction_10','East',12,'2022-5-9 20:31:32')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Sparkline','Junction_14','West',2,'2013-12-28 13:2:47')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('FootBall Arena','PeopleScout Park','East',5,'2021-6-8 0:21:39')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('PeopleScout Park','Junction_13','East',3,'2008-12-31 8:58:4')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('PeopleScout Park','FootBall Arena','West',5,'2015-7-10 11:16:42')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_14','OpenHouse','North',3,'2003-4-29 8:37:25')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_14','Sparkline','East',2,'2016-6-14 13:12:11')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('Junction_14','Junction_13','South',3,'2018-2-12 3:11:31')
insert into adjacency (Location_ID,Adjacent_ID,Direction,Congestion,last_update) values  ('OpenHouse','Junction_14','South',3,'2016-2-7 9:56:3')

insert into Person values('driver_','$2b$12$e4xvpBE4RlBBhBcJTtdt/OQEuHrcZIMlIHUGnmw0cnj/4XA7jDcdy','driver','last','Male','2023-05-05','line1','line2','city','state',123,'2023-05-05',0,'2008-10-6 14:34:13')

insert into Cab values('52OX54_','admin','Parking','Test','Toyota','Innova',2013,'2008-10-6 14:34:13')
insert into Cab values('52OX54','admin','Parking','Test','Toyota','Innova',2013,'2008-10-6 14:34:13')

insert into Driver values('driver_','admin','employee','Test',0,0,1,'2008-10-6 14:34:13')

insert into drives (Driver_ID,Vehicle_number) values('driver','52OX54')
insert into drives (Driver_ID,Vehicle_number) values('driver_','52OX54_')