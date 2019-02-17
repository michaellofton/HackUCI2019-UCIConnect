create table events(id int not null auto_increment, event_name varchar(100), organizer varchar(100), location varchar(100), startTime datetime, endTime datetime,  event_description longtext, contact varchar(100), primary key(id));
create table attendee(id int not null auto_increment, event_id int, name varchar(100), email varchar(100), primary key(id), foreign key(event_id) references events(id));

insert into events(event_name, event_description, organizer, location, contact, startTime, endTime)
values ("Situation Awareness Olympics", "Figure out what to do in an emergency at your own company!", "Management 4 All", "SBSG 4000", "sanjithv@uci.edu", "2018-05-01 18:00:00", "2018-05-01 23:00:00");

insert into attendee(event_id, name, email) values
(4,"Toto Ferrari", "maranello@oorr.com");
show databases;


select * from attendee;
select * from events;

select * from events order by -startTime desc limit 12;

insert into events(event_name, event_description, organizer, location, contact, startTime, endTime) values ('Bowling Night', 'Bowl with friends!','Bowling at UCI', 'Irvine Lanes', 'sanjithv@uci.edu', '2019-02-14 20:00:00', '2019-02-14 22:22:22');

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';

select event_name, organizer, location,  ifnull(startTime, '2019-01-01 10:00:00'), ifnull(endTime, '2019-01-01 10:00:00'), event_description, contact
from events;

