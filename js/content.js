/* ═══════════════════════════════════════════════
   PORTFOLIO CONTENT
   Edit this file to personalise your portfolio.
═══════════════════════════════════════════════ */
const PORTFOLIO = {

  /* ── About ──────────────────────────────────── */
  name:       'Gayathri Harshila',
  email:      'gayathriharshila@gmail.com',
  role:       'CS and Engineering Student',
  university: 'University of Moratuwa',
  bio: [
    'A passionate CS student who',
    'builds things, breaks things,',
    'then builds them better.',
    'Loves software engineering',
    '& system design.',
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

  /* ── Projects ────────────────────────────────────
     `status`   : 'completed' | 'in-progress' | 'planned'
     `category` : must match an id in `projectCategories`
     `featured` : optional — shows a ★ badge + counts in
                  the sidebar's FEATURED stat.
     `year`     : optional — shown in the card footer.
     `image`    : optional — defaults to category art at
                  images/project-art/<category>.svg.
  ─────────────────────────────────────────────── */
  projects: [
    {
      title:       'Smart Inventory and Resource Management System',
      description: 'A full-stack, microservices-based Inventory Management System.',
      tech:        ['Next.js', 'TypeScript', 'React', 'Spring Boot', 'Java', 'MySQL', 'Docker', 'JWT', 'REST APIs', 'Microservices'],
      github:      'https://github.com/hasithasandunlakshan/Inventory-Management-System_Grp_16',
      demo:        null,
      status:      'completed',
      category:    'web',
      featured:    true,
      year:        '2025',
      image:       'images/project-art/smart_inventory_resource_management.svg',
    },
    {
      title:       'RPAL Interpreter',
      description: 'A Python-based interpreter for the RPAL programming language.',
      tech:        ['Python'],
      github:      'https://github.com/lihini-2002/rpal-interpreter.git',
      demo:        null,
      status:      'completed',
      category:    'low-level',
      featured:    true,
      year:        '2025',
      image:       'images/project-art/rpal_interpreter.svg',
    },
    {
      title:       'ML-Based Phishing Detection',
      description: 'A full-stack NLP-based phishing detection system.',
      tech:        ['PyTorch', 'Transformers', 'FastAPI', 'Docker', 'GCP'],
      github:      'https://github.com/lihini-2002/intelligent-cybersecurity-system.git',
      demo:        null,
      status:      'completed',
      category:    'ai-ml',
      featured:    true,
      year:        '2025',
      image:       'images/project-art/ml_phishing_detection.svg',
    },
    {
      title:       'Nanoprocessor',
      description: 'A 4-bit VHDL-based nanoprocessor implemented on a BASYS 3 FPGA.',
      tech:        ['VHDL', 'ModelSim', 'BASYS 3 FPGA'],
      github:      'https://github.com/ashiduDissanayake/Nano-Processor-',
      demo:        null,
      status:      'completed',
      category:    'low-level',
      featured:    true,
      year:        '2024',
      image:       'images/project-art/nano_processor.svg',
    },
  ],

  /* Filter categories shown in the Projects sidebar.
     Add an entry here (and use its `id` on a project's
     `category`) to add a new filter chip. */
  projectCategories: [
    { id: 'web',      label: 'WEB' },
    { id: 'ai-ml',    label: 'AI / ML' },
    { id: 'low-level', label: 'LOW-LEVEL' },
  ],

  /* ── Awards ──────────────────────────────────── */
  awards: [
    {
      title: 'FINALIST — SLIoT CHALLENGE 2025',
      org: 'National-level · Apr 2025',
      desc: 'For SypherLink — an AI-driven smart railway ticketing system integrating RFID, GPS, a mobile app and IoT to automate fare computation, journey tracking and real-time notifications for Sri Lanka\'s railways. One of the top teams out of 200+.',
      icon: '🏆',
    },
    {
      title: '1ST RUNNER-UP — DEVTHON 2.0',
      org: 'Rotaract Club UoM & SLTC · Mar 2025',
      desc: 'For Influenz — an AI-powered influencer marketing platform: a smart SaaS product for campaign management and fraud prevention.',
      icon: '🥈',
    },
    {
      title: 'TOP 10 — SLIIT CODEFEST 2024',
      org: 'DevQuest, SLIIT · Jan 2025',
      desc: 'Team Scope b reached the Top 10 in DevQuest, a national hackathon solving real-world development challenges.',
      icon: '🏅',
    },
    {
      title: '1ST RUNNER-UP — MORA XTREME 9.0',
      org: 'IEEE UoM · Dec 2024',
      desc: 'Achieved 1st Runner-Up with Team Code01, competing in advanced problem-solving.',
      icon: '🥈',
    },
    {
      title: '1ST RUNNER-UP — CODERALLY 5.0',
      org: 'IEEE IIT · Sep 2024',
      desc: 'Secured 1st Runner-Up at a 24-hour hackathon for university students in Sri Lanka.',
      icon: '🥈',
    },
    {
      title: '1ST RUNNER-UP — J\'PURA XTREME 1.0',
      org: 'IEEE UoSJP · Sep 2024',
      desc: 'Earned 1st Runner-Up, working collaboratively in a high-pressure team coding event.',
      icon: '🥈',
    },
    {
      title: '6TH PLACE — MINIXTREME 2024',
      org: 'UoM · Apr 2024',
      desc: 'Secured 6th place out of 200+ participants in a 9-hour intensive hackathon.',
      icon: '🎖️',
    },
  ],

  /* ── Skills ──────────────────────────────────── */
  skills: [
    {
      category: 'Programming Languages',
      techs: [
        { name: 'Python',     icon: 'devicon-python-plain colored' },
        { name: 'C++',        icon: 'devicon-cplusplus-plain colored' },
        { name: 'Java',       icon: 'devicon-java-plain colored' },
        { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
        { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
        { name: 'Rust',       icon: 'devicon-rust-original colored' },
      ],
    },
    {
      category: 'Web & Frontend Development',
      techs: [
        { name: 'HTML',     icon: 'devicon-html5-plain colored' },
        { name: 'CSS',      icon: 'devicon-css3-plain colored' },
        { name: 'React',    icon: 'devicon-react-original colored' },
        { name: 'Next.js',  icon: 'devicon-nextjs-plain' },
        { name: 'Flutter',  icon: 'devicon-flutter-plain colored' },
      ],
    },
    {
      category: 'Backend Development',
      techs: [
        { name: 'Node.js',     icon: 'devicon-nodejs-plain colored' },
        { name: 'Express.js',  icon: 'devicon-express-original' },
        { name: 'Spring Boot', icon: 'devicon-spring-plain colored' },
        { name: 'FastAPI',     icon: 'devicon-fastapi-plain colored' },
      ],
    },
    {
      category: 'Databases & Data Stores',
      techs: [
        { name: 'MySQL',      icon: 'devicon-mysql-plain colored' },
        { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
        { name: 'Redis',      icon: 'devicon-redis-plain colored' },
      ],
    },
    {
      category: 'Cloud & DevOps',
      techs: [
        { name: 'Docker',                icon: 'devicon-docker-plain colored' },
        { name: 'Kubernetes',            icon: 'devicon-kubernetes-plain colored' },
        { name: 'Google Cloud Platform', icon: 'devicon-googlecloud-plain colored' },
        { name: 'AWS',                   icon: 'devicon-amazonwebservices-plain-wordmark colored' },
        { name: 'GitHub',                icon: 'devicon-github-original' },
      ],
    },
    {
      category: 'Testing & QA',
      techs: [
        { name: 'JUnit',    icon: 'devicon-junit-plain colored' },
        { name: 'Postman',  icon: 'devicon-postman-plain colored' },
        { name: 'Selenium', icon: 'devicon-selenium-original colored' },
        { name: 'Cypress',  icon: 'devicon-cypressio-plain' },
        { name: 'JMeter',   icon: 'devicon-jmeter-plain colored' },
      ],
    },
    {
      category: 'Development Tools & Platforms',
      techs: [
        { name: 'Visual Studio Code', icon: 'devicon-vscode-plain colored' },
        { name: 'Google Colab',       emoji: '📓' },
        { name: 'GitHub',             icon: 'devicon-github-original' },
        { name: 'Swagger',            icon: 'devicon-swagger-plain colored' },
      ],
    },
  ],

  /* ── Contact ─────────────────────────────────── */
  resumeUrl: 'https://drive.google.com/uc?export=download&id=1LNqUz-ViREkskQOykuq4dk_Cj-OUEuRG',
  contact: [
    { label: 'EMAIL',    sub: 'Drop me a mail', badge: 'FAST REPLY',
      icon: 'images/contact/mail_envelope.svg',  href: 'mailto:gayathriharshila@gmail.com' },
    { label: 'LINKEDIN', sub: "Let's connect?",  badge: 'PROFESSIONAL',
      icon: 'images/contact/linkedin_badge.svg', href: 'https://www.linkedin.com/in/gayathri-lihinikaduarachchi/' },
    { label: 'GITHUB',   sub: 'Check my code',   badge: 'OPEN SOURCE',
      icon: 'images/contact/github_logo.gif',    href: 'https://github.com/lihini-2002' },
  ],
};
