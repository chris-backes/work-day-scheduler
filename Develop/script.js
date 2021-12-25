let schedulerBoxEl = $(".container");
let dateToday = new Date();
let currentHour = new Date().getHours();

function addDate() {
  dateToday = dateToday.toString().split(" ");
  $("#currentDay").text(
    dateToday[0] +
      "., " +
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

function colorCoding(hour, textArea) {
  if (hour < currentHour) {
    textArea.addClass("past");
  } else if (hour == currentHour) {
    textArea.addClass("present");
  } else {
    textArea.addClass("future");
  }
}

function loadTasks() {
  for (let i = 9; i <= 17; i++) {
    if (i <= 12 && localStorage.getItem(i) != null) {
      let storedTask = localStorage.getItem(i);
      console.log(storedTask);
      $("div[data-hour=" + i + "]")
        .children("textarea")
        .text(storedTask);
    } else if (i > 12 && localStorage.getItem(i) != null) {
      let j = i - 12;
      let storedTask = localStorage.getItem(j).value;
      $("div[data-hour=" + j)
        .child("<textarea>")
        .text(storedTask);
    }
  }
}

addDate();
addCalendar();

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
