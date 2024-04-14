const fontArrays = [{
  slug: 'jersey-10-charted',
  name: 'Jersey 10 Charted',
  url: 'https://fonts.googleapis.com/css2?family=Jersey+10+Charted&display=swap',
  style: 'normal',
  weight: '400'
}, {
  slug: 'jetbrains-mono',
  name: 'JetBrains Mono',
  url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap',
  style: 'normal',
  weight: '400'
}, {
  slug: 'josefin-sans',
  name: 'Josefin Sans',
  url: 'https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap',
  style: 'normal',
  weight: '400'
}, {
  slug: 'anton',
  name: 'Anton',
  url: 'https://fonts.googleapis.com/css2?family=Anton&display=swap',
  style: 'normal',
  weight: '400'
}, {

  slug: 'roboto',
  name: 'Roboto',
  url: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
  style: 'normal',
  weight: '400'
}, {
  slug: 'poppins',
  name: 'Poppins',
  url: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
  style: 'normal',
  weight: '400'
}, {
  slug: 'nerko-one',
  name: 'Nerko One',
  url: 'https://fonts.googleapis.com/css2?family=Nerko+One&display=swap',
  style: 'normal',
  weight: '400'
}];

function loadFonts() {
  fontArrays.forEach(font => {
    const link = document.createElement('link');
    link.href = font.url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    document.querySelector("style[data-font]").append(generateFontStyle(font));
  });
};

function generateFontStyle(font) {
  return `.${font.slug}-${font.style} {
    font-family: "${font.name}", sans-serif;
    font-weight: ${font.weight};
    font-style: ${font.style};
  }`
}

function switchFont() {
  let currentFontSlug = localStorage.getItem('currentFont');
  if (currentFontSlug === null) currentFont = "jetbrains-mono";
  const fontIndex = fontArrays.findIndex(font => font.slug === currentFontSlug);
  const nextFont = fontArrays[(fontIndex + 1) % fontArrays.length];
  setFont(nextFont);
}

function setFont(font) {
  if (!font) return;
  const selectedFont = fontArrays.find(f => f.slug === font.slug);
  if (!selectedFont) return;
  let currentFontSlug = localStorage.getItem('currentFont');
  if (!currentFontSlug) currentFontSlug = "jetbrains-mono";
  const currentFont = fontArrays.find(f => f.slug === currentFontSlug);
  document.body.classList.remove(`${currentFont.slug}-${currentFont.style}`);
  document.body.classList.add(`${selectedFont.slug}-${selectedFont.style}`);
  localStorage.setItem('currentFont', selectedFont.slug);
  document.querySelector("[data-font-switcher] label[for=font-name]").textContent = `${selectedFont.name}`;
}

document.addEventListener('DOMContentLoaded', () => {
  loadFonts();
  // Load default font
  if (localStorage.getItem('currentFont') === null) {
    localStorage.setItem('currentFont', 'jetbrains-mono');
  }
  if (localStorage.getItem('currentFont')) {
    setFont(fontArrays.find(font => font.slug === localStorage.getItem('currentFont')));
  }
  document.querySelector("[data-font-switcher]").addEventListener('click', () => {
    switchFont();
  });
});
