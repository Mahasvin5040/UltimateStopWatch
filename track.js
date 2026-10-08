i = 0;
let events = [];

class Event {
    constructor(name, tag, startTime, endTime, totalTime, color) {
        this.name = name;
        this.tag = tag;
        this.startTime = startTime;
        this.endTime = endTime;
        this.totalTime = totalTime;
        this.color = color;
    }
}

function newEvent() {
    let eventArea = document.getElementById("listArea");

    let newEvent = document.createElement('div');
    newEvent.className = 'item';
    newEvent.id = 'listItem' + i.toString();
    eventArea.appendChild(newEvent);

    let eventName;
    let eventTag;
    let eventStartTime = null;
    let eventEndTime = null;
    let eventColor = null;
    let eventTotalTime;

    watches[i] = new Event(eventName, eventTag, eventStartTime, eventEndTime, eventTotalTime, eventColor);
    i++;
}