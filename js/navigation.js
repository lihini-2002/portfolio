/* ═══════════════════════════════════════════════
   NAVIGATION  &  CONTENT RENDERER
═══════════════════════════════════════════════ */

/* ─── Menu items ────────────────────────────── */
const MENU_ITEMS = [
  { id: 'education', label: 'EDUCATION', icon: '🏫', screen: 'screen-education' },
  { id: 'projects',  label: 'PROJECTS',  icon: '💻', screen: 'screen-projects'  },
  { id: 'awards',    label: 'AWARDS',    icon: '🏆', screen: 'screen-awards'    },
  { id: 'skills',    label: 'SKILLS',    icon: '⚡', screen: 'screen-skills'    },
  { id: 'contact',   label: 'CONTACT',   icon: '📬', screen: 'screen-contact'   },
];

/* Maps screen id → which stage to activate and where to go back */
const SCREEN_INFO = {
  'screen-title':     { stage: 'title-sprite-stage',     back: null             },
  'screen-about':     { stage: 'about-sprite-stage',     back: 'screen-title'   },
  'screen-menu':      { stage: 'menu-sprite-stage',      back: 'screen-about'   },
  'screen-education': { stage: 'education-sprite-stage', back: 'screen-menu'    },
  'screen-projects':  { stage: 'projects-sprite-stage',  back: 'screen-menu'    },
  'screen-awards':    { stage: 'awards-sprite-stage',    back: 'screen-menu'    },
  'screen-skills':    { stage: 'skills-sprite-stage',    back: 'screen-menu'    },
  'screen-contact':   { stage: 'contact-sprite-stage',   back: 'screen-menu'    },
};

let _current       = 'screen-title';
let _menuIndex     = 0;
let _transitioning = false;

/* ═══════════════════════════════════════════════
   SCREEN TRANSITION
═══════════════════════════════════════════════ */
function navigateTo(targetId, direction) {
  if (_transitioning || targetId === _current) return;
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  _transitioning = true;

  const fromEl    = document.getElementById(_current);
  const enterClass = direction === 'back' ? 'screen--enter-back'    : 'screen--enter-forward';
  const exitClass  = direction === 'back' ? 'screen--exit-back'     : 'screen--exit-forward';

  /* Stop current scene */
  const fromInfo = SCREEN_INFO[_current];
  if (fromInfo?.stage) stopScene(fromInfo.stage);
  if (_current === 'screen-about') stopAboutIdle();

  /* Play exit animation on old screen */
  fromEl.classList.add(exitClass);

  /* Play enter animation on new screen — must be visible */
  targetEl.style.opacity    = '1';
  targetEl.style.pointerEvents = 'all';
  targetEl.classList.add(enterClass);

  const DURATION = 280; // ms — matches CSS animation duration

  setTimeout(() => {
    /* Deactivate old */
    fromEl.classList.remove('screen--active', exitClass);
    fromEl.style.opacity       = '0';
    fromEl.style.pointerEvents = 'none';

    /* Activate new */
    targetEl.classList.remove(enterClass);
    targetEl.classList.add('screen--active');

    _current       = targetId;
    _transitioning = false;

    /* Start new scene */
    const toInfo = SCREEN_INFO[targetId];
    if (toInfo?.stage) startScene(toInfo.stage);
    if (targetId === 'screen-about') startAboutIdle();
    if (targetId === 'screen-skills') _animateSkillBars();

    history.replaceState(null, '', `#${targetId.replace('screen-', '')}`);
  }, DURATION);
}

function goBack() {
  const info = SCREEN_INFO[_current];
  if (info?.back) navigateTo(info.back, 'back');
}

