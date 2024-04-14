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
  document.querySelector('[data-bg]').value = localStorage.getItem('css-root--main-bg-color') || '#000000';
  document.querySelector('[data-fg]').value = localStorage.getItem('css-root--main-fg-color') || '#FFFFFF';

  styleTheme.textContent = `
[data-theme="light"] {
--main-bg-color: ${localStorage.getItem('css-root--main-bg-color') || '#FFFFFF'};
--main-fg-color: ${localStorage.getItem('css-root--main-fg-color') || '#000000'};
}

[data-theme="dark"] {
--main-bg-color: ${localStorage.getItem('css-root--main-fg-color') || '#000000'};
--main-fg-color: ${localStorage.getItem('css-root--main-bg-color') || '#FFFFFF'};
}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('css-root--main-bg-color')) {
    document.querySelector('[data-bg]').value = localStorage.getItem('css-root--main-bg-color');
  }

  if (localStorage.getItem('css-root--main-fg-color')) {
    document.querySelector('[data-fg]').value = localStorage.getItem('css-root--main-fg-color');
  }

  console.log('DOMContentLoaded', document.querySelector('[data-fg]').value);

  updateColorScheme();
});
