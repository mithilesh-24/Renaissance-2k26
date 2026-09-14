/**
 * eventModal.js — Spider-Verse themed event detail modal.
 * Opens on event card click. Left: event details. Right: poster image.
 * Comic-book aesthetic with Spider-Man visual identity.
 */
import { getEventById } from './eventData.js';

let modalEl = null;
let backdropEl = null;

function createModalDOM() {
  // Backdrop
  backdropEl = document.createElement('div');
  backdropEl.className = 'event-modal-backdrop';
  backdropEl.addEventListener('click', closeEventModal);

  // Modal
  modalEl = document.createElement('div');
  modalEl.className = 'event-modal';
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-label', 'Event Details');
  modalEl.innerHTML = `
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="modal-body">
      <div class="modal-details">
        <div class="modal-badge-wrap">
          <span class="modal-badge"></span>
        </div>
        <h2 class="modal-title"></h2>
        <p class="modal-desc"></p>

        <div class="modal-meta-grid">
          <div class="modal-meta-item">
            <span class="meta-label">📅 DATE</span>
            <span class="meta-value" id="modal-date"></span>
          </div>
          <div class="modal-meta-item">
            <span class="meta-label">⏰ TIME</span>
            <span class="meta-value" id="modal-time"></span>
          </div>
          <div class="modal-meta-item">
            <span class="meta-label">👥 TEAM SIZE</span>
            <span class="meta-value" id="modal-team"></span>
          </div>
          <div class="modal-meta-item">
            <span class="meta-label">🎓 ELIGIBILITY</span>
            <span class="meta-value" id="modal-eligibility"></span>
          </div>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-heading">🕸️ Rounds</h4>
          <ul class="modal-rounds"></ul>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-heading">📋 Rules</h4>
          <ul class="modal-rules"></ul>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-heading">📞 Contacts</h4>
          <div class="modal-contacts"></div>
        </div>
      </div>

      <div class="modal-poster">
        <img class="modal-poster-img" alt="Event Poster" />
        <div class="modal-poster-glow"></div>
      </div>
    </div>
  `;

  modalEl.querySelector('.modal-close').addEventListener('click', closeEventModal);

  document.body.appendChild(backdropEl);
  document.body.appendChild(modalEl);
}

export function openEventModal(eventId) {
  const event = getEventById(eventId);
  if (!event) return;

  if (!modalEl) createModalDOM();

  // Reset scroll position to top for mobile & desktop
  modalEl.scrollTop = 0;
  const detailsEl = modalEl.querySelector('.modal-details');
  if (detailsEl) detailsEl.scrollTop = 0;

  // Populate content
  const badge = modalEl.querySelector('.modal-badge');
  badge.textContent = event.category === 'technical' ? 'TECHNICAL' : 'NON-TECHNICAL';
  badge.className = `modal-badge ${event.category}`;

  modalEl.querySelector('.modal-title').textContent = event.title.toUpperCase();
  modalEl.querySelector('.modal-desc').textContent = event.description;

  modalEl.querySelector('#modal-date').textContent = event.date;
  modalEl.querySelector('#modal-time').textContent = event.time;
  modalEl.querySelector('#modal-team').textContent = event.teamSize;
  modalEl.querySelector('#modal-eligibility').textContent = event.eligibility;

  // Rounds
  const roundsList = modalEl.querySelector('.modal-rounds');
  roundsList.innerHTML = event.rounds.map(r => `<li>${r}</li>`).join('');

  // Rules
  const rulesList = modalEl.querySelector('.modal-rules');
  rulesList.innerHTML = event.rules.map(r => `<li>${r}</li>`).join('');

  // Contacts
  const contactsWrap = modalEl.querySelector('.modal-contacts');
  contactsWrap.innerHTML = event.contacts.map(c =>
    `<div class="contact-chip">
      <span class="contact-name">${c.name}</span>
      <a href="tel:${c.phone}" class="contact-phone">📱 ${c.phone}</a>
    </div>`
  ).join('');

  // Poster
  modalEl.querySelector('.modal-poster-img').src = event.poster;
  modalEl.querySelector('.modal-poster-img').alt = `${event.title} Poster`;

  // Show
  requestAnimationFrame(() => {
    backdropEl.classList.add('active');
    modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Esc key
  document.addEventListener('keydown', handleEsc);
}

function handleEsc(e) {
  if (e.key === 'Escape') closeEventModal();
}

export function closeEventModal() {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  backdropEl.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleEsc);
}
