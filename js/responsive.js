/* ═══════════════════════════════════════════════
   RESPONSIVE FIT
   Scales the whole game frame down to fit the screen
   while preserving its aspect ratio. Never scales up
   past 100%, so on large screens it stays at the exact
   --game-w / --game-h you set in css/main.css.
═══════════════════════════════════════════════ */
(function () {
  const frame = document.querySelector('.game-frame');
  if (!frame) return;

  function readPx(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name);
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : fallback;
  }

  function fit() {
    const gameW = readPx('--game-w', 950);
    const gameH = readPx('--game-h', 740);
    // Small margin so the frame's shadow/border isn't flush to the edges.
    const margin = 16;
    const scale = Math.min(
      (window.innerWidth  - margin) / gameW,
      (window.innerHeight - margin) / gameH,
      1
    );
    frame.style.transformOrigin = 'center center';
    frame.style.transform = `scale(${scale})`;
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
})();
