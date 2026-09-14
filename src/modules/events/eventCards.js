/**
 * eventCards.js — Dynamic event card renderer with Spider-Verse filter tabs.
 * Renders all 11 events from eventData.js into #events-grid.
 * Primary filter tabs: ALL (11) | PRESENTATION (2) | TECHNICAL (4) | CODING (2) | NON-TECHNICAL (3)
 */
import { eventsData, getEventsByCategory } from './eventData.js';
import { openEventModal } from './eventModal.js';

export function initEventCards() {
  const eventsSection = document.getElementById('events');
  if (!eventsSection) return;

  const headerEl = eventsSection.querySelector('.section-header');
  const gridEl = eventsSection.querySelector('.events-grid');
  if (!gridEl) return;

  // Calculate counts
  const presCount = eventsData.filter(e => e.category === 'presentation').length;
  const techCount = eventsData.filter(e => e.category === 'technical' && !e.isCoding).length;
  const codingCount = eventsData.filter(e => e.category === 'coding' || e.isCoding).length;
  const nonTechCount = eventsData.filter(e => e.category === 'non-technical').length;

  // ── Top-Level Filter Bar ──
  const filterBar = document.createElement('div');
  filterBar.className = 'event-filter-bar';
  filterBar.innerHTML = `
    <button class="filter-btn active" data-filter="all">
      ALL <span class="filter-count">${eventsData.length}</span>
    </button>
    <button class="filter-btn" data-filter="presentation">
      PRESENTATION <span class="filter-count">${presCount}</span>
    </button>
    <button class="filter-btn" data-filter="technical">
      TECHNICAL <span class="filter-count">${techCount}</span>
    </button>
    <button class="filter-btn filter-btn-coding" data-filter="coding">
      CODING <span class="filter-count">${codingCount}</span>
    </button>
    <button class="filter-btn" data-filter="non-technical">
      NON-TECHNICAL <span class="filter-count">${nonTechCount}</span>
    </button>
  `;
  headerEl.after(filterBar);

  function getBadgeLabel(event) {
    if (event.category === 'presentation') return 'PRESENTATION';
    if (event.category === 'non-technical') return 'NON-TECHNICAL';
    if (event.category === 'coding' || event.isCoding) return 'CODING';
    return 'TECHNICAL';
  }

  function getBadgeClass(event) {
    if (event.category === 'presentation') return 'presentation';
    if (event.category === 'non-technical') return 'non-technical';
    if (event.category === 'coding' || event.isCoding) return 'coding';
    return 'technical';
  }

  // ── Render event cards ──
  function renderCards(category) {
    const events = getEventsByCategory(category);
    gridEl.innerHTML = '';

    events.forEach((event, i) => {
      const card = document.createElement('article');
      card.className = 'p2-card event-card';
      card.tabIndex = 0;
      card.dataset.eventId = event.id;
      card.style.animationDelay = `${i * 0.05}s`;

      card.innerHTML = `
        <div class="event-badge ${getBadgeClass(event)}">${getBadgeLabel(event)}</div>
        <h3 class="card-title">${event.title.toUpperCase()}</h3>
        <p class="card-body">${event.description}</p>
        <div class="event-meta">
          <span class="meta-pill">⏰ ${(event.time.split(/[-–]/)[0] || '').trim()}</span>
          <span class="meta-pill">👥 ${event.teamSize.split(' ')[0]}${event.teamSize.includes('-') || event.teamSize.includes('–') ? '-' + event.teamSize.split(/[-–]/)[1].trim().split(' ')[0] : ''}</span>
        </div>
        <div class="event-footer">
          <button class="event-btn explore-btn" data-event-id="${event.id}">Explore Event</button>
          <a href="${event.registerUrl || '#'}" class="event-btn register-btn" data-event-id="${event.id}" ${event.registerUrl && event.registerUrl !== '#' ? 'target="_blank" rel="noopener noreferrer"' : ''}>Register</a>
        </div>
      `;

      // Click card to open modal
      card.addEventListener('click', (e) => {
        if (e.target.closest('.event-btn') || e.target.closest('a')) return;
        openEventModal(event.id);
      });

      gridEl.appendChild(card);
    });

    // Attach button click listeners
    gridEl.querySelectorAll('.explore-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEventModal(btn.dataset.eventId);
      });
    });

    gridEl.querySelectorAll('.register-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eventId = btn.dataset.eventId;
        const currentEvent = eventsData.find(ev => ev.id === eventId);
        if (!currentEvent || !currentEvent.registerUrl || currentEvent.registerUrl === '#') {
          e.preventDefault();
          e.stopPropagation();
          openEventModal(eventId);
        } else {
          e.stopPropagation();
        }
      });
    });
  }

  // ── Top-level filter button logic ──
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
