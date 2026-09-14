/**
 * eventCards.js — Dynamic event card renderer with Spider-Verse filter tabs.
 * Renders all 11 events from eventData.js into #events-grid.
 */
import { eventsData, getEventsByCategory } from './eventData.js';
import { openEventModal } from './eventModal.js';

export function initEventCards() {
  const eventsSection = document.getElementById('events');
  if (!eventsSection) return;

  const headerEl = eventsSection.querySelector('.section-header');
  const gridEl = eventsSection.querySelector('.events-grid');
  if (!gridEl) return;

  // ── Insert filter bar after section-header ──
  const filterBar = document.createElement('div');
  filterBar.className = 'event-filter-bar';
  filterBar.innerHTML = `
    <button class="filter-btn active" data-filter="all">
      ALL <span class="filter-count">${eventsData.length}</span>
    </button>
    <button class="filter-btn" data-filter="technical">
      TECHNICAL <span class="filter-count">${eventsData.filter(e => e.category === 'technical').length}</span>
    </button>
    <button class="filter-btn" data-filter="non-technical">
      NON-TECHNICAL <span class="filter-count">${eventsData.filter(e => e.category === 'non-technical').length}</span>
    </button>
  `;
  headerEl.after(filterBar);

  // ── Render event cards ──
  function renderCards(category) {
    const events = getEventsByCategory(category);
    gridEl.innerHTML = '';

    events.forEach((event, i) => {
      const card = document.createElement('article');
      card.className = 'p2-card event-card';
      card.tabIndex = 0;
      card.dataset.eventId = event.id;
      card.style.animationDelay = `${i * 0.06}s`;

      card.innerHTML = `
        <div class="event-badge ${event.category}">${event.category === 'technical' ? 'TECHNICAL' : 'NON-TECHNICAL'}</div>
        <h3 class="card-title">${event.title.toUpperCase()}</h3>
        <p class="card-body">${event.description}</p>
        <div class="event-meta">
          <span class="meta-pill">⏰ ${event.time.split('–')[0].trim()}</span>
          <span class="meta-pill">👥 ${event.teamSize.split(' ')[0]}${event.teamSize.includes('–') ? '-' + event.teamSize.split('–')[1].trim().split(' ')[0] : ''}</span>
        </div>
        <div class="event-footer">
          <span class="event-time">${event.time}</span>
          <button class="event-btn" data-event-id="${event.id}">Explore Event</button>
        </div>
      `;

      // Click card to open modal
      card.addEventListener('click', (e) => {
        if (e.target.closest('.event-btn')) return;
        openEventModal(event.id);
      });

      gridEl.appendChild(card);
    });

    // Attach button click listeners
    gridEl.querySelectorAll('.event-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEventModal(btn.dataset.eventId);
      });
    });
  }

  // ── Filter button logic ──
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });

  // Initial render
  renderCards('all');
}
