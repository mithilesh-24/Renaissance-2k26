/**
 * cinematic.js — Scroll-triggered video cinematic module
 * Video plays ONCE. On 'ended', the Renaissance 2K26 logo + tagline
 * dramatically slam in. The during-video ambient drift keeps the background alive.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function buildScrollTimeline(heroVideo) {
  if (window._cinematicBuilt) return;
  window._cinematicBuilt = true;

  const intro            = document.getElementById('intro');
  const videoContainer   = document.getElementById('video-container');
  const blurOverlay      = document.getElementById('video-blur-overlay');
  const webLinesSVG      = document.getElementById('web-lines-svg');
  const scanLine         = document.getElementById('scan-line');
  const heroLogoWrap     = document.getElementById('hero-logo-wrap');
  const heroTagline      = document.getElementById('hero-tagline');
  const hudCorners       = document.querySelectorAll('.hud-corner');
  const cinematicWrapper = document.getElementById('cinematic-wrapper');
  const cinematicSticky  = document.getElementById('cinematic-sticky');

  const mainNavbar       = document.getElementById('main-navbar');
  const countdownSection = document.getElementById('event-countdown-section');
  const vidDuration    = (heroVideo.duration && !isNaN(heroVideo.duration)) ? heroVideo.duration : 8;
  const PIXELS_PER_SEC = 200;
  // Pin for video duration + 2 extra viewport-heights so logo stays visible after end
  const POST_END_PX    = window.innerHeight * 2.5;
  const pinLength      = Math.max(vidDuration * PIXELS_PER_SEC, window.innerHeight * 2) + POST_END_PX;

  cinematicWrapper.style.height = `${window.innerHeight + pinLength}px`;

  let duringVideoTL = null;
  let endedHandled  = false;

  /* ── safely play video ── */
  function playVideo() {
    const p = heroVideo.play();
    if (p !== undefined) {
      p.catch((err) => console.warn('Video play failed:', err));
    }
  }

  /* ── logo reveal — fires exactly when video ends ── */
  function revealLogo() {
    if (endedHandled) return;
    endedHandled = true;

    // Quick blur flash
    blurOverlay.classList.add('active');
    setTimeout(() => blurOverlay.classList.remove('active'), 500);

    // Reveal Navbar & Countdown Timer Section
    if (mainNavbar) mainNavbar.classList.add('revealed');
    if (countdownSection) countdownSection.classList.add('revealed');

    // HUD corners snap in
    gsap.to(Array.from(hudCorners), {
      opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out',
    });

    // Scan line pulses in (only after video ends)
    if (scanLine) scanLine.classList.add('active');
    gsap.to(scanLine, { opacity: 0.8, duration: 0.6, ease: 'power1.out', delay: 0.1 });

    // Renaissance 2K26 logo slams in from below with punch
    gsap.fromTo(heroLogoWrap,
      { opacity: 0, y: 140, scale: 0.75 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.0, ease: 'power4.out', delay: 0.1,
        onComplete: () => heroLogoWrap.classList.add('floating'),
      }
    );

    // Tagline fades up after logo settles
    if (heroTagline) {
      gsap.fromTo(heroTagline,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.55 }
      );
    }

    // Keep web lines visible
    gsap.to(webLinesSVG, { opacity: 0.5, duration: 0.6, ease: 'power1.out', delay: 0.2 });
  }

  /* ── startCinematic — slides intro up, plays video ── */
  function startCinematic() {
    endedHandled = false;

    // Reset all overlays to hidden state
    if (mainNavbar) mainNavbar.classList.remove('revealed');
    if (countdownSection) countdownSection.classList.remove('revealed');
    gsap.set(heroLogoWrap,  { opacity: 0, y: 140, scale: 0.75 });
    if (heroTagline) gsap.set(heroTagline, { opacity: 0, y: 28 });
    gsap.set(webLinesSVG,   { opacity: 0 });
    gsap.set(scanLine,      { opacity: 0 });
    if (scanLine) scanLine.classList.remove('active');
    gsap.set(Array.from(hudCorners), { opacity: 0 });
    heroLogoWrap.classList.remove('floating');
    blurOverlay.classList.remove('active');

    // Slide intro screen upward (curtain-up effect)
    gsap.to(intro, {
      yPercent: -100,
      opacity: 0,
      duration: 0.95,
      ease: 'power3.inOut',
      onComplete: () => { intro.style.pointerEvents = 'none'; },
    });

    // Reveal video container simultaneously
    gsap.fromTo(videoContainer,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1.0, duration: 0.95, ease: 'power2.out' }
    );

    // Restart video from beginning (plays once, no loop)
    try {
      if (heroVideo.readyState >= 1) heroVideo.currentTime = 0;
    } catch (e) {}
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    playVideo();
    if (heroVideo.paused) {
      heroVideo.addEventListener('canplay', playVideo, { once: true });
    }

    // Listen for video end → reveal logo
    heroVideo.removeEventListener('ended', revealLogo);
    heroVideo.addEventListener('ended', revealLogo, { once: true });

    // Ambient camera-drift timeline (runs during video)
    if (duringVideoTL) duringVideoTL.kill();
    duringVideoTL = runAmbientTimeline(heroVideo);
  }

  /* ── resetToIntro — scrolling back resets everything ── */
  function resetToIntro() {
    heroVideo.pause();
    heroVideo.removeEventListener('ended', revealLogo);
    endedHandled = false;

    try {
      if (heroVideo.readyState >= 1) heroVideo.currentTime = 0;
    } catch (e) {}

    if (duringVideoTL) { duringVideoTL.kill(); duringVideoTL = null; }

    const killList = [intro, videoContainer, heroLogoWrap, webLinesSVG, scanLine, ...hudCorners];
    if (heroTagline) killList.push(heroTagline);
    gsap.killTweensOf(killList);

    gsap.to(intro, {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out',
      onStart: () => { intro.style.pointerEvents = 'auto'; },
    });
    gsap.to(videoContainer, { opacity: 0, duration: 0.5, ease: 'power2.in' });
    gsap.set(heroLogoWrap,  { opacity: 0, y: 140, scale: 0.75 });
    if (heroTagline) gsap.set(heroTagline, { opacity: 0, y: 28 });
    gsap.set(webLinesSVG,   { opacity: 0 });
    gsap.set(scanLine,      { opacity: 0 });
    if (scanLine) scanLine.classList.remove('active');
    if (mainNavbar) mainNavbar.classList.remove('revealed');
    if (countdownSection) countdownSection.classList.remove('revealed');
    gsap.set(Array.from(hudCorners), { opacity: 0 });
    heroLogoWrap.classList.remove('floating');
    blurOverlay.classList.remove('active');
  }

  /* ── ScrollTrigger ── */
  ScrollTrigger.create({
    trigger:       cinematicWrapper,
    start:         'top+=15 top',
    end:           `+=${pinLength}`,
    pin:           cinematicSticky,
    pinSpacing:    false,
    anticipatePin: 1,

    onEnter:     () => startCinematic(),
    onLeave:     () => { heroVideo.pause(); },
    onEnterBack: () => {
      heroVideo.muted = true;
      if (!endedHandled) {
        const p = heroVideo.play();
        if (p) p.catch(() => {});
      }
    },
    onLeaveBack: () => resetToIntro(),
  });

  if (window.scrollY > 15) startCinematic();
}

/* ── Ambient drift timeline (runs concurrently while video plays) ── */
function runAmbientTimeline(heroVideo) {
  const duration = (heroVideo.duration && !isNaN(heroVideo.duration)) ? heroVideo.duration : 8;
  const tl = gsap.timeline();

  // Slow camera zoom-and-drift during the video
  tl.fromTo(heroVideo,
    { scale: 1.0, y: 0 },
    { scale: 1.1, y: '5%', duration: duration, ease: 'none' },
    0
  );

  return tl;
}

/* ── Initialize: wire up and load ── */
export function initCinematic(heroVideo) {
  buildScrollTimeline(heroVideo);

  if (heroVideo.readyState < 1) {
    heroVideo.load();
  }

  // Refresh ScrollTrigger once real video duration is known
  heroVideo.addEventListener('loadedmetadata', () => {
    ScrollTrigger.refresh();
  }, { once: true });
}
