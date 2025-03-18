let calendar;

// Initialize the FullCalendar instance when the page loads
document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, {
    timeZone: "UTC",
    initialView: "dayGridMonth",
    events: getMoodEvents(),
  });
  calendar.render();
});

// Function to handle mood selection, store it in LocalStorage, and refresh the page to update the calendar
function handleClick(mood) {
  let today = new Date().toISOString().split("T")[0];
  let moodData = JSON.parse(localStorage.getItem("moodTracker")) || {};
  moodData[today] = mood;
  localStorage.setItem("moodTracker", JSON.stringify(moodData));
  location.reload(); // Refresh to update calendar
}

// Function to retrieve stored mood data from LocalStorage and convert it into calendar events
function getMoodEvents() {
  let moodData = JSON.parse(localStorage.getItem("moodTracker")) || {};
  return Object.keys(moodData).map((date) => ({
    title: moodData[date],
    start: date,
  }));
}

// Function to change the calendar view based on user selection
function changeView(view) {
  // Updates the calendar's view based on the user's selection (daily, weekly, or monthly)
  calendar.changeView(view);
}
