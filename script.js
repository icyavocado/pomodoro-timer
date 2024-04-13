let countdown;
let countdownTime = 120; // 2 minutes in seconds
let isPaused = false;
let clickCount = 0;
let holdTimeout;

let startY;
let swipeDirection = 0;
let swipeElement;

const display = document.querySelector('.display');
const addTime = document.querySelector('.add');
const subtractTime = document.querySelector('.remove');
const status = document.querySelector('.status');
const themeToggle = document.querySelector('[data-theme-toggle]');

function startCountdown() {
  countdown = setInterval(() => {
    if (!isPaused) {
      countdownTime--;
      updateDisplay();
      if (countdownTime <= 0) {
        clearInterval(countdown);
        countdownTime = 0;
      }
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(countdownTime / 60);
  const seconds = countdownTime % 60;
  display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  let flashFrames = 0;

  if (countdownTime <= 3 && countdownTime > 0) {
    flashFrames = 2;
  }

  if (flashFrames > 0) {
    if (flashFrames % 2 === 0) {
      display.classList.add('flash');
    }
    flashFrames--;
  }

  if (flashFrames === 0 && display.classList.contains('flash')) {
    display.classList.remove('flash');
  }

  if (swipeDirection !== 0) {
    let currentValue = parseInt(swipeElement.textContent);
    swipeElement.textContent = swipeElement === addTime ? `+${currentValue + swipeDirection}` : `-${Math.abs(currentValue) - swipeDirection}`;
    swipeDirection = 0;
  }

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
  countdownTime += Number(addTime.innerText) * 60; // add 1 minute
  updateDisplay();
});

subtractTime.addEventListener('click', () => {
  countdownTime = Math.max(0, countdownTime + Number(subtractTime.innerText) * 60); // subtract 1 minute, but don't go below 0
  updateDisplay();
});

function resetCountdown() {
  countdownTime = 120;
  isPaused = false;
  clearInterval(countdown);
  startCountdown();
}

function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) return localStorageTheme;
  if (systemSettingDark.matches) return "dark";
  return "light";
}

function updateButton({ buttonEl, isDark }) {
  const newCta = isDark ? "Light Mode" : "Dark Mode";
  buttonEl.setAttribute("aria-label", newCta);
  buttonEl.innerText = newCta;
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("body").setAttribute("data-theme", theme);
}

const button = document.querySelector("[data-theme-toggle]");
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
updateThemeOnHtmlEl({ theme: currentThemeSetting });

button.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  updateButton({ buttonEl: button, isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });

  currentThemeSetting = newTheme;
});

updateDisplay();
startCountdown();
