/* ═══════════════════════════════════════════════
   PORTFOLIO CONTENT
   Edit this file to personalise your portfolio.
═══════════════════════════════════════════════ */
const PORTFOLIO = {

  /* ── About ──────────────────────────────────── */
  name:       'Gayathri Harshila',
  email:      'gayathri.22@cse.mrt.ac.lk',
  role:       'CS Engineer',
  university: 'University of Moratuwa',
  bio: [
    'A passionate CS student who',
    'builds things, breaks things,',
    'then builds them better.',
    'Loves software engineering',
    '& human-computer interaction.',
  ].join(' '),

  /* Skill bar percentages shown on About card */
  stats: {
    CODE:     85,
    DESIGN:   72,
    RESEARCH: 78,
    COFFEE:   99,
  },

  /* ── Education ───────────────────────────────── */
  education: [
    {
      institution: 'University of Moratuwa',
      degree:      'BSc Computer Science &amp; Engineering',
      period:      '2022 — Present',
      gpa:         'GPA: 3.8 / 4.0',
      highlights:  ["Dean's List", 'SE Track'],
    },
    {
      institution: 'XYZ National School',
      degree:      'A/L — Physical Science',
      period:      '2019 — 2021',
      gpa:         '3A Passes',
      highlights:  ['District Rank'],
    },
  ],

  /* ── Education Quest ─────────────────────────────
     Gamified Education page rendered as a quest log.
     `levels` are stored level-01-first; the renderer
     reverses them so the newest level shows on top.
     Add a new object here to add a future level — the
     left column scrolls automatically.
  ─────────────────────────────────────────────── */
  educationQuest: {
    /* Right column → PLAYER STATS card.
       Stats with a `pct` get an animated meter bar. */
    player: {
      stats: [
        { icon: '📚', label: 'Notes Collected', value: '999+' },
        { icon: '☕', label: 'Caffeine Mana',   value: '100%', pct: 100 },
        { icon: '💤', label: 'Sleep HP',        value: '18%',  pct: 18 },
        { icon: '⚠️', label: 'Panic Level',     value: '12%',  pct: 12 },
        { icon: '🧠', label: 'Brain RAM',        value: 'Full' },
        { icon: '⏳', label: 'Deadline Dodges',  value: '12' },
      ],
    },

    /* Right column → BADGE INVENTORY card.
       `icon` = smooth-pack SVG filename; `sub` = 2nd label line. */
    badges: [
      { icon: 'certificate_scroll.svg', label: "Dean's List", sub: '×4' },
      { icon: 'se_chip.svg',            label: 'SE Track' },
      { icon: 'trophy_gold.svg',        label: 'Rank 9' },
      { icon: 'trophy_silver.svg',      label: 'Rank 5' },
    ],

    /* Right column → QUEST SUMMARY card */
    summary: {
      rows: [
        { label: 'Total Quests',     value: '3' },
        { label: 'Active Quests',    value: '1' },
        { label: 'Quests Completed', value: '2' },
        { label: 'Caffeine Buff',    value: 'Probably Active' },
        { label: 'Sleep HP',         value: 'Critically Low' },
        { label: 'Next Level',       value: 'Graduation Loading...' },
      ],
    },

    /* Left column → QUEST LOG (level-01-first).
       `courses` and `transcript` are optional — a level
       without them renders as a compact card. */
    levels: [
      {
        level:    1,
        questName:'Ordinary Level Quest',
        status:   'done',              // done | active | locked
        emblemIcon:'school_building.svg',
        place:    "St. Joseph's Convent, Kegalle, Sri Lanka",
        meta: [
          "G.C.E. Ordinary Level: 9 A's",
          'Island Rank: 5th out of ~350,000 candidates (Top 0.001%)',
        ],
        chips: [
          { icon: 'trophy_gold.svg', label: "9 A's" },
          { icon: 'star.svg',        label: 'Top 0.001%' },
          { icon: 'crown.svg',       label: 'Rank 5' },
        ],
      },
      {
        level:    2,
        questName:'Advanced Level Quest',
        status:   'done',
        emblemIcon:'school_building.svg',
        degree:   'Primary and Secondary Education',
        place:    "St. Joseph's Convent, Kegalle, Sri Lanka",
        meta: [
          '📅 2008 — 2021',
          "G.C.E. Advanced Level: 3 A's in the Physical Science Stream &nbsp;—&nbsp; <b>Z-score: 2.83689</b>",
          'Island Rank: 9th out of ~35,000 candidates (Top 0.03%)',
        ],
        chips: [
          { icon: 'trophy_gold.svg', label: "3 A's" },
          { icon: 'star.svg',        label: 'Top 0.03%' },
          { icon: 'crown.svg',       label: 'Rank 9' },
        ],
      },
      {
        level:    3,
        questName:'University Quest',
        status:   'active',
        emblemIcon:'graduation_cap.svg',
        degree:   'B.Sc. Engineering (Hons.) in Computer Science and Engineering',
        place:    'University of Moratuwa, Moratuwa, Sri Lanka',
        meta: [
          '📅 Mar 2023 — Current',
          'GPA: 3.90 / 4.00',
          "Dean's List: Semesters 1, 2, 3 and 4",
        ],
        courses: [
          'Programming Fundamentals',
          'Data Structures &amp; Algorithms',
          'Operating Systems',
          'Computer Architecture',
          'Database Systems',
          'Artificial Intelligence',
          'Data Communication &amp; Networking',
          'Linear Algebra',
          'Applied Statistics',
          'Calculus',
          'Graph Theory',
        ],
        transcript: 'https://drive.google.com/file/d/1wiwXEPQDuT2LNz59Ek_4nPujSw-OaDGU/view?usp=sharing',
      },
    ],
  },

  /* ── Projects ────────────────────────────────── */
  projects: [
    {
      title:       'PROJECT ALPHA',
      description: 'A full-stack web app with real-time features.',
      tech:        ['React', 'Node.js', 'PostgreSQL'],
      github:      '#',
      demo:        '#',
    },
    {
      title:       'PROJECT BETA',
      description: 'Cross-platform mobile app built with React Native.',
      tech:        ['React Native', 'Firebase'],
      github:      '#',
      demo:        null,
    },
    {
      title:       'PROJECT GAMMA',
      description: 'ML pipeline for image classification tasks.',
      tech:        ['Python', 'TensorFlow', 'FastAPI'],
      github:      '#',
      demo:        null,
    },
    {
      title:       'PROJECT DELTA',
      description: 'CLI tool for automated code quality checks.',
      tech:        ['Python', 'AST', 'GitHub Actions'],
      github:      '#',
      demo:        null,
    },
  ],

  /* ── Awards ──────────────────────────────────── */
  awards: [
    { title: 'HACKATHON WINNER', org: 'SLIIT 2024',   icon: '🏆' },
    { title: 'MERIT SCHOLARSHIP', org: 'UOM 2022',    icon: '⭐' },
    { title: 'BEST PROJECT',      org: 'CS Dept 2023', icon: '🥇' },
    { title: 'OPEN SOURCE AWARD', org: 'GitHub 2023', icon: '🐙' },
  ],

  /* ── Skills ──────────────────────────────────── */
  skills: [
    { name: 'Python',     level: 90, icon: '🐍' },
    { name: 'JavaScript', level: 85, icon: '⚡' },
    { name: 'Java',       level: 75, icon: '☕' },
    { name: 'React',      level: 80, icon: '⚛️' },
    { name: 'SQL',        level: 70, icon: '🗄️' },
    { name: 'Git',        level: 88, icon: '🌿' },
  ],

  /* ── Contact ─────────────────────────────────── */
  contact: [
    { label: 'Email',    icon: '📧', href: 'mailto:gayathri.22@cse.mrt.ac.lk' },
    { label: 'GitHub',   icon: '🐙', href: 'https://github.com/' },
    { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/' },
    { label: 'Twitter',  icon: '🐦', href: 'https://twitter.com/' },
  ],
};
