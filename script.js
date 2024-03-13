let currentTimer;
let alarm = document.getElementById('alarm');
let countdownElement = document.getElementById('countdown');
let workDurationInput = document.getElementById('workDuration');
let breakDurationInput = document.getElementById('breakDuration');
let remainingTime = 0;
let isCountdownRunning = false;

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

  remainingTime = workDuration * 60;
  displayCountdown();
  updateTextColor('green');
  isCountdownRunning = true;

  // Start the timer
  currentTimer = setInterval(function() {
    if (remainingTime <= 0) {
      playAlarm();
      setTimeout(stopAlarm, 5000); // Sound the alarm for 5 seconds
      remainingTime = breakDuration * 60; // Display the countdown for the break
      displayCountdown();
      updateTextColor('red');
    } else {
      remainingTime--;
      displayCountdown();
    }
  }, 1000);

  // Update the button text to "Stop"
  document.getElementById('toggleButton').textContent = "Stop";
}

function stopTimer() {
  clearInterval(currentTimer);
  stopAlarm();
  currentTimer = null;
  isCountdownRunning = false;

  // Update the button text to "Start"
  document.getElementById('toggleButton').textContent = "Start";
}

function resetTimer() {
  stopTimer();
  remainingTime = parseInt(workDurationInput.value, 10) * 60;
  displayCountdown();
  updateTextColor('black');
}

function playAlarm() {
  alarm.play();
}

function stopAlarm() {
  alarm.pause();
  alarm.currentTime = 0;
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
