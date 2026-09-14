import './style.css';
import { runLoader } from './modules/loader.js';
import { runIntro } from './modules/intro.js';
import { initCinematic } from './modules/cinematic.js';
import { initCountdown } from './modules/countdown.js';
import { initPhase2Interactions } from './modules/about.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('hero-video');
  const loader = document.getElementById('loader');
  const cinematicWrapper = document.getElementById('cinematic-wrapper');

  // Initialize countdown timer ticker & Phase 2 interactions
  initCountdown();
  initPhase2Interactions();

  // Initial GSAP setup
  gsap.set('#hero-tagline', { y: 20 });

  // Window resize handler for cinematic wrapper
  window.addEventListener('resize', () => {
    if (document.documentElement.classList.contains('unlocked')) {
      cinematicWrapper.style.height = `${window.innerHeight * 3}px`;
      ScrollTrigger.refresh();
    }
  });

  // Kick off loader
  runLoader((loaderEl) => {
    // Fade out loader and show intro
    gsap.to(loaderEl, {
      opacity: 0,
      duration: 0.7,
      delay: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        loaderEl.style.display = 'none';
        
        runIntro({
          onScrollEnabled: (video) => {
            initCinematic(video);
          }
        });
      }
    });
  });
});
