let schedulerBoxEl = $(".container");
let currentHour = moment().hour();

//adds date to top of page
function addDate() {
  $("#currentDay").text(moment().format("LL"));
}
//adds the rows, finlls in text content and styles
function addCalendar() {
  for (let i = 9; i <= 17; i++) {
    let timeRowEl = $("<div>").addClass("row time-block");
    schedulerBoxEl.append(timeRowEl);
    let timeBoxEl = $("<div>").addClass("col-md-1 hour");
    let scheduleEventEl = $("<textarea>")
      .addClass("col-md-10 border")
      .attr("placeholder", "Enter Text");
    let buttonEl = $("<button>").addClass("col-md-1 oi oi-task saveBtn");
    if (i < 12) {
      timeBoxEl.text(i + " AM");
      timeRowEl.attr("data-hour", i);
    } else if (i === 12) {
      timeBoxEl.text(i + " PM");
      timeRowEl.attr("data-hour", i);
    } else {
      timeBoxEl.text(i - 12 + " PM");
      timeRowEl.attr("data-hour", i - 12);
    }
    colorCoding(i, scheduleEventEl);
    timeRowEl.append(timeBoxEl, scheduleEventEl, buttonEl);
  }
}
//styles rows relative to current hour. Uses momentJS to get the current hours
function colorCoding(hour, textArea) {
  if (hour < currentHour) {
    textArea.addClass("past");
  } else if (hour == currentHour) {
    textArea.addClass("present");
  } else {
    textArea.addClass("future");
  }
}
//pulls the info from local sotrage and places them in the relevant textarea
function loadTasks() {
  for (let i = 9; i <= 17; i++) {
    if (i <= 12 && localStorage.getItem(i) != null) {
      let storedTask = localStorage.getItem(i);
      $("div[data-hour=" + i + "]")
        .children("textarea")
        .text(storedTask);
    } else if (i > 12 && localStorage.getItem(i - 12) != null) {
      let j = i - 12;
      let storedTask = localStorage.getItem(j);
      $("div[data-hour=" + j + "]")
        .children("textarea")
        .text(storedTask);
    }
  }
}

addDate();
addCalendar();

// needs to appear after the addCalendar function runs, attaches a event listener to the save button and saves to local storage.
$(".saveBtn").click(function () {
  let appointment = $(this).siblings("textarea").val();
  let hour = $(this).parent().attr("data-hour");

  if (!localStorage.getItem(hour)) {
    localStorage.setItem(hour, appointment);
  } else {
    localStorage.removeItem(hour);
    localStorage.setItem(hour, appointment);
  }
});
