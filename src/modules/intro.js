/**
 * intro.js — Presents intro sequence module
 * Stagger-animates logos → dwell → shows scroll prompt → enables scroll
 */
import { gsap } from 'gsap';

export function runIntro({ onScrollEnabled }) {
  const intro         = document.getElementById('intro');
  const scrollPrompt  = document.getElementById('scroll-prompt');
  const cinematicWrapper = document.getElementById('cinematic-wrapper');
  const heroVideo     = document.getElementById('hero-video');

  // Reset scroll position to top
  window.scrollTo(0, 0);

  // Enable scroll
  document.documentElement.classList.add('unlocked');
  cinematicWrapper.style.height = `${window.innerHeight * 4}px`;

  intro.classList.add('active');

  const children = intro.querySelectorAll(
    '.intro-logos, #presents-text, .intro-divider, .intro-event-logo'
  );

  // Phase 1 — stagger elements in
  gsap.fromTo(children,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 1.0,
      stagger: 0.28,
      ease: 'power3.out',
      onComplete: () => {
        // Breathing pulse on event logo
        gsap.to('#intro-event-logo', {
          scale: 1.03, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });

        // Phase 2 — show scroll prompt and enable scroll trigger
        enableScroll({ scrollPrompt, heroVideo, onScrollEnabled });
      },
    }
  );
}

function enableScroll({ scrollPrompt, heroVideo, onScrollEnabled }) {
  const intro = document.getElementById('intro');

  // Scroll prompt bounces in
  gsap.fromTo(scrollPrompt,
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }
  );

  const triggerEnter = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Click on scroll prompt or intro triggers scroll down
  scrollPrompt.style.cursor = 'pointer';
  scrollPrompt.onclick = triggerEnter;

  // Intercept wheel on fixed intro overlay
  intro.addEventListener('wheel', (e) => {
    if (e.deltaY > 0 && window.scrollY < 10) {
      triggerEnter();
    }
  }, { passive: true });

  // Intercept touchmove on fixed intro overlay
  let startY = 0;
  intro.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) startY = e.touches[0].clientY;
  }, { passive: true });

  intro.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const diffY = startY - e.touches[0].clientY;
      if (diffY > 10 && window.scrollY < 10) {
        triggerEnter();
      }
    }
  }, { passive: true });

  // Intercept keyboard scroll keys
  window.addEventListener('keydown', (e) => {
    if (window.scrollY < 10 && ['ArrowDown', 'PageDown', 'Space', ' '].includes(e.key)) {
      triggerEnter();
    }
  });

  // Start buffering video
  heroVideo.preload = 'auto';
  heroVideo.load();

  onScrollEnabled(heroVideo);
}