/* ═══════════════════════════════════════════════
   MENU PORTAL SYSTEM
═══════════════════════════════════════════════ */
function renderMenuPortals() {
  const track = document.getElementById('portal-track');
  if (!track) return;

  track.innerHTML = MENU_ITEMS.map((item, i) => `
    <div class="portal-item${i === 0 ? ' portal-item--active' : ''}"
         data-index="${i}" data-screen="${item.screen}" role="button" tabindex="0"
         aria-label="${item.label}">
      <div class="portal-sign">
        <span class="portal-sign-icon">${item.icon}</span>
        ${item.label}
      </div>
      <div class="portal-post"></div>
    </div>
  `).join('');

  track.querySelectorAll('.portal-item').forEach(el => {
    el.addEventListener('click', () => {
      setMenuActive(parseInt(el.dataset.index));
      selectMenuItem();
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        setMenuActive(parseInt(el.dataset.index));
        selectMenuItem();
      }
    });
  });
}

function setMenuActive(index) {
  _menuIndex = Math.max(0, Math.min(MENU_ITEMS.length - 1, index));

  const track = document.getElementById('portal-track');
  if (!track) return;

  track.querySelectorAll('.portal-item').forEach((el, i) => {
    el.classList.toggle('portal-item--active', i === _menuIndex);
  });

  /* Slide track to centre the active portal */
  const itemW    = 76 + 20 + 20; // min-width + padding + gap ≈ 116px
  const viewW    = track.parentElement?.offsetWidth || 480;
  const offset   = _menuIndex * itemW - (viewW / 2) + (itemW / 2) - 40;
  track.style.transform = `translateX(${-Math.max(0, offset)}px)`;
}

function selectMenuItem() {
  const item = MENU_ITEMS[_menuIndex];
  if (item) navigateTo(item.screen, 'forward');
}

/* ═══════════════════════════════════════════════
   CONTENT RENDERING
═══════════════════════════════════════════════ */
function renderAllContent() {
  _renderEducation();
  _renderProjects();
  _renderAwards();
  _renderSkills();
  _renderContact();
}

