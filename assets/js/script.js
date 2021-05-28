// Event handlers

// variables
var timePeriod = ["past", "present", "future"];
var eventText = "";
var events = [];
var hours = [9 + " AM", 10 + " AM", 11 + " AM", 12 + " PM", 1 + " PM", 2 + " PM", 3 + " PM", 4 + " PM", 5 + " PM"];

var createRow = function() {
    var rowContainerEl = $(".container");

    for (var i = 0; i < 9; i++) {
        var rowEl = $("<div>").addClass("row").attr("id", "row-" + [i]);
        var timeColEl = $("<div>").addClass("col-1 hour time-block").attr("id", "time-col-" + [i]);
        var hourSpanEl = $("<span>").addClass("").text(hours[i]).attr("id", "hour-" + [i]);


        timeColEl.append(hourSpanEl);
        rowEl.append(timeColEl);
        rowContainerEl.append(rowEl);

        var taskColEl = $("<div>").addClass("col-10 past");
        var taskTextEl = $("<textarea>").addClass("description").attr("placeholder", "Enter event details...").attr("id", "event-text-" + [i]);

        taskColEl.append(taskTextEl);
        rowEl.append(taskColEl);

        var saveBtnEl = $("<button>").addClass("col-1 saveBtn ").attr("id", "save-btn-" + [i]);
        var saveBtnIcnEl = $("<i>").addClass("far fa-save saveBtn").attr("id", "save-btn-i-" + [i]);

        saveBtnEl.append(saveBtnIcnEl);
        rowEl.append(saveBtnEl);
    }
};

var saveEvents = function(tempEvents) {
    events = localStorage.setItem("events", JSON.stringify(events));
    console.log("These are the stored events", events);
    console.log("This is the tempEvents data", tempEvents);

    for (var i = 0; i < tempEvents.length; i++) {
        if (events.eventFieldId.includes(tempEvents.eventFieldId)) {
            events.eventText = tempEvents.eventText;
        }
    }
};

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        events = [{}];
    } else {

    }

    return events;
};

// on click, grab text and save to events
$(".container").on("change", "textarea", function() {
    console.log("Here we're trying to get the textarea value.");
    var eventFieldId = $(this).attr("id");
    console.log(eventFieldId);

    eventText = ($(this).val());
    console.log(eventText);

    tempEvents.push({
        eventFieldId: eventFieldId,
        eventText: eventText
    });

    console.log(tempEvents);

    saveEvents(tempEvents);
});



createRow();