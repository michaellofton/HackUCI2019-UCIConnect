function uploadImage()
{
	
}

function sendToBackend(object)
{
	//send pulled data to backend
	
}

class Event
{
	constructor(name, hostName, eventLocation,
				date, startTime, endTime, email, description)
	{
		this.name = name;
		this.hostName = hostName;
		this.eventLocation = eventLocation;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.email = email;
		this.description = description
	}
}

function grabData(form)
{
	var selectedStartTime = form.selectTimeStart.value;
	var selectedEndTime = form.selectTimeEnd.value;
	
	//alert(selectedStartTime);
	//alert(selectedEndTime);
	
	var startAMPM = form.selectStartAMPM.value;
	var endAMPM = form.selectEndAMPM.value;
	
	
	var eventStartTime = selectedStartTime.concat(startAMPM); 
	var eventEndTime = selectedEndTime.concat(endAMPM); 
	
	//alert(eventStartTime);
	//alert(eventEndTime);
	
	
	let createdEvent = new Event(form.eventName.value,
	form.eventHost.value, form.eventLocation.value,
	form.eventDate.value, eventStartTime, 
	eventEndTime, form.hostContact.value, 
	form.eventDescription.value
	);
	
	//form.eventImage.value
	
	
	return createdEvent;
}


function makeEvent(form)
{
	//Error checking
	//if any error, red text displayed near button
	var createdEvent = grabData(form);
	alert("Created event: " + createdEvent);
	
	alert(createdEvent.name);
	alert(createdEvent.hostName);
	alert(createdEvent.eventLocation);
	alert(createdEvent.date);
	alert(createdEvent.startTime);
	alert(createdEvent.endTime);
	alert(createdEvent.email);
	alert(createdEvent.description);

	
}