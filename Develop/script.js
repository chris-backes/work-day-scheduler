let schedulerBoxEl = $(".container");
let dateToday = new Date();
let currentHour = new Date().getHours();

function addDate() {
  dateToday = dateToday.toString().split(" ");
  $("#currentDay").text(
    dateToday[0] +
      " " +
      dateToday[1] +
      ". " +
      dateToday[2] +
      ", " +
      dateToday[3]
  );
}

function addCalendar() {
  for (let i = 9; i <= 17; i++) {
    let timeRowEl = $("<div>").addClass("row time-block");
    schedulerBoxEl.append(timeRowEl);
    let timeBoxEl = $("<div>").addClass("col-md-1 hour");
    let scheduleEventEl = $("<textarea>")
      .addClass("col-md-10 text-center border")
      .attr("placeholder", "Enter Text");
    let buttonEl = $("<button>").addClass("col-md-1 saveBtn");
    if (i < 12) timeBoxEl.text(i + " AM");
    else if (i === 12) timeBoxEl.text(i + " PM");
    else timeBoxEl.text(i - 12 + " PM");
    colorCoding(i, scheduleEventEl);
    timeRowEl.append(timeBoxEl, scheduleEventEl, buttonEl);
  }
}

function colorCoding(hour, textArea) {
  if (hour < currentHour) {
    textArea.addClass("past");
  } else if (hour == currentHour) {
    textArea.addClass("present");
  } else {
    textArea.addClass("future");
  }
}

addDate();
addCalendar();
