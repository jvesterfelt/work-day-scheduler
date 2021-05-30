// Event handlers

// variables
var bckgndClass = "";
var eventText = "";
var events = [];
var tempEvents = [];
var hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

var createRow = function() {
    addDateHeader();

    var rowContainerEl = $(".container");

    for (var i = 0; i < 9; i++) {

        var rowEl = $("<div>").addClass("row").attr("id", "row-" + [i]);
        var timeColEl = $("<div>").addClass("col-1 hour time-block").attr("id", "time-col-" + [i]);
        var hourSpanEl = $("<span>").addClass("").text(hours[i]).attr("id", "hour-" + [i]);


        timeColEl.append(hourSpanEl);
        rowEl.append(timeColEl);
        rowContainerEl.append(rowEl);

        var taskColEl = $("<div>").addClass("col-10 ");
        var taskTextEl = $("<textarea>").addClass("description").attr("placeholder", "Enter event details...").attr("id", [i]);

        auditEvents([i], taskColEl);

        taskColEl.append(taskTextEl);
        rowEl.append(taskColEl);

        var saveBtnEl = $("<button>").addClass("col-1 saveBtn ").attr("id", "save-btn-" + [i]);
        var saveBtnIcnEl = $("<i>").addClass("far fa-save saveBtn").attr("id", "save-btn-i-" + [i]);

        saveBtnEl.append(saveBtnIcnEl);
        rowEl.append(saveBtnEl);
    }
    loadEvents();
};

var saveEvents = function(events) {
    var tempEvents = JSON.parse(localStorage.getItem("events"));

    window.localStorage.clear();

    console.log("events before: ", tempEvents);
    if (tempEvents) {
        for (var i = 0; i < 9; i++) {
            tempEvents.splice(i, 1, events[i]);
            localStorage.setItem("events", JSON.stringify(tempEvents));
        }
    } else {
        localStorage.setItem("events", JSON.stringify(events));
    }
};

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));
    if (!events) {
        events = [];
    } else {
        for (var i = 0; events.length; i++) {
            var taskTextEl = document.getElementById(events[i].eventFieldId);
            taskTextEl.textContent = events[i].eventText;
        };
    }
};

var auditEvents = function(i, taskColEl) {
    // create date strings, then convert back to moment object for comparison
    var tempTime = moment();
    var time = tempTime.format("h A");
    time = moment(time, "h A");
    var timeBlock = moment(hours[i], "h A");
    var resetTime = moment(hours[0], "h A");

    // Check whether timeBlock is past, present, or future
    if (time < timeBlock) {
        bckgndClass = "future";
    } else if (time > timeBlock) {
        bckgndClass = "past";
    } else {
        bckgndClass = "present";
    }

    if (time === resetTime) {
        window.localStorage.clear();
    }

    taskColEl.addClass(bckgndClass);
};

var addDateHeader = function() {
    var curDate = moment().format("dddd, MMMM Do YYYY");

    $("#currentDay").text(curDate);
};


// on click, grab text and save to events
$(".container").on("change", "textarea", function() {
    var eventFieldId = $(this).attr("id");

    eventText = ($(this).val());

    events.splice(eventFieldId, 1, { eventFieldId: eventFieldId, eventText: eventText })

    saveEvents(events);
});



createRow();