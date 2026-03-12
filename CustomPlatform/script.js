const versionsContainer = document.getElementById('versions-container');
const versionTemplate = document.getElementById('version-template');
const addVersionButton = document.getElementById('add-version');
const quoteForm = document.getElementById('quote-form');
const modeButtons = [...document.querySelectorAll('.mode-btn')];
const pageButtons = [...document.querySelectorAll('.side-nav-btn')];
const projectsTableBody = document.getElementById('projects-table-body');

let versionCount = 0;
let nextQuoteNumber = 80004;
let nextReferenceNumber = 50008;

const ongoingProjects = [
  {
    quoteNumber: 'Q80001',
    requestSummary: 'CROWN CANADA / Solitaire engagement update',
    updatedAt: '2026-03-12',
    references: [
      { referenceNumber: 'R50001', versionLabel: 'Version 1', status: 'CAD review pending' },
      { referenceNumber: 'R50002', versionLabel: 'Version 2', status: 'Awaiting center stone details' },
    ],
  },
  {
    quoteNumber: 'Q80002',
    requestSummary: 'Halo redesign / Client requested slimmer profile',
    updatedAt: '2026-03-13',
    references: [
      { referenceNumber: 'R50003', versionLabel: 'Version 1', status: 'Rendering in progress' },
      { referenceNumber: 'R50004', versionLabel: 'Version 2', status: 'Pricing validation in progress' },
      { referenceNumber: 'R50005', versionLabel: 'Version 3', status: 'Sent for internal approval' },
    ],
  },
  {
    quoteNumber: 'Q80003',
    requestSummary: 'Signature pendant adaptation',
    updatedAt: '2026-03-14',
    references: [
      { referenceNumber: 'R50006', versionLabel: 'Version 1', status: 'Metal confirmation required' },
      { referenceNumber: 'R50007', versionLabel: 'Version 2', status: 'Ready for quote release' },
    ],
  },
];

const expandedQuotes = new Set([ongoingProjects[0].quoteNumber]);

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

function setMode(mode) {
  const customerView = document.getElementById('customer-view');
  const adminView = document.getElementById('admin-view');

  const isCustomerMode = mode === 'customer';
  customerView.classList.toggle('hidden', !isCustomerMode);
  adminView.classList.toggle('hidden', isCustomerMode);

  modeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mode === mode);
  });
}

function setPage(page) {
  const pages = [...document.querySelectorAll('.customer-page')];

  pages.forEach((pageElement) => {
    const isActive = pageElement.id === `page-${page}`;
    pageElement.classList.toggle('active', isActive);
  });

  pageButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === page);
  });
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getLatestReferenceStatus(project) {
  return project.references[project.references.length - 1].status;
}

function renderOngoingProjects() {
  if (!projectsTableBody) {
    return;
  }

  if (ongoingProjects.length === 0) {
    projectsTableBody.innerHTML =
      '<tr><td class="empty-row" colspan="5">No quote requests have been submitted yet.</td></tr>';
    return;
  }

  projectsTableBody.innerHTML = ongoingProjects
    .map((project) => {
      const isExpanded = expandedQuotes.has(project.quoteNumber);
      const referencesMarkup = project.references
        .map(
          (reference) => `
            <li>
              <span class="reference-id">${reference.referenceNumber}</span>
              <span>${reference.versionLabel}</span>
              <span class="reference-status">${reference.status}</span>
            </li>
          `
        )
        .join('');

      return `
        <tr class="quote-row" data-quote-number="${project.quoteNumber}">
          <td>
            <button
              type="button"
              class="expand-btn"
              data-quote-number="${project.quoteNumber}"
              aria-expanded="${isExpanded}"
              aria-label="${isExpanded ? 'Collapse' : 'Expand'} ${project.quoteNumber}"
            >${isExpanded ? '▾' : '▸'}</button>
          </td>
          <td><strong>${project.quoteNumber}</strong></td>
          <td>${project.requestSummary}</td>
          <td>${project.references.length}</td>
          <td><span class="status-chip">${getLatestReferenceStatus(project)}</span></td>
        </tr>
        <tr class="reference-row ${isExpanded ? '' : 'hidden'}" data-reference-group="${project.quoteNumber}">
          <td></td>
          <td colspan="4">
            <div class="reference-group">
              <p><strong>Latest update:</strong> ${formatDate(project.updatedAt)}</p>
              <ul class="reference-list">
                ${referencesMarkup}
              </ul>
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function getNextQuoteNumber() {
  const quoteNumber = `Q${nextQuoteNumber}`;
  nextQuoteNumber += 1;
  return quoteNumber;
}

function getNextReferenceNumber() {
  const referenceNumber = `R${nextReferenceNumber}`;
  nextReferenceNumber += 1;
  return referenceNumber;
}

function createProjectFromForm() {
  const formData = new FormData(quoteForm);
  const requestText = (formData.get('reference') || '').toString().trim();
  const accountText = (formData.get('account') || '').toString().trim() || 'Account not specified';

  const versionCards = [...versionsContainer.querySelectorAll('.version-card')];
  const references = versionCards.map((card, index) => {
    const instructions = card.querySelector('[data-field="instructions"]').value.trim();
    const fallbackStatus = 'Quote details captured';

    return {
      referenceNumber: getNextReferenceNumber(),
      versionLabel: `Version ${index + 1}`,
      status: instructions || fallbackStatus,
    };
  });

  const newProject = {
    quoteNumber: getNextQuoteNumber(),
    requestSummary: `${accountText} / ${requestText || 'General quote request'}`,
    updatedAt: new Date().toISOString().slice(0, 10),
    references,
  };

  ongoingProjects.unshift(newProject);
  expandedQuotes.add(newProject.quoteNumber);
  renderOngoingProjects();

  quoteForm.reset();
  versionsContainer.innerHTML = '';
  createVersionCard();

  setPage('projects');
  alert(`Quote ${newProject.quoteNumber} generated with ${references.length} reference(s).`);
}

addVersionButton.addEventListener('click', createVersionCard);
quoteForm.addEventListener('keydown', focusNextInputOnEnter);
quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createProjectFromForm();
});

modeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setMode(button.dataset.mode);
  });
});

pageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setPage(button.dataset.page);
  });
});

projectsTableBody?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement) || !target.classList.contains('expand-btn')) {
    return;
  }

  const { quoteNumber } = target.dataset;
  if (!quoteNumber) {
    return;
  }

  if (expandedQuotes.has(quoteNumber)) {
    expandedQuotes.delete(quoteNumber);
  } else {
    expandedQuotes.add(quoteNumber);
  }

  renderOngoingProjects();
});

createVersionCard();
setMode('customer');
setPage('home');
renderOngoingProjects();
