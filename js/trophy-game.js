/* ═══════════════════════════════════════════════
   TROPHY CATCH  —  Awards page mini-game
   Trophies fall from the top of the stage; move the
   adventurer left/right with the keyboard to catch
   them before they hit the ground. 10 trophies, then
   game over. Reuses SpriteAnimator + .sprite--adventurer.
═══════════════════════════════════════════════ */
const TrophyGame = (() => {
  /* ── Tunables ──────────────────────────── */
  const TOTAL        = 10;     // trophies per round
  const FALL_SPEED   = 95;     // px per second
  const TROPHY_KINDS = 6;      // image variants (.tg-trophy--1..6)
  const MOVE_SPEED   = 360;    // catcher px per second
  const SPAWN_EVERY  = 950;    // ms between trophy drops
  const CATCHER_W    = 96;     // .sprite--adventurer width

  /* ── DOM / engine refs ─────────────────── */
  let _stage, _overlay, _scoreEl, _leftEl, _catcher, _animator;
  let _ready = false;

  /* ── Round state ───────────────────────── */
  let _running   = false;
  let _caught    = 0;
  let _missed    = 0;
  let _spawned   = 0;
  let _trophies  = [];          // { el, x, y }
  let _catcherX  = 0;
  let _dir       = 0;           // -1 left, +1 right, 0 idle
  let _moving    = false;
  let _left = false, _right = false;
  let _rafId     = null;
  let _spawnTimer = null;
  let _lastTime  = 0;

  /* ───────────────────────────────────────
     INIT  (wire elements once)
  ─────────────────────────────────────── */
  function init() {
    if (_ready) return;
    _stage   = document.getElementById('tg-stage');
    _overlay = document.getElementById('tg-overlay');
    _scoreEl = document.getElementById('tg-score');
    _leftEl  = document.getElementById('tg-left');
    if (!_stage || !_overlay) return;

    /* Catcher sprite — same character as CHARACTER SELECT */
    _catcher = document.createElement('div');
    _catcher.className = 'sprite sprite--adventurer tg-catcher';
    _stage.appendChild(_catcher);
    _animator = new SpriteAnimator(_catcher, 8, CATCHER_W, 8);

    /* Start / Play-again button (delegated) */
    _overlay.addEventListener('click', e => {
      if (e.target.closest('.tg-btn')) startRound();
    });

    /* Keyboard — gated so it only acts during a live round */
    document.addEventListener('keydown', _onKeyDown);
    document.addEventListener('keyup',   _onKeyUp);

    _ready = true;
  }

  /* ───────────────────────────────────────
     SCREEN LIFECYCLE  (called by navigation)
  ─────────────────────────────────────── */
  function enter() {
    init();
    if (!_ready) return;
    _showOverlay('start');   // fresh START state each visit
  }

  function leave() {
    _stopLoop();
    _running = false;
    _clearTrophies();
    _animator?.stop();
  }

  /* ───────────────────────────────────────
     ROUND CONTROL
  ─────────────────────────────────────── */
  function startRound() {
    _clearTrophies();
    _caught = _missed = _spawned = 0;
    _left = _right = false;
    _catcherX = (_stage.offsetWidth - CATCHER_W) / 2;
    _catcher.style.left = _catcherX + 'px';
    _updateHud();

    _overlay.classList.remove('tg-overlay--show');
    _running = true;

    _lastTime = performance.now();
    _spawnTrophy();
    _spawnTimer = setInterval(() => {
      if (_spawned < TOTAL) _spawnTrophy();
      else clearInterval(_spawnTimer);
    }, SPAWN_EVERY);

    _rafId = requestAnimationFrame(_loop);
  }

  function _endRound() {
    _running = false;
    _stopLoop();
    _animator.stop();
    _showOverlay('over');
  }

  /* ───────────────────────────────────────
     MAIN LOOP
  ─────────────────────────────────────── */
  function _loop(now) {
    if (!_running) return;
    const dt = (now - _lastTime) / 1000;
    _lastTime = now;

    _moveCatcher(dt);
    _moveTrophies(dt);

    /* All trophies dropped and none left on screen → game over */
    if (_spawned >= TOTAL && _trophies.length === 0) {
      _endRound();
      return;
    }
    _rafId = requestAnimationFrame(_loop);
  }

  function _moveCatcher(dt) {
    _dir = (_right ? 1 : 0) - (_left ? 1 : 0);
    if (_dir !== 0) {
      const max = _stage.offsetWidth - CATCHER_W;
      _catcherX = Math.max(0, Math.min(max, _catcherX + _dir * MOVE_SPEED * dt));
      _catcher.style.left = _catcherX + 'px';
      _catcher.classList.toggle('tg-catcher--flip', _dir < 0);
      if (!_moving) { _animator.start(); _moving = true; }
    } else if (_moving) {
      _animator.stop();
      _moving = false;
    }
  }

  function _moveTrophies(dt) {
    const stageH   = _stage.offsetHeight;
    const catchTop = stageH - _catcher.offsetHeight;   // top of catcher box
    const cL = _catcherX, cR = _catcherX + CATCHER_W;

    for (let i = _trophies.length - 1; i >= 0; i--) {
      const t = _trophies[i];
      t.y += FALL_SPEED * dt;
      const tW = t.el.offsetWidth;
      const tBottom = t.y + t.el.offsetHeight;

      /* Caught: trophy reaches catcher row AND overlaps horizontally */
      if (tBottom >= catchTop + 12) {
        const overlap = (t.x + tW) > cL && t.x < cR;
        if (overlap) {
          _caught++;
          _removeTrophy(i);
          _updateHud();
          continue;
        }
      }
      /* Missed: fell past the ground */
      if (t.y > stageH) {
        _missed++;
        _removeTrophy(i);
        _updateHud();
        continue;
      }
      t.el.style.top = t.y + 'px';
    }
  }

  /* ───────────────────────────────────────
     TROPHIES
  ─────────────────────────────────────── */
  function _spawnTrophy() {
    if (_spawned >= TOTAL) return;
    const kind = 1 + Math.floor(Math.random() * TROPHY_KINDS);
    const el = document.createElement('div');
    el.className = `tg-trophy tg-trophy--${kind}`;
    _stage.appendChild(el);
    const x = Math.random() * Math.max(0, _stage.offsetWidth - (el.offsetWidth || 44));
    el.style.left = x + 'px';
    el.style.top  = '-48px';
    _trophies.push({ el, x, y: -48 });
    _spawned++;
  }

  function _removeTrophy(i) {
    _trophies[i].el.remove();
    _trophies.splice(i, 1);
  }

  function _clearTrophies() {
    _trophies.forEach(t => t.el.remove());
    _trophies = [];
    clearInterval(_spawnTimer);
  }

  /* ───────────────────────────────────────
     HUD + OVERLAY
  ─────────────────────────────────────── */
  function _updateHud() {
    if (_scoreEl) _scoreEl.textContent = _caught;
    if (_leftEl)  _leftEl.textContent  = Math.max(0, TOTAL - _caught - _missed);
  }

  function _showOverlay(mode) {
    let body;
    if (mode === 'over') {
      body = `
        <div class="tg-over-title">GAME OVER</div>
        <div class="tg-over-score">${_caught} / ${TOTAL}</div>
        <div class="tg-over-sub">trophies caught</div>
        <button class="tg-btn">PLAY AGAIN</button>`;
    } else {
      body = `
        <div class="tg-over-title">TROPHY CATCH</div>
        <div class="tg-over-sub">Catch the falling trophies!<br>Use ← → or A / D to move</div>
        <button class="tg-btn">START</button>`;
    }
    _overlay.innerHTML = body;
    _overlay.classList.add('tg-overlay--show');
  }

  /* ───────────────────────────────────────
     INPUT
  ─────────────────────────────────────── */
  function _onKeyDown(e) {
    if (!_running) return;
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') { _left = true;  e.preventDefault(); }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { _right = true; e.preventDefault(); }
  }

  function _onKeyUp(e) {
    if (e.key === 'ArrowLeft'  || e.key === 'a' || e.key === 'A') _left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') _right = false;
  }

  function _stopLoop() {
    cancelAnimationFrame(_rafId);
    _rafId = null;
    clearInterval(_spawnTimer);
  }

  return { init, enter, leave };
})();

/* Public hooks (match the start/stop naming used elsewhere) */
function initTrophyGame()  { TrophyGame.init();  }
function startTrophyGame() { TrophyGame.enter(); }
function stopTrophyGame()  { TrophyGame.leave(); }
