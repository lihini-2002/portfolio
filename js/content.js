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

  /* ── Education Quest (gamified Education page) ──── */
  /* Drives the platformer-style Education screen.    */
  educationQuest: {
    player: {
      name:  'GAYATHRI',
      level: 22,
      xp:    780,
      xpMax: 1000,
      skills: [
        { label: 'Code',     pct: 82 },
        { label: 'Design',   pct: 64 },
        { label: 'Research', pct: 74 },
        { label: 'HCI',      pct: 55 },
      ],
    },
    /* status: 'done' | 'active' | 'locked' | 'boss' */
    levels: [
      {
        title:  'BSc Computer Science & Engineering',
        sub:    'University of Moratuwa',
        meta:   ['CGPA 3.94 / 4.0', 'Expected May 2027'],
        status: 'active',
      },
    ],
    achievements: [
      { icon: '🐞', title: 'Debug Master',    note: 'Fix 100 bugs',        done: true   },
      { icon: '🎨', title: 'UI Explorer',     note: '3 design challenges', progress: '3/5'  },
      { icon: '🔬', title: 'Research Rookie', note: 'Read 10 papers',      progress: '6/10' },
    ],
    courses: [
      { title: 'JavaScript Essentials', note: 'Variables, functions & more', pct: 72, xp: 120 },
      { title: 'Responsive Web Design', note: 'Build for any screen size',   pct: 46, xp: 150 },
      { title: 'User Research Basics',  note: 'Understand your users',       pct: 35, xp: 100 },
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
