/**
 * countdown.js — Live countdown timer module for Renaissance 2K26
 * Target registration deadline: September 19, 2026 23:59:59
 */

export function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hrsEl  = document.getElementById('cd-hrs');
  const minsEl = document.getElementById('cd-mins');
  const secEl  = document.getElementById('cd-sec');

  if (!daysEl || !hrsEl || !minsEl || !secEl) return;

  // Target deadline: September 19, 2026 23:59:59
  const targetDate = new Date('2026-09-19T23:59:59').getTime();

  function updateTimer() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hrsEl.textContent  = '00';
      minsEl.textContent = '00';
      secEl.textContent  = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs  = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const sec  = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hrsEl.textContent  = String(hrs).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secEl.textContent  = String(sec).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
