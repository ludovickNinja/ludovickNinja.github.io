const versionsContainer = document.getElementById('versions-container');
const versionTemplate = document.getElementById('version-template');
const addVersionButton = document.getElementById('add-version');
const quoteForm = document.getElementById('quote-form');

let versionCount = 0;

function updateVersionTitles() {
  const cards = [...versionsContainer.querySelectorAll('.version-card')];

  cards.forEach((card, index) => {
    const title = card.querySelector('.version-title');
    title.textContent = `Version ${index + 1}`;

    const removeButton = card.querySelector('.remove-btn');
    removeButton.hidden = cards.length === 1;
  });
}

function createVersionCard() {
  versionCount += 1;

  const fragment = versionTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.version-card');

  card.dataset.versionId = String(versionCount);
  card.querySelector('.remove-btn').addEventListener('click', () => {
    card.remove();
    updateVersionTitles();
  });

  versionsContainer.appendChild(fragment);
  updateVersionTitles();
}

function focusNextInputOnEnter(event) {
  if (event.key !== 'Enter') {
    return;
  }

  const target = event.target;
  const isTextInput =
    target instanceof HTMLInputElement &&
    ['text', 'email', 'number', 'search', 'tel', 'url'].includes(target.type);

  if (!isTextInput) {
    return;
  }

  event.preventDefault();

  const focusable = [...quoteForm.querySelectorAll('input, textarea, button, select')].filter(
    (element) => !element.disabled && element.type !== 'hidden'
  );

  const index = focusable.indexOf(target);
  if (index >= 0 && index < focusable.length - 1) {
    focusable[index + 1].focus();
  }
}

addVersionButton.addEventListener('click', createVersionCard);
quoteForm.addEventListener('keydown', focusNextInputOnEnter);
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Quote request captured. Backend integration can be wired next.');
});

createVersionCard();
