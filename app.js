require('dotenv').config()

const express = require('express');
const app = express();
const connection = require('./database');
const datetime = require("node-datetime");
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use( express.static( "img" ) );

// app.get('/', (req, res) => res.send('Hello World!'));

app.get("/", function(req,res,next){
    connection.query("select * from events order by -startTime desc limit 10;",
    function(error, results, fields){
        let upcomingEvents = JSON.parse(JSON.stringify(results));
        console.log(upcomingEvents);
        if(error) throw error;
        //replace this line with res.render with whatever ejs file you have created
        res.render("main.ejs", {"upcomingEvents" : upcomingEvents});
    });
});

app.post("/createEvent", function(req,res,next){
    console.log(req.body);
    let eventName = req.body.eventName.toString();
    let eventLocation = req.body.eventLocation.toString();
    let eventDescription = req.body.eventDescription.toString();
    let eventOrganizer = req.body.eventHost.toString();
    let eventContact = req.body.hostContact.toString();
    let eventDate = req.body.eventDate.toString();
    let eventTime = req.body.eventTime.toString();
    let eventStartTime = eventDate + ' ' + eventTime;
    let insertionQuery = "insert into events(event_name, event_description, organizer, location, contact, startTime) values (\'" + eventName + "\', \'" + eventDescription + "\',\'" + eventOrganizer + "\', \'"  + eventLocation + "\', \'" + eventContact + "\', \'" + eventStartTime  + "\');";
    console.log(insertionQuery);
    connection.query(insertionQuery, function(error, results,fields){
        if(error) throw error;
        res.redirect("/");
    });
});

app.post("/register", function(req,res,next){
    let attendeeName = req.body.name.toString();
    let attendeeEmail = req.body.email.toString();
    let eventID = req.body.event;
    let insertionQuery = "insert into attendee(event_id, name, email) values (\'" + eventID + "\', \'" + attendeeName + "\', \'" + attendeeEmail + "\');";
    let getEventContact = "select contact as orgEmail, event_name as eventName, organizer as org, location as loc from events where id = " + eventID + ";";
    connection.query(insertionQuery, function(error, results, fields){
        if(error) throw error;
        connection.query(getEventContact, function(err,result,param){
            if(err) throw err;
            let organizerEmail = result[0].orgEmail;
            let eName = result[0].eventName.toString();
            let oName = result[0].org.toString();
            let locName = result[0].loc.toString();
            const toAttendeeEmail = {
                to: 'sanjithv@uci.edu',
                from: 'sanjith.venkatesh@gmail.com',
                subject: 'Event Confirmation',
                text: "You have signed up for " + eName + " being organized by " + oName + ". The event will take place at " + locName + ". You can contact the organizers at " + organizerEmail + ". See you there!",
                html: '',
            };
            // const toOrganizerEmail = {
            //     to: organizerEmail.toString(),
            //     from: 'sanjith.venkatesh@gmail.com',
            //     subject: 'New Signup!',
            //     text: attendeeName.toString() + " has signed up for your event! You can contact " + attendeeName + " at " + attendeeEmail,
            //     html: '<p>Hello, you have a new attendee!</p>',
            // };
            console.log("before send");
            try{
                sgMail.send(toAttendeeEmail);               
            }
            catch(error){
                console.log(error);
            }
            // sgMail.send(toOrganizerEmail);
            // const msg = {
            //     to: 'test@example.com',
            //     from: 'test@example.com',
            //     subject: 'Sending with SendGrid is Fun',
            //     text: 'and easy to do anywhere, even with Node.js',
            //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            //   };
            //   sgMail.send(msg);
            console.log("sent email");
            res.redirect("/");

        });
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));