function _renderEducation() {
  const el = document.getElementById('content-education');
  if (!el) return;
  el.innerHTML = PORTFOLIO.education.map(edu => `
    <div class="content-card">
      <div class="content-card__title">${edu.institution}</div>
      <div class="content-card__body">
        ${edu.degree}<br>
        ${edu.period}<br>
        ${edu.gpa}
      </div>
      <div class="content-card__tags">
        ${edu.highlights.map(h => `<span class="tag">${h}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function _renderProjects() {
  const el = document.getElementById('content-projects');
  if (!el) return;
  el.innerHTML = PORTFOLIO.projects.map(p => `
    <div class="content-card">
      <div class="content-card__title">${p.title}</div>
      <div class="content-card__body">${p.description}</div>
      <div class="content-card__tags">
        ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
      <div class="content-card__tags" style="margin-top:4px;">
        ${p.github ? `<a href="${p.github}" class="tag tag--dark tag-link" target="_blank" rel="noopener">GIT</a>` : ''}
        ${p.demo   ? `<a href="${p.demo}"   class="tag tag--hot  tag-link" target="_blank" rel="noopener">LIVE</a>` : ''}
      </div>
    </div>
  `).join('');
}

function _renderAwards() {
  const el = document.getElementById('content-awards');
  if (!el) return;
  el.innerHTML = PORTFOLIO.awards.map(a => `
    <div class="content-card" style="text-align:center;">
      <span class="content-card__icon">${a.icon}</span>
      <div class="content-card__title">${a.title}</div>
      <div class="content-card__body">${a.org}</div>
    </div>
  `).join('');
}

function _renderSkills() {
  const el = document.getElementById('content-skills');
  if (!el) return;
  el.innerHTML = `<div class="skills-grid" style="width:100%;">` +
    PORTFOLIO.skills.map(s => `
      <div class="skill-row">
        <div class="skill-header">
          <span class="skill-name">${s.icon || ''} ${s.name}</span>
          <span class="skill-pct">${s.level}%</span>
        </div>
        <div class="skill-meter">
          <div class="skill-fill" data-level="${s.level}"></div>
        </div>
      </div>
    `).join('') +
  `</div>`;
}

function _animateSkillBars() {
  setTimeout(() => {
    document.querySelectorAll('#content-skills .skill-fill').forEach(bar => {
      bar.style.width = bar.dataset.level + '%';
    });
  }, 80);
}

function _renderContact() {
  const el = document.getElementById('content-contact');
  if (!el) return;
  el.innerHTML = `<div class="contact-grid" style="width:100%;">` +
    PORTFOLIO.contact.map(c => `
      <a href="${c.href}" class="contact-item" target="_blank" rel="noopener">
        <span class="contact-icon">${c.icon}</span>
        <span>${c.label}</span>
      </a>
    `).join('') +
  `</div>`;
}

/* ═══════════════════════════════════════════════
   KEYBOARD INPUT
═══════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (_transitioning) return;

  switch (_current) {
    case 'screen-title':
      if (e.key === 'Enter' || e.key === ' ')      navigateTo('screen-about', 'forward');
      if (e.key === 'a'     || e.key === 'A')      navigateTo('screen-about', 'forward');
      break;

    case 'screen-about':
      if (e.key === 'Enter' || e.key === ' ')      navigateTo('screen-menu', 'forward');
      if (e.key === 'Escape' || e.key === 'Backspace') goBack();
      if (e.key === 'b' || e.key === 'B')          goBack();
      break;

    case 'screen-menu':
      if (e.key === 'ArrowLeft')                   setMenuActive(_menuIndex - 1);
      if (e.key === 'ArrowRight')                  setMenuActive(_menuIndex + 1);
      if (e.key === 'Enter' || e.key === ' ')      selectMenuItem();
      if (e.key === 'Escape' || e.key === 'Backspace') goBack();
      if (e.key === 'b' || e.key === 'B')          goBack();
      break;

    default:
      if (e.key === 'Escape' || e.key === 'Backspace') goBack();
      if (e.key === 'b' || e.key === 'B')          goBack();
      break;
  }
});

/* ═══════════════════════════════════════════════
   D-PAD + BUTTON WIRING
═══════════════════════════════════════════════ */
function _wireDpad() {
  const wire = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);
  wire('dpad-left',  () => setMenuActive(_menuIndex - 1));
  wire('dpad-right', () => setMenuActive(_menuIndex + 1));
  wire('btn-a', () => {
    if (_current === 'screen-title')  navigateTo('screen-about', 'forward');
    else if (_current === 'screen-about') navigateTo('screen-menu', 'forward');
    else if (_current === 'screen-menu')  selectMenuItem();
  });
  wire('btn-b', () => goBack());
}

/* ─── All .back-btn elements ─────────────────── */
function _wireBackButtons() {
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) navigateTo(target, 'back');
    });
  });
}

/* ─── About "continue" button ────────────────── */
function _wireAboutContinue() {
  document.getElementById('about-continue')?.addEventListener('click', () => {
    navigateTo('screen-menu', 'forward');
  });
}

/* ─── Title screen click ─────────────────────── */
function _wireTitleClick() {
  document.getElementById('screen-title')?.addEventListener('click', () => {
    if (_current === 'screen-title') navigateTo('screen-about', 'forward');
  });
}

/* ═══════════════════════════════════════════════
   HASH ROUTING
═══════════════════════════════════════════════ */
function _resolveHash() {
  const hash     = window.location.hash.replace('#', '');
  const screenId = hash ? `screen-${hash}` : null;
  if (screenId && SCREEN_INFO[screenId] && screenId !== 'screen-title') {
    document.getElementById('screen-title')?.classList.remove('screen--active');
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('screen--active');
      target.style.opacity      = '1';
      target.style.pointerEvents = 'all';
      _current = screenId;
      const info = SCREEN_INFO[screenId];
      if (info?.stage) startScene(info.stage);
      if (screenId === 'screen-about') startAboutIdle();
      if (screenId === 'screen-skills') _animateSkillBars();
    }
  }
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAllScenes();      /* sprites.js */
  renderAllContent();
  renderMenuPortals();
  _wireDpad();
  _wireBackButtons();
  _wireAboutContinue();
  _wireTitleClick();

  /* Start title scene */
  startScene('title-sprite-stage');

  /* Handle deep links */
  _resolveHash();
});
