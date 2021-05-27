var task = {};

var createRow = function() {
    var rowContainerEl = $(".container");

    for (var i = 0; i < 10; i++) {
        var rowEl = $("<div>").addClass("row");
        var timeColEl = $("<div>").addClass("col-1 hour time-block");
        var hourSpanEl = $("<span>").addClass("").text("HOUR");

        timeColEl.append(hourSpanEl);
        rowEl.append(timeColEl);
        rowContainerEl.append(rowEl);

        var taskColEl = $("<div>").addClass("col-10 past");
        var taskTextEl = $("<textarea>").addClass("description");

        taskColEl.append(taskTextEl);
        rowEl.append(taskColEl);

        var saveBtnEl = $("<button>").addClass("col-1 saveBtn");
        var saveBtnIcnEl = $("<i>").addClass("far fa-save");

        saveBtnEl.append(saveBtnIcnEl);
        rowEl.append(saveBtnEl);
    }
};

createRow();