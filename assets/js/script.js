// Event handlers

// variables
var timePeriod = ["past", "present", "future"];
var eventText = "";
var events = [];
var tempEvents = [];
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
        var taskTextEl = $("<textarea>").addClass("description").attr("placeholder", "Enter event details...").attr("id", [i]);

        taskColEl.append(taskTextEl);
        rowEl.append(taskColEl);

        var saveBtnEl = $("<button>").addClass("col-1 saveBtn ").attr("id", "save-btn-" + [i]);
        var saveBtnIcnEl = $("<i>").addClass("far fa-save saveBtn").attr("id", "save-btn-i-" + [i]);

        saveBtnEl.append(saveBtnIcnEl);
        rowEl.append(saveBtnEl);
    }
};

var saveEvents = function(events) {
    var tempEvents = JSON.parse(localStorage.getItem("events"));
    // var newArr = [];
    window.localStorage.clear();
    // console.log("cleared localStorage");

    console.log("events before: ", tempEvents);
    if (tempEvents) {
        for (var i = 0; i < 9; i++) {
            tempEvents.splice(i, 1, events[i]);
            console.log("if", tempEvents, events);
            localStorage.setItem("events", JSON.stringify(tempEvents));
        }
    } else {
        localStorage.setItem("events", JSON.stringify(events));
        console.log("else", events);
    }
};

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
    if (!events) {
        events = [];
    } else {
        return events;
    }
};

// on click, grab text and save to events
$(".container").on("change", "textarea", function() {
    var eventFieldId = $(this).attr("id");

    eventText = ($(this).val());

    events.splice(eventFieldId, 1, { eventFieldId: eventFieldId, eventText: eventText })

    saveEvents(events);
});



createRow();