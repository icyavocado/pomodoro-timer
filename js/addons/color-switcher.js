document.querySelector('[data-bg]').addEventListener('change', (event) => {
  localStorage.setItem('css-root--main-bg-color', event.target.value);
  updateColorScheme();
});

document.querySelector('[data-fg]').addEventListener('change', (event) => {
  localStorage.setItem('css-root--main-fg-color', event.target.value);
  updateColorScheme();
});

function updateColorScheme() {
  const styleTheme = document.querySelector('style[data-color-style]');
  document.querySelector('[data-bg]').value = localStorage.getItem('css-root--main-bg-color') || 'black';
  document.querySelector('[data-fg]').value = localStorage.getItem('css-root--main-fg-color') || 'white';

  styleTheme.textContent = `
[data-theme="light"] {
--main-bg-color: ${localStorage.getItem('css-root--main-bg-color') || 'white'};
--main-fg-color: ${localStorage.getItem('css-root--main-fg-color') || 'black'};
}

[data-theme="dark"] {
--main-bg-color: ${localStorage.getItem('css-root--main-fg-color') || 'black'};
--main-fg-color: ${localStorage.getItem('css-root--main-bg-color') || 'white'};
}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('css-root--main-bg-color')) {
    document.querySelector('[data-bg]').value = localStorage.getItem('css-root--main-bg-color');
  }

  if (localStorage.getItem('css-root--main-fg-color')) {
    document.querySelector('[data-fg]').value = localStorage.getItem('css-root--main-fg-color');
  }

  updateColorScheme();
});
