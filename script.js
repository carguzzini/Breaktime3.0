let currentTimer;
let alarm = document.getElementById('alarm');
let countdownElement = document.getElementById('countdown');
let workDurationInput = document.getElementById('workDuration');
let breakDurationInput = document.getElementById('breakDuration');
let remainingTime = 0;
let isCountdownRunning = false;
let isWorkTime = true; // Variable to track whether it's work time or break time

function toggleTimer() {
  if (isCountdownRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  let workDuration = parseInt(workDurationInput.value, 10);
  let breakDuration = parseInt(breakDurationInput.value, 10);

  if (isNaN(workDuration) || isNaN(breakDuration) || workDuration <= 0 || breakDuration <= 0) {
    alert("Please enter valid durations for work and break.");
    return;
  }

  if (currentTimer) {
    clearInterval(currentTimer);
  }

  remainingTime = isWorkTime ? workDuration * 60 : breakDuration * 60; // Use ternary operator to determine the remaining time based on whether it's work time or break time
  displayCountdown();
  updateTextColor(isWorkTime ? 'green' : 'red'); // Change text color based on work or break time
  isCountdownRunning = true;

  currentTimer = setInterval(function() {
    if (remainingTime <= 0) {
      playAlarm();
      setTimeout(stopAlarm, 5000); // Sound the alarm for 5 seconds

      // Switch between work time and break time
      isWorkTime = !isWorkTime;
      remainingTime = isWorkTime ? workDuration * 60 : breakDuration * 60; // Update remaining time based on whether it's work time or break time
      displayCountdown();
      updateTextColor(isWorkTime ? 'green' : 'red'); // Change text color based on work or break time
    } else {
      remainingTime--;
      displayCountdown();
    }
  }, 1000);

  document.getElementById('toggleButton').textContent = "Stop"; // Update button text to "Stop"
}

function stopTimer() {
  clearInterval(currentTimer);
  stopAlarm();
  currentTimer = null;
  isCountdownRunning = false;

  document.getElementById('toggleButton').textContent = "Start"; // Update button text to "Start"
}

function resetTimer() {
  stopTimer();
  remainingTime = parseInt(workDurationInput.value, 10) * 60;
  displayCountdown();
  updateTextColor('black');
}

function playAlarm() {
  // You can use alternative methods to produce sound here
}

function stopAlarm() {
  // You can use alternative methods to stop the sound here
}

function displayCountdown() {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTextColor(color) {
  countdownElement.style.color = color;
}

function displayCurrentTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let currentTimeText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  document.getElementById('currentTime').textContent = currentTimeText;
}

// Update current time every second
setInterval(displayCurrentTime, 1000);
