import './addons/theme-switcher.js';
import './addons/font-loader.js';
import './addons/color-switcher.js';

let countdown;

// Pomodoro Timer
let workTime = localStorage.getItem('workTime') || 120;
let restTime = localStorage.getItem('restTime') || 60;
let countdownTime = workTime;
let isWorkTime = true;
let isPaused = false;
let clickCount = 0;
let holdTimeout;

const display = document.querySelector('.display');
const addTime = document.querySelector('.add');
const subtractTime = document.querySelector('.remove');
const status = document.querySelector('.status');

function startCountdown() {
  countdown = setInterval(() => {
    if (!isPaused) {
      countdownTime--;
      updateDisplay();
      if (countdownTime <= 0) {
        clearTimeout(countdown);
        countdownTime = 0;
      }
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (countdownTime === 0) {
    countdownTime = isWorkTime ? workTime : restTime;
    switchWorkStatus();
  }

  status.textContent = isPaused ? 'Paused' : '⠀';

  requestAnimationFrame(updateDisplay);
}

display.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 1) {
    setTimeout(() => {
      if (clickCount === 1) {
        isPaused = !isPaused;
        status.textContent = isPaused ? 'Paused' : '⠀';
      } else {
        resetCountdown();
      }
      clickCount = 0;
    }, 300);
  }
});

display.addEventListener('mousedown', () => {
  holdTimeout = setTimeout(resetCountdown, 2000);
});

display.addEventListener('mouseup', () => {
  clearTimeout(holdTimeout);
});

addTime.addEventListener('click', () => {
  countdownTime += Number(addTime.innerText) * 60;
  resetCountdown(countdownTime);
});

subtractTime.addEventListener('click', () => {
  countdownTime = Math.max(0, countdownTime + Number(subtractTime.innerText) * 60);
  resetCountdown(countdownTime);
});

function resetCountdown(time) {
  setWorkTime(localStorage.getItem('workTime'));
  setRestTime(localStorage.getItem('restTime'));
  countdownTime = time || (isWorkTime ? workTime : restTime);
  isPaused = false;
  clearInterval(countdown);
  startCountdown();
}

function switchWorkStatus() {
  isWorkTime = !isWorkTime;
  const button = document.querySelector("[data-theme-toggle] .label");
  button.click();
}

function setNextWorkTime() {
  const workTimeRange = [300, 600, 900, 1200, 1500, 1800, 40 * 60, 50 * 60, 60 * 60];
  if (localStorage.getItem('workTime') === null) {
    localStorage.setItem('workTime', 120);
  }
  let workTime = localStorage.getItem('workTime');
  let index = workTimeRange.indexOf(parseInt(workTime));
  let nextIndex = index + 1;
  if (nextIndex >= workTimeRange.length) {
    nextIndex = 0;
  }
  setWorkTime(workTimeRange[nextIndex]);
};

document.querySelector("[data-work-time]").addEventListener('click', setNextWorkTime);

function setNextRestTime() {
  const restTimeRange = [60, 120, 180, 240, 300, 600];
  if (localStorage.getItem('restTime') === null) {
    localStorage.setItem('restTime', 60);
  }
  let restTime = localStorage.getItem('restTime');
  let index = restTimeRange.indexOf(parseInt(restTime));
  let nextIndex = index + 1;
  if (nextIndex >= restTimeRange.length) {
    nextIndex = 0;
  }
  setRestTime(restTimeRange[nextIndex]);
};

document.querySelector("[data-rest-time]").addEventListener('click', setNextRestTime);

function setWorkTime(time) {
  localStorage.setItem('workTime', time);
  workTime = time;
  document.querySelector("[data-work-time] .time-in-minute").textContent = `${time / 60} mins`;
}

function setRestTime(time) {
  localStorage.setItem('restTime', time);
  restTime = time;
  document.querySelector("[data-rest-time] .time-in-minute").textContent = `${time / 60} mins`;
}

resetCountdown(countdownTime);
