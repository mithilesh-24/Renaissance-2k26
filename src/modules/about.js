/**
 * about.js — Phase 2 card interaction physics and GSAP ScrollTrigger reveals
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initPhase2Interactions() {
  // Read More expand/collapse toggle for About cards
  const aboutCardsAll = document.querySelectorAll('.about-card');
  aboutCardsAll.forEach((card) => {
    const btn = card.querySelector('.read-more-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent card neon glow conflict if button clicked directly
      const isExpanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      btn.innerHTML = isExpanded
        ? 'Show Less <span class="btn-arrow">↑</span>'
        : 'Read More <span class="btn-arrow">↓</span>';

      // Activate gold neon glow pulse on expand
      if (isExpanded) {
        card.classList.add('neon-glow-gold');
        setTimeout(() => card.classList.remove('neon-glow-gold'), 2000);
      }

      // Refresh ScrollTrigger so pinning & trigger points update
      setTimeout(() => ScrollTrigger.refresh(), 300);
    });
  });

  const cards = document.querySelectorAll('.p2-card');
  cards.forEach((card, index) => {
    // Click / Tap neon glow toggle effect for cards
    card.addEventListener('click', (e) => {
      if (e.target.closest('.read-more-btn') || e.target.closest('.event-btn') || e.target.closest('.coordinator-phone')) return;

      if (card.classList.contains('about-card')) {
        const btn = card.querySelector('.read-more-btn');
        if (btn) btn.click();
        return;
      }

      // Toggle between Gold and Blue neon glows for event/coordinator cards
      if (card.classList.contains('neon-glow-gold')) {
        card.classList.remove('neon-glow-gold');
        card.classList.add('neon-glow-blue');
      } else if (card.classList.contains('neon-glow-blue')) {
        card.classList.remove('neon-glow-blue');
      } else {
        const isGold = index % 2 === 0;
        card.classList.add(isGold ? 'neon-glow-gold' : 'neon-glow-blue');
      }

      // Auto clear after 2.5 seconds
      setTimeout(() => {
        card.classList.remove('neon-glow-gold', 'neon-glow-blue');
      }, 2500);
    });
  });

  // GSAP ScrollTrigger stagger reveals for About cards
  const aboutCards = document.querySelectorAll('.about-card');
  if (aboutCards.length > 0) {
    gsap.from(aboutCards, {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }

  // GSAP ScrollTrigger stagger reveals for Event cards
  const eventCards = document.querySelectorAll('.event-card');
  if (eventCards.length > 0) {
    gsap.from(eventCards, {
      scrollTrigger: {
        trigger: '#events',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }

  // GSAP ScrollTrigger stagger reveals for Coordinator cards
  const coordinatorCards = document.querySelectorAll('.coordinator-card');
  if (coordinatorCards.length > 0) {
    gsap.from(coordinatorCards, {
      scrollTrigger: {
        trigger: '#coordinators',
        start: 'top 80%',
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }
}
