/**
 * loader.js — Loading sequence module
 * Animates the 0→100% counter + bar, then calls onComplete callback
 */
export function runLoader(onComplete) {
  const percent  = document.getElementById('loader-percent');
  const barFill  = document.getElementById('loader-bar-fill');
  const loader   = document.getElementById('loader');

  const DURATION = 2400; // ms
  let count = 0;
  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function tick(ts) {
    if (!startTime) startTime = ts;
    const elapsed  = ts - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    const eased    = easeOutCubic(progress);
    const pct      = Math.round(eased * 100);

    if (pct !== count) {
      count = pct;
      percent.textContent = `${count}%`;
      barFill.style.width = `${count}%`;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      percent.textContent = '100%';
      barFill.style.width = '100%';
      onComplete(loader);
    }
  }

  requestAnimationFrame(tick);
}
