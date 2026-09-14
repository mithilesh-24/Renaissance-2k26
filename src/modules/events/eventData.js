/**
 * eventData.js — Centralized event data extracted from real symposium posters.
 * Ground truth: every field comes directly from poster inspection.
 */

export const eventsData = [
  // ═══════════ TECHNICAL EVENTS (8) ═══════════
  {
    id: 'paper-presentation',
    title: 'Paper Presentation',
    category: 'technical',
    icon: '📄',
    poster: '/posters/technical/paper-presentation.jpg',
    time: '08:45 AM – 10:45 AM',
    date: '21st September 2026',
    teamSize: '2 Members per team',
    eligibility: 'All Years',
    registerUrl: 'https://docs.google.com/forms/u/4/d/e/1FAIpQLSdt_PYI-YJmLqtHwYNFyNdeUbfVRItFDe3Q4jdRb93xPyrK1Q/viewform?usp=publish-editor',
    description: 'Present your cutting-edge research on SIH / SDG problem statements or innovative engineering & tech topics. Standard PPT presentation with Q&A session evaluated by expert judges.',
    rounds: ['PPT Presentation', 'Q&A Session'],
    rules: [
      'Topic must relate to SIH / SDG goals or innovative technology',
      'Maximum 2 members per team',
      'Presentation time: as allocated by organizers'
    ],
    contacts: [
      { name: 'Uma Maheswari', phone: '6385674622' },
      { name: 'Subashini', phone: '9363916577' }
    ]
  },
  {
    id: 'project-presentation',
    title: 'Project Presentation',
    category: 'technical',
    icon: '🔧',
    poster: '/posters/technical/project-presentation.jpg',
    time: '08:45 AM – 10:25 AM',
    date: '21st September 2026',
    teamSize: '3 Members per team',
    eligibility: 'All Years',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdAV7I26HVlf0pAL5dvF6SAO5hIN1MaRtSmyx-UNn0LpEj-Gw/viewform',
    description: 'Showcase a working hardware/software model or prototype addressing SIH / SDG goals or novel tech solutions. Live demo and judges evaluation.',
    rounds: ['Live Demo', 'Judges Evaluation'],
    rules: [
      'Working prototype or model required',
      'Must address SIH / SDG goals or novel tech solutions',
      'Maximum 3 members per team'
    ],
    contacts: [
      { name: 'Thirichand K', phone: '9342143166' },
      { name: 'Shreenidhi U', phone: '8072078201' }
    ]
  },
  {
    id: 'code-relay',
    title: 'Code Relay',
    category: 'technical',
    icon: '⚡',
    poster: '/posters/technical/code-relay.jpg',
    time: '10:45 AM – 12:25 PM',
    date: '21st September 2026',
    teamSize: '4 Members per team',
    eligibility: 'Open to CSE',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdOPYXvAmxeiNqvnSJnx_QOKysLkROwpUq_vNjbQXJBGs8I5A/viewform',
    description: 'Team UI development challenge. Replicate a designated dashboard UI in relay format — teammates switch coding seats at timed intervals.',
    rounds: ['UI Replication Relay'],
    rules: [
      '4 members per team required',
      'Relay format: switch seats at timed intervals',
      'Replicate the designated UI dashboard',
      'Open to CSE students only'
    ],
    contacts: [
      { name: 'Sandhiya', phone: '9384979612' },
      { name: 'Hariesh', phone: '7358956474' }
    ]
  },
  {
    id: 'bid-2-code',
    title: 'Bid2Code',
    category: 'technical',
    icon: '🎯',
    poster: '/posters/technical/bid-2-code.jpg',
    time: '10:45 AM – 12:25 PM',
    date: '21st September 2026',
    teamSize: '2 Members per team',
    eligibility: '3rd Year Students',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe2PSwrmAW_fWaqipv9F0Bc8fTrpkKYDBmY2SNGWSxlFu9GmQ/viewform',
    description: 'Tech puzzles to earn auction wallet points, then bid on coding problem statements and race to solve them. Strategy meets speed.',
    rounds: ['Round 1: Tech Puzzles & Points', 'Round 2: Auction Bidding & Coding'],
    rules: [
      'Maximum 2 members per team',
      'Earn points through tech puzzle challenges',
      'Bid points on coding problem statements',
      '3rd year students only'
    ],
    contacts: [
      { name: 'Inbakumaran', phone: '9447957412' },
      { name: 'Dharani', phone: '7904741642' }
    ]
  },
  {
    id: 'spin-and-sprint',
    title: 'Spin & Sprint',
    category: 'technical',
    icon: '🎡',
    poster: '/posters/technical/spin-and-sprint.jpg',
    time: '10:45 AM – 12:15 PM',
    date: '21st September 2026',
    teamSize: '2 Members per team',
    eligibility: '2nd Year Students',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdOuvfffG2QcTdSO0KJfmvozQ74_9L9Uf2V0DsAUyL7gMTcLg/viewform',
    description: 'Spin the Time Wheel (12/15/18 mins) and the Question Wheel (logic & pattern programming). High-speed coding under tight, randomized time pressure.',
    rounds: ['Spin & Code Sprint'],
    rules: [
      'Spin the time wheel for allocated duration (12, 15, or 18 mins)',
      'Spin the question wheel for problem type',
      'Maximum 2 members per team',
      '2nd year students only'
    ],
    contacts: [
      { name: 'Shahul', phone: '8248266487' },
      { name: 'Santhiya', phone: '9025786205' }
    ]
  },
  {
    id: 'tech-rewind',
    title: 'Tech Rewind',
    category: 'technical',
    icon: '⏪',
    poster: '/posters/technical/tech-rewind.jpg',
    time: '10:45 AM – 12:25 PM',
    date: '21st September 2026',
    teamSize: '2 – 3 Members per team',
    eligibility: 'All Years',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeIRIL78VTH_nHDzaRjvuOxIrhhZ7eRyEtvUmsHTRkPK7WgjA/viewform',
    description: 'Reimagine retro software, vintage UI/UX, and legacy computing systems using modern frontend/backend frameworks. A creative twist on tech history.',
    rounds: ['Retro Tech Reimagination'],
    rules: [
      '2 to 3 members per team',
      'Reimagine a retro tech system with modern tools',
      'Focus on UI/UX, Frontend & Backend'
    ],
    contacts: [
      { name: 'Nethrasri', phone: '9524360377' },
      { name: 'Akshaya', phone: '9487201645' }
    ]
  },
  {
    id: 'prompt-forge',
    title: 'Prompt Forge',
    category: 'technical',
    icon: '🤖',
    poster: '/posters/technical/prompt-forge.jpg',
    time: '10:45 AM – 12:25 PM',
    date: '21st September 2026',
    teamSize: '3 Members per team',
    eligibility: '2nd & 3rd Year Students',
    registerUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeHgBlP2D_4LDxxEKwBeS-ymfGAsKxScm_z8oEf6CrkKzCaeA/viewform',
    description: 'AI prompt engineering sprint — 4 rounds, 60 minutes total. Master generative text, reasoning, image synthesis, and automated task chains. 13 teams max (FCFS).',
    rounds: ['Round 1', 'Round 2', 'Round 3', 'Round 4'],
    rules: [
      '3 members per team',
      '4 rounds, 60 minutes total',
      '13 teams maximum (First-Come, First-Served)',
      '2nd and 3rd year students only'
    ],
    contacts: [
      { name: 'Yogasri', phone: '6374019190' },
      { name: 'Nirmalraj', phone: '6380093704' }
    ]
  },
  {
    id: 'scramble-x',
    title: 'ScrambleX',
    category: 'technical',
    icon: '🧩',
    poster: '/posters/technical/scramble-x.jpg',
    time: '10:45 AM – 12:25 PM',
    date: '21st September 2026',
    teamSize: '2 Members per team',
    eligibility: '2nd, 3rd & 4th Year Students',
    description: 'Scrambled code reconstruction, syntax decoding, and algorithmic pattern solving. 1 round, 45 minutes of intense puzzle-solving.',
    rounds: ['Scrambled Code Challenge (45 mins)'],
    rules: [
      '2 members per team',
      '1 round, 45 minutes',
      'Reconstruct scrambled code and decode patterns',
      '2nd, 3rd, and 4th year students'
    ],
    contacts: [
      { name: 'Dharshini N', phone: '7708752476' },
      { name: 'Uma Maheswari', phone: '6385674622' }
    ]
  },

  // ═══════════ NON-TECHNICAL EVENTS (3) ═══════════
  {
    id: 'vibe-rush',
    title: 'Vibe Rush',
    category: 'non-technical',
    icon: '🎵',
    poster: '/posters/non-technical/vibe-rush.jpg',
    time: '01:25 PM – 03:00 PM',
    date: '21st September 2026',
    teamSize: '2 Members per team',
    eligibility: 'All Years',
    description: 'Music, memory, and fun across 3 exciting rounds — guess songs from imagery, identify tracks from translated lyrics, and test your visual recall.',
    rounds: [
      'Round 1 (Connection): Guess the song from connected imagery cues',
      'Round 2 (Lyrics): Identify songs translated into English lyrics',
      'Round 3 (Remember the Thing): Visual memory & object recall challenge'
    ],
    rules: [
      '2 members per team',
      '3 rounds of increasing challenge',
      'All years welcome'
    ],
    contacts: [
      { name: 'Hariesh', phone: '7358956474' },
      { name: 'Mithilesh', phone: '9487478557' }
    ]
  },
  {
    id: 'doomsday',
    title: 'Doomsday: The Final Battle',
    category: 'non-technical',
    icon: '💀',
    poster: '/posters/non-technical/doomsday.jpg',
    time: '01:25 PM – 03:00 PM',
    date: '21st September 2026',
    teamSize: '4 Members per team',
    eligibility: 'All Years',
    description: 'Mystery vault challenge. Navigate 3 preliminary stages of puzzles, strategy, and teamwork, then compete in the Final Battle round (5 minutes per qualifying team).',
    rounds: [
      'Prelim Stage 1',
      'Prelim Stage 2',
      'Prelim Stage 3',
      'Final Battle (5 mins per team)'
    ],
    rules: [
      '4 members per team',
      '3 preliminary rounds + 1 final round',
      '5 minutes per qualifying team in the final'
    ],
    contacts: [
      { name: 'Thirichand K', phone: '9342143166' },
      { name: 'Bhavana R', phone: '8903055603' }
    ]
  },
  {
    id: 'eye-spy',
    title: 'Eye Spy',
    category: 'non-technical',
    icon: '👁️',
    poster: '/posters/non-technical/eye-spy.jpg',
    time: '01:25 PM – 03:00 PM',
    date: '21st September 2026',
    teamSize: '3 Members per team',
    eligibility: 'All Years',
    description: 'Test your visual acuity, pattern spotting, and observational memory across 2 intensive elimination rounds. Spot the change and outsmart your opponents.',
    rounds: ['Round 1: Observation', 'Round 2: Elimination'],
    rules: [
      '3 members per team',
      '2 elimination rounds',
      'Sharp observation skills required'
    ],
    contacts: [
      { name: 'Durga B', phone: '8825911558' },
      { name: 'Mithra Nila K S', phone: '9342352044' }
    ]
  }
];

export function getEventById(id) {
  return eventsData.find(e => e.id === id) || null;
}

export function getEventsByCategory(category) {
  if (!category || category === 'all') return eventsData;
  return eventsData.filter(e => e.category === category);
}
