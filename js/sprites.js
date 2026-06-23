/* ═══════════════════════════════════════════════
   SPRITE ENGINE
═══════════════════════════════════════════════ */

/* ─── SpriteAnimator ────────────────────────────
   Cycles a CSS sprite-sheet's background-position-x
   at a given fps using setInterval.
──────────────────────────────────────────────── */
class SpriteAnimator {
  constructor(el, frameCount, frameW, fps = 8) {
    this.el         = el;
    this.frameCount = frameCount;
    this.frameW     = frameW;
    this.fps        = fps;
    this.frame      = 0;
    this._timer     = null;
  }

  start() {
    if (this._timer) return;
    this._timer = setInterval(() => this._tick(), 1000 / this.fps);
  }

  stop() {
    clearInterval(this._timer);
    this._timer = null;
  }

  _tick() {
    this.frame = (this.frame + 1) % this.frameCount;
    this.el.style.backgroundPositionX = `${-(this.frame * this.frameW)}px`;
  }
}

/* ─── SpriteRunner ──────────────────────────────
   A sprite that scrolls left across a stage at
   a constant speed (px/s), resetting to the right
   edge when it exits the left.
──────────────────────────────────────────────── */
class SpriteRunner {
  constructor({ stage, cssClass, frameCount, frameW, fps, speed, delay, yOffset }) {
    this._stage      = stage;
    this._cssClass   = cssClass;
    this._frameCount = frameCount;
    this._frameW     = frameW;
    this._fps        = fps;
    this._speed      = speed;    // px per second
    this._delay      = delay  || 0;
    this._yOffset    = yOffset || 4;

    this._el         = null;
    this._animator   = null;
    this._posX       = 0;
    this._lastTime   = 0;
    this._rafId      = null;
    this._active     = false;
  }

  init() {
    this._el = document.createElement('div');
    this._el.className = `sprite ${this._cssClass}`;
    this._el.style.cssText = `position:absolute; bottom:${this._yOffset}px;`;
    this._stage.appendChild(this._el);

    this._posX = this._stage.offsetWidth + 30;
    this._el.style.left = this._posX + 'px';

    this._animator = new SpriteAnimator(
      this._el, this._frameCount, this._frameW, this._fps
    );
  }

  start() {
    if (!this._el) this.init();
    if (this._active) return;
    setTimeout(() => {
      this._active   = true;
      this._lastTime = performance.now();
      this._animator.start();
      this._rafId = requestAnimationFrame(t => this._loop(t));
    }, this._delay);
  }

  stop() {
    this._active = false;
    cancelAnimationFrame(this._rafId);
    this._animator?.stop();
  }

  destroy() {
    this.stop();
    this._el?.remove();
    this._el = null;
  }

  _loop(timestamp) {
    if (!this._active) return;
    const dt = timestamp - this._lastTime;
    this._lastTime = timestamp;

    this._posX -= (this._speed * dt) / 1000;

    const elWidth = this._el.offsetWidth || parseInt(getComputedStyle(this._el).width) || 96;
    if (this._posX < -elWidth - 10) {
      this._posX = this._stage.offsetWidth + 30;
    }

    this._el.style.left = this._posX + 'px';
    this._rafId = requestAnimationFrame(t => this._loop(t));
  }
}

/* ═══════════════════════════════════════════════
   SPRITE CONFIGS
   frameW values are in display pixels (scaled).
═══════════════════════════════════════════════ */
const SPRITE_CONFIGS = {
  adventurer: {
    cssClass: 'sprite--adventurer',
    frameCount: 8,
    frameW: 96,   // 48px × 2
    fps: 8,
  },
  adventurerMini: {
    cssClass: 'sprite--adventurer-mini',
    frameCount: 8,
    frameW: 48,   // 48px × 1
    fps: 8,
  },
  mushroom: {
    cssClass: 'sprite--mushroom',
    frameCount: 8,
    frameW: 120,  // 80px × 1.5
    fps: 8,
  },
};

/* ═══════════════════════════════════════════════
   SCENE REGISTRY  (keyed by sprite-stage id)
═══════════════════════════════════════════════ */
const _scenes = {};

function createScene(stageId, runnerDefs) {
  const stage = document.getElementById(stageId);
  if (!stage) return;

  _scenes[stageId] = runnerDefs.map(def => {
    const cfg = SPRITE_CONFIGS[def.type];
    return new SpriteRunner({
      stage,
      cssClass:   cfg.cssClass,
      frameCount: cfg.frameCount,
      frameW:     cfg.frameW,
      fps:        cfg.fps,
      speed:  def.speed  || 60,
      delay:  def.delay  || 0,
      yOffset: def.yOffset || 4,
    });
  });
}

function startScene(stageId) {
  (_scenes[stageId] || []).forEach(r => r.start());
}

function stopScene(stageId) {
  (_scenes[stageId] || []).forEach(r => r.stop());
}

/* ═══════════════════════════════════════════════
   ABOUT SCREEN — idle sprite animator
═══════════════════════════════════════════════ */
let _aboutIdle = null;

function initAboutIdle() {
  const el = document.getElementById('about-sprite');
  if (!el) return;
  _aboutIdle = new SpriteAnimator(el, 8, 96, 4);
}

function startAboutIdle() { _aboutIdle?.start(); }
function stopAboutIdle()  { _aboutIdle?.stop();  }

/* ═══════════════════════════════════════════════
   SCENE DEFINITIONS
═══════════════════════════════════════════════ */
function initAllScenes() {
  createScene('title-sprite-stage', [
    { type: 'adventurer',     speed: 55,  delay: 0    },
    { type: 'mushroom',       speed: 38,  delay: 1400 },
    { type: 'adventurerMini', speed: 72,  delay: 700  },
  ]);

  createScene('about-sprite-stage', [
    { type: 'mushroom',       speed: 40,  delay: 0    },
    { type: 'adventurerMini', speed: 60,  delay: 2000 },
  ]);

  createScene('menu-sprite-stage', [
    { type: 'adventurerMini', speed: 62,  delay: 0,    yOffset: 4 },
    { type: 'mushroom',       speed: 42,  delay: 1800, yOffset: 4 },
    { type: 'adventurerMini', speed: 78,  delay: 900,  yOffset: 4 },
  ]);

  ['education', 'projects', 'awards', 'skills', 'contact'].forEach(id => {
    createScene(`${id}-sprite-stage`, [
      { type: 'mushroom',       speed: 38,  delay: 0    },
      { type: 'adventurerMini', speed: 64,  delay: 1600 },
    ]);
  });

  initAboutIdle();
}
