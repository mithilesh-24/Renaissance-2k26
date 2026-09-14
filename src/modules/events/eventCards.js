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

  // Active filter state
  let currentCategory = 'all';
  let currentSubCategory = 'all';

  // ── 1. Top-Level Filter Bar ──
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

  // ── 2. Technical Secondary Sub-Filter Bar ──
  const techEvents = eventsData.filter(e => e.category === 'technical');
  const codingCount = techEvents.filter(e => e.isCoding).length;
  const otherTechCount = techEvents.filter(e => !e.isCoding).length;

  const subfilterBar = document.createElement('div');
  subfilterBar.className = 'event-subfilter-bar hidden';
  subfilterBar.id = 'technical-subfilters';
  subfilterBar.innerHTML = `
    <button class="subfilter-btn active" data-subfilter="all">
      ALL TECHNICAL <span class="subfilter-count">${techEvents.length}</span>
    </button>
    <button class="subfilter-btn subfilter-btn-coding" data-subfilter="coding">
      &lt;/&gt; CODING <span class="subfilter-count">${codingCount}</span>
    </button>
    <button class="subfilter-btn" data-subfilter="other">
      OTHER TECHNICAL <span class="subfilter-count">${otherTechCount}</span>
    </button>
  `;
  filterBar.after(subfilterBar);

  function getBadgeLabel(event) {
    if (event.category === 'non-technical') return 'NON-TECHNICAL';
    if (event.isCoding) return 'CODING';
    return 'TECHNICAL';
  }

  function getBadgeClass(event) {
    if (event.category === 'non-technical') return 'non-technical';
    if (event.isCoding) return 'coding';
    return 'technical';
  }

  // ── Render event cards ──
  function renderCards(category, subCategory) {
    const events = getEventsByCategory(category, subCategory);
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

  // ── Top-level filter button logic ──
  filterBar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentCategory = btn.dataset.filter;
      currentSubCategory = 'all';

      // Show subfilters only for TECHNICAL category
      if (currentCategory === 'technical') {
        subfilterBar.classList.remove('hidden');
        // Reset subfilter buttons to ALL TECHNICAL
        subfilterBar.querySelectorAll('.subfilter-btn').forEach(s => s.classList.remove('active'));
        subfilterBar.querySelector('[data-subfilter="all"]')?.classList.add('active');
      } else {
        subfilterBar.classList.add('hidden');
      }

      renderCards(currentCategory, currentSubCategory);
    });
  });

  // ── Technical Sub-filter button logic ──
  subfilterBar.querySelectorAll('.subfilter-btn').forEach(sBtn => {
    sBtn.addEventListener('click', () => {
      subfilterBar.querySelectorAll('.subfilter-btn').forEach(b => b.classList.remove('active'));
      sBtn.classList.add('active');

      currentSubCategory = sBtn.dataset.subfilter;
      renderCards(currentCategory, currentSubCategory);
    });
  });

  // Initial render
  renderCards('all', 'all');
}
