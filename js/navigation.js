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
  if (_current === 'screen-projects') stopProjectsIdle();
  if (_current === 'screen-awards') stopTrophyGame();

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
    if (targetId === 'screen-projects') startProjectsIdle();
    if (targetId === 'screen-awards') startTrophyGame();

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
  const list = document.getElementById('menu-list');
  if (!list) return;

  list.innerHTML = MENU_ITEMS.map((item, i) => `
    <button class="menu-plate${i === 0 ? ' menu-plate--active' : ''}"
         data-index="${i}" data-screen="${item.screen}"
         aria-label="${item.label}">
      <span class="rivet rivet--tl"></span>
      <span class="rivet rivet--tr"></span>
      <span class="rivet rivet--bl"></span>
      <span class="rivet rivet--br"></span>
      <span class="menu-plate-label">
        <span class="menu-plate-icon">${item.icon}</span>${item.label}
      </span>
    </button>
  `).join('');

  list.querySelectorAll('.menu-plate').forEach(el => {
    el.addEventListener('click', () => {
      setMenuActive(parseInt(el.dataset.index));
      selectMenuItem();
    });
    el.addEventListener('mouseenter', () => {
      setMenuActive(parseInt(el.dataset.index));
    });
  });
}

function setMenuActive(index) {
  _menuIndex = Math.max(0, Math.min(MENU_ITEMS.length - 1, index));

  const list = document.getElementById('menu-list');
  if (!list) return;

  const plates = list.querySelectorAll('.menu-plate');
  plates.forEach((el, i) => {
    el.classList.toggle('menu-plate--active', i === _menuIndex);
  });

  /* Keep the active plate scrolled into view */
  plates[_menuIndex]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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

/* ─── Education Quest log ─────────────────────────
   Two-column layout: scrollable quest log (left) +
   stat / badge / summary sidebar (right). Card bodies
   are placeholders for now — filled in later passes.
─────────────────────────────────────────────────── */
function _renderEducation() {
  const el = document.getElementById('content-education');
  if (!el) return;

  const eq = PORTFOLIO.educationQuest;

  el.innerHTML = `
    <div class="eduquest">
      <section class="eq-quest-log">
        <div class="eq-levels">
          ${eq.levels.slice().reverse().map(_eqLevelCard).join('')}
        </div>
      </section>
      <aside class="eq-sidebar">
        ${_eqPlayerCard(eq.player)}
        ${_eqBadgeCard(eq.badges)}
        ${_eqSummaryCard(eq.summary)}
      </aside>
    </div>
  `;
}

function _eqLevelCard(lv) {
  const num = String(lv.level).padStart(2, '0');

  const EQ_ICONS = 'images/education-icons-smooth/';

  /* Each meta line becomes a row; a leading 📅 → calendar
     icon, everything else → a pink diamond marker. */
  const meta = (lv.meta || [])
    .map(m => {
      let icon = 'diamond_marker.svg';
      let text = m;
      if (m.startsWith('📅')) {
        icon = 'calendar.svg';
        text = m.replace(/^📅\s*/, '');
      }
      return `<div class="eq-meta-item">
        <img class="eq-meta-icon" src="${EQ_ICONS}${icon}" alt="">
        <span>${text}</span>
      </div>`;
    })
    .join('');

  const chips = lv.chips?.length ? `
    <div class="eq-level-chips">
      ${lv.chips.map(c => `
        <span class="eq-chip">
          <img class="eq-chip-icon" src="${EQ_ICONS}${c.icon}" alt="">${c.label}
        </span>`).join('')}
    </div>` : '';

  const courses = lv.courses?.length ? `
    <div class="eq-courses">
      <div class="eq-courses-label">COURSEWORK UNLOCKED ✦</div>
      <div class="eq-courses-grid">
        ${lv.courses.map(c => `<span class="eq-course">${c}</span>`).join('')}
      </div>
    </div>` : '';

  const transcript = lv.transcript ? `
    <div class="eq-level-actions">
      <a class="eq-transcript-btn" href="${lv.transcript}" target="_blank" rel="noopener">
        <img class="eq-btn-icon" src="${EQ_ICONS}certificate_scroll.svg" alt="">VIEW TRANSCRIPT
      </a>
    </div>` : '';

  return `
    <div class="eq-tl-row eq-tl-row--${lv.status}">
      <div class="eq-tl-rail">
        <img class="eq-tl-node" src="${EQ_ICONS}diamond_marker.svg" alt="">
      </div>
      <article class="eq-level eq-level--${lv.status}">
        <header class="eq-level-top">
          <span class="eq-level-badge">✦ LEVEL ${num}</span>
          <span class="eq-level-name">${lv.questName || ''}</span>
          <span class="eq-level-status">${_eqStatusLabel(lv.status)}</span>
        </header>
        <div class="eq-level-content">
          ${lv.emblemIcon
            ? `<span class="eq-level-emblem eq-level-emblem--icon"><img src="${EQ_ICONS}${lv.emblemIcon}" alt=""></span>`
            : (lv.emblem ? `<span class="eq-level-emblem">${lv.emblem}</span>` : '')}
          <div class="eq-level-main">
            ${lv.degree ? `<div class="eq-level-degree">${lv.degree}</div>` : ''}
            ${lv.place  ? `<div class="eq-level-place">${lv.place}</div>` : ''}
            ${meta ? `<div class="eq-level-meta">${meta}</div>` : ''}
            ${courses}
            ${chips}
            ${transcript}
          </div>
        </div>
      </article>
    </div>
  `;
}

function _eqStatusLabel(status) {
  if (status === 'active') return '★ ACTIVE QUEST';
  if (status === 'locked') return '🔒 LOCKED';
  return '✓ QUEST CLEARED';
}

function _eqPlayerCard(p) {
  const stats = (p.stats || []).map(s => `
    <div class="eq-stat">
      <div class="eq-stat-top">
        <span class="eq-stat-label">${s.icon} ${s.label}</span>
        <span class="eq-stat-value">${s.value}</span>
      </div>
      ${s.pct != null ? `
        <div class="eq-stat-meter">
          <div class="eq-stat-fill" style="width:${s.pct}%;"></div>
        </div>` : ''}
    </div>
  `).join('');

  return `
    <div class="eq-card eq-card--player">
      <div class="eq-card-title">PLAYER STATS</div>
      <div class="eq-card-body">${stats}</div>
    </div>
  `;
}

function _eqBadgeCard(badges) {
  const EQ_ICONS = 'images/education-icons-smooth/';
  const grid = (badges || []).map(b => `
    <div class="eq-badge">
      <div class="eq-badge-box"><img src="${EQ_ICONS}${b.icon}" alt=""></div>
      <div class="eq-badge-label">${b.label}${b.sub ? `<br>${b.sub}` : ''}</div>
    </div>`).join('');

  return `
    <div class="eq-card eq-card--badges">
      <div class="eq-card-title">BADGE INVENTORY</div>
      <div class="eq-card-body">
        <div class="eq-badges">${grid}</div>
      </div>
    </div>
  `;
}

function _eqSummaryCard(s) {
  const rows = (s.rows || []).map(r => `
    <div class="eq-sum-row">
      <span class="eq-sum-label">${r.label}</span>
      <span class="eq-sum-value">${r.value}</span>
    </div>`).join('');

  return `
    <div class="eq-card eq-card--summary">
      <div class="eq-card-title">QUEST SUMMARY</div>
      <div class="eq-card-body">${rows}</div>
    </div>
  `;
}

/* ─── Projects: sidebar + two-column card grid ────
   Left purple sidebar (animated character + stats +
   category filter) and a right grid whose left column
   is pink-themed and right column purple-themed.
─────────────────────────────────────────────────── */
let _projectFilter = 'all';   // active category id, or 'all'

function _renderProjects() {
  const el = document.getElementById('content-projects');
  if (!el) return;

  el.innerHTML = `
    <div class="projects">
      ${_pjSidebar()}
      <div class="pj-main">
        <div class="pj-intro">
          <img class="pj-intro-icon" src="images/education-icons-smooth/laptop.svg" alt="">
          <p class="pj-intro-text">Some of the things I've built, broken and put back together</p>
        </div>
        <section class="pj-grid" id="pj-grid">
          ${_pjCards(PORTFOLIO.projects)}
        </section>
      </div>
    </div>
  `;

  /* The character host only exists now that the sidebar
     has been injected — start its idle animation. */
  initProjectsIdle();
}

function _pjSidebar() {
  return `
    <aside class="pj-sidebar">
      <div class="pj-char-frame">
        <div id="projects-sprite" class="sprite sprite--adventurer-idle"></div>
        <div class="pj-speech" aria-hidden="true">♥</div>
        <span class="pj-spark pj-spark--1" aria-hidden="true">✦</span>
        <span class="pj-spark pj-spark--2" aria-hidden="true">✦</span>
        <span class="pj-spark pj-spark--3" aria-hidden="true">✧</span>
      </div>
      ${_pjUnlockedBanner()}
      ${_pjStatsCard()}
      ${_pjFilter()}
    </aside>
  `;
}

function _pjCount(predicate) {
  return PORTFOLIO.projects.filter(predicate).length;
}

function _pjUnlockedBanner() {
  return `
    <div class="pj-unlocked">
      <span class="pj-unlocked-num">${PORTFOLIO.projects.length}</span>
      <span class="pj-unlocked-label">PROJECTS UNLOCKED</span>
    </div>
  `;
}

function _pjStatsCard() {
  const rows = [
    { label: 'Featured',    value: _pjCount(p => p.featured) },
    { label: 'Completed',   value: _pjCount(p => p.status === 'completed') },
    { label: 'In Progress', value: _pjCount(p => p.status === 'in-progress') },
    { label: 'Planned',     value: _pjCount(p => p.status === 'planned') },
  ];
  return `
    <div class="pj-stats">
      <div class="pj-card-title">PROGRESS</div>
      <div class="pj-stats-body">
        ${rows.map(r => `
          <div class="pj-stat-row">
            <span class="pj-stat-label">${r.label}</span>
            <span class="pj-stat-value">${r.value}</span>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function _pjFilter() {
  const chip = (id, label, count, active) => `
    <button class="pj-filter-chip${active ? ' pj-filter-chip--active' : ''}"
            data-filter="${id}" type="button">
      <span class="pj-filter-name">${label}</span>
      <span class="pj-filter-count">${count}</span>
    </button>`;

  const cats = PORTFOLIO.projectCategories.map(c =>
    chip(c.id, c.label, _pjCount(p => p.category === c.id), _projectFilter === c.id)
  ).join('');

  return `
    <div class="pj-filter">
      <div class="pj-card-title">CATEGORIES</div>
      <div class="pj-filter-list">
        ${chip('all', 'ALL', PORTFOLIO.projects.length, _projectFilter === 'all')}
        ${cats}
      </div>
    </div>
  `;
}

function _pjCards(projects) {
  if (!projects.length) {
    return `<div class="pj-empty">NO PROJECTS HERE YET ✦</div>`;
  }
  return projects.map(_pjCard).join('');
}

/* Category id → display label (from projectCategories). */
function _pjCatLabel(id) {
  const cat = PORTFOLIO.projectCategories.find(c => c.id === id);
  return cat ? cat.label : (id || '').toUpperCase();
}

function _pjCard(p, i) {
  /* Alternate the two-tone theme per stacked card. */
  const theme = i % 2 === 0 ? 'pj-card--pink' : 'pj-card--purple';
  const image = p.image || `images/project-art/${p.category}.svg`;
  const link  = p.demo || p.github;

  return `
    <article class="pj-card ${theme}">
      ${p.featured ? `<span class="pj-ribbon">★ FEATURED</span>` : ''}
      <span class="pj-fav" aria-hidden="true">♥</span>

      <div class="pj-card-top">
        <div class="pj-card-media">
          <img src="${image}" alt="" loading="lazy">
        </div>
        <div class="pj-card-main">
          <h3 class="pj-card-name">${p.title}</h3>
          <span class="pj-cat-badge">${_pjCatLabel(p.category)}</span>
          <p class="pj-card-body">${p.description}</p>
          <div class="pj-techstack">
            <div class="pj-tech-label">TECH STACK</div>
            <div class="pj-tech-tags">
              ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="pj-card-footer">
        <span class="pj-year">${p.year ? `★ ${p.year}` : ''}</span>
        ${link ? `<a class="pj-view" href="${link}" target="_blank" rel="noopener">VIEW PROJECT ▸</a>` : ''}
      </div>
    </article>
  `;
}

/* Re-render only the card grid for the active filter. */
function _renderProjectGrid() {
  const grid = document.getElementById('pj-grid');
  if (!grid) return;
  const list = _projectFilter === 'all'
    ? PORTFOLIO.projects
    : PORTFOLIO.projects.filter(p => p.category === _projectFilter);
  grid.innerHTML = _pjCards(list);
}

/* Click handling for the category filter chips. */
function _wireProjectFilter() {
  const el = document.getElementById('content-projects');
  if (!el) return;
  el.addEventListener('click', e => {
    const chip = e.target.closest('.pj-filter-chip');
    if (!chip) return;
    _projectFilter = chip.dataset.filter;
    el.querySelectorAll('.pj-filter-chip').forEach(c =>
      c.classList.toggle('pj-filter-chip--active', c.dataset.filter === _projectFilter)
    );
    _renderProjectGrid();
  });
}

function _renderAwards() {
  const el = document.getElementById('content-awards');
  if (!el) return;
  el.innerHTML = PORTFOLIO.awards.map(a => `
    <div class="content-card award-card">
      <div class="award-card__head">
        <span class="content-card__icon award-card__icon">${a.icon}</span>
        <div class="content-card__title award-card__title">${a.title}</div>
      </div>
      <div class="content-card__body award-card__org">${a.org}</div>
      ${a.desc ? `<div class="award-card__desc">${a.desc}</div>` : ''}
    </div>
  `).join('');
}

function _renderSkills() {
  const el = document.getElementById('content-skills');
  if (!el) return;
  el.innerHTML = `<div class="skills-cats">` +
    PORTFOLIO.skills.map(cat => `
      <div class="skill-cat">
        <div class="skill-cat__title">${cat.category}</div>
        <div class="skill-cat__grid">
          ${cat.techs.map(t => `
            <div class="skill-tech">
              <span class="skill-tech__logo">${
                t.icon ? `<i class="${t.icon}"></i>` : (t.emoji || '')
              }</span>
              <span class="skill-tech__name">${t.name}</span>
            </div>`).join('')}
        </div>
      </div>`).join('') +
  `</div>`;
}

function _renderContact() {
  const el = document.getElementById('content-contact');
  if (!el) return;

  const stations = PORTFOLIO.contact.map(c => `
    <a class="rm-station" href="${c.href}" target="_blank" rel="noopener">
      <div class="rm-marker"><img src="${c.icon}" alt=""></div>
      <div class="rm-title">${c.label}</div>
      <div class="rm-sub">${c.sub}</div>
    </a>`).join('');

  el.innerHTML = `
    <div class="contact-page">

      <!-- Floating decorations (clouds / hearts / stars) -->
      <div class="contact-decor" aria-hidden="true">
        <img class="cd cd-cloud cd-cloud--1" src="images/decor/soft_cloud_pink.svg" alt="">
        <img class="cd cd-cloud cd-cloud--2" src="images/decor/soft_cloud_purple.svg" alt="">
        <img class="cd cd-cloud cd-cloud--3" src="images/decor/soft_cloud_purple.svg" alt="">
        <img class="cd cd-cloud cd-cloud--4" src="images/decor/soft_cloud_pink.svg" alt="">
        <img class="cd cd-heart cd-heart--1" src="images/decor/soft_heart_pink.svg" alt="">
        <img class="cd cd-heart cd-heart--2" src="images/decor/soft_tiny_heart.svg" alt="">
        <img class="cd cd-heart cd-heart--3" src="images/decor/soft_heart_pink.svg" alt="">
        <img class="cd cd-heart cd-heart--4" src="images/decor/soft_tiny_heart.svg" alt="">
        <img class="cd cd-star cd-star--1" src="images/decor/soft_star_pink.svg" alt="">
        <img class="cd cd-star cd-star--2" src="images/decor/soft_star_white.svg" alt="">
        <img class="cd cd-star cd-star--3" src="images/decor/soft_star_pink.svg" alt="">
      </div>

      <!-- TOP: message form -->
      <form class="contact-form"
            action="https://formspree.io/f/YOUR_ID" method="POST">
        <!-- Soft pastel decorations inside the box -->
        <div class="contact-form-bg" aria-hidden="true">
          <img class="cfbg cfbg-cloud--tl" src="images/decor/soft_cloud_corner.svg" alt="">
          <img class="cfbg cfbg-cloud--br" src="images/decor/soft_cloud_purple.svg" alt="">
          <img class="cfbg cfbg-cloud--tr" src="images/decor/soft_cloud_pink.svg" alt="">
          <img class="cfbg cfbg-cloud--bl" src="images/decor/soft_cloud_pink.svg" alt="">
          <img class="cfbg cfbg-cloud--mid" src="images/decor/soft_cloud_purple.svg" alt="">
          <img class="cfbg cfbg-cloud--p1" src="images/decor/soft_cloud_purple.svg" alt="">
          <img class="cfbg cfbg-cloud--p2" src="images/decor/soft_cloud_purple.svg" alt="">
          <img class="cfbg cfbg-cloud--p3" src="images/decor/soft_cloud_purple.svg" alt="">
          <img class="cfbg cfbg-sparkle"   src="images/decor/soft_sparkle_set.svg" alt="">
          <img class="cfbg cfbg-star"       src="images/decor/soft_star_pink.svg" alt="">
          <img class="cfbg cfbg-heart"      src="images/decor/soft_heart_pink.svg" alt="">
        </div>
        <div class="contact-form-title">
          <img class="contact-form-computer" src="images/contact/retro_computer.svg" alt="">
          <span>SEND A MESSAGE</span>
        </div>
        <div class="contact-fields">
          <label class="contact-field">
            <span class="contact-label">NAME</span>
            <input class="contact-input" type="text" name="name"
                   placeholder="your name" required>
          </label>
          <label class="contact-field">
            <span class="contact-label">EMAIL</span>
            <input class="contact-input" type="email" name="email"
                   placeholder="you@email.com" required>
          </label>
          <label class="contact-field contact-field--full">
            <span class="contact-label">MESSAGE</span>
            <textarea class="contact-input contact-textarea" name="message"
                      rows="4" placeholder="say hi..." required></textarea>
          </label>
        </div>
        <button class="contact-send" type="submit">SEND ▸</button>
      </form>

      <!-- RESUME row -->
      <div class="contact-box contact-resume">
        <img class="contact-sticker contact-sticker--left"
             src="images/contact/art_pixel_sticker.gif" alt="" aria-hidden="true">
        <div class="contact-resume-info">
          <div class="contact-box-title">📄 RESUME</div>
          <p class="contact-box-text">Grab a copy of my latest resume.</p>
          <a class="contact-download" href="${PORTFOLIO.resumeUrl}"
             target="_blank" rel="noopener">
            ⬇ DOWNLOAD
          </a>
        </div>
        <img class="contact-sticker contact-sticker--right"
             src="images/contact/happy_in_love_sticker.gif" alt="" aria-hidden="true">
      </div>

      <!-- WAYS TO CONNECT — road map -->
      <div class="contact-box contact-roadmap">
        <div class="rm-header">★ WAYS TO CONNECT — CHOOSE YOUR PATH</div>
        <div class="rm-track">
          <img class="rm-sign rm-start" src="images/contact/start_sign.svg" alt="Start">
          <img class="rm-sticker" src="images/contact/dance_love_sticker.gif"
               alt="" aria-hidden="true">
          <div class="rm-stations">
            <svg class="rm-path" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
              <path d="M2,10 Q 16,1 25,10 T 50,10 T 75,10 T 98,10"
                    fill="none" stroke="#FF4499" stroke-width="1.2"
                    stroke-linecap="round" stroke-dasharray="0.4 3"
                    vector-effect="non-scaling-stroke"/>
            </svg>
            ${stations}
          </div>
          <img class="rm-sign rm-end" src="images/contact/end_flag_sign.svg" alt="Connect">
        </div>
      </div>

    </div>
  `;
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
      if (e.key === 'ArrowUp')                     setMenuActive(_menuIndex - 1);
      if (e.key === 'ArrowDown')                   setMenuActive(_menuIndex + 1);
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
  wire('dpad-up',    () => setMenuActive(_menuIndex - 1));
  wire('dpad-down',  () => setMenuActive(_menuIndex + 1));
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
      if (screenId === 'screen-projects') startProjectsIdle();
      if (screenId === 'screen-awards') startTrophyGame();
    }
  }
}

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAllScenes();      /* sprites.js */
  renderAllContent();
  initTrophyGame();     /* trophy-game.js */
  renderMenuPortals();
  _wireDpad();
  _wireBackButtons();
  _wireAboutContinue();
  _wireTitleClick();
  _wireProjectFilter();

  /* Start title scene */
  startScene('title-sprite-stage');

  /* Handle deep links */
  _resolveHash();
});
