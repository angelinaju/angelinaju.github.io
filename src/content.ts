// ─────────────────────────────────────────────────────────────────────────────
// All of the site's words live in this file. Edit freely; layout code is elsewhere.
//
// `summary` fields are for YOUR short description, in your own voice (1–3 sentences:
// what the job was really about, and what you're proudest of). While a summary is
// empty, a dashed reminder box shows in local preview only, never on the live site.
// ─────────────────────────────────────────────────────────────────────────────

// ── Shapes of the content below. TypeScript checks every entry against these, so a missing
//    field or a typo in a key shows up as an error before the site builds.
export interface Role {
  id: string
  org: string
  role: string
  team?: string
  location: string
  date: string
  summary: string
  points: string[]
  tags?: string[]
  links?: { label: string; href: string }[]
}

export interface SelectedItem {
  title: string
  context: string
  kind: 'Product' | 'Research'
  year: string
  href: string
}

export interface Poster {
  title: string
  venue: string
  date: string
  note?: string
}

export interface Project {
  name: string
  date: string
  stack: string
  metric: string
  metricLabel: string
  blurb: string
  github: string | null
}

export interface Leadership {
  role: string
  org: string
  date: string
  // Shown after the dates, e.g. how long you've been a member.
  note?: string
  // Leave empty while you're still writing it; a reminder shows in local preview only.
  points: string[]
  links?: { label: string; href: string }[]
}


export const links: {
  email: string
  linkedin: string
  github: string
  cv: string | null
  resume: string | null
} = {
  email: 'aju@vols.utk.edu',
  linkedin: 'https://www.linkedin.com/in/angelinaju',
  github: 'https://github.com/angelinaju',
  // Downloadable PDFs in /public. Phone number and location are removed from these copies.
  // Set either one to null to hide its download link.
  cv: '/AngelinaJu_CV.pdf',
  resume: '/AngelinaJu_Resume.pdf',
}

// Your photo on the About page: an image in /public. Set to null to hide it.
export const photo: string | null = '/headshot.jpg'

// Groups you're part of. Wherever one of these names appears in an org, team, or "Where" line, or in
// your bio, it becomes a link to the group's site. Longer names are matched first.
export const groupLinks: Record<string, string> = {
  'Global Computing Lab': 'https://globalcomputing.group/',
  'EPIC Lab': 'https://epic.eecs.utk.edu/',
  PegasusAI: 'https://pegasus-ai.org/',
  'Systers: Women in EECS': 'https://www.systers.eecs.utk.edu/',
  Systers: 'https://www.systers.eecs.utk.edu/',
  'Society of Asian Scientists and Engineers (SASE)': 'https://saseutk.weebly.com/',
  SASE: 'https://saseutk.weebly.com/',
  'Korean Pop Dance Association (KPDA)': 'https://www.youtube.com/@utkpda',
}

export const status = 'Looking for full-time PM roles and HCI master’s programs (2027)'

export const home: { statement: string; sub: string; selected: SelectedItem[] } = {
  // The big headline. Change it to whatever sounds most like you.
  // \u00a0 is a space that never breaks, so phrases like "AI products" stay on one line.
  statement: 'I’m working toward AI\u00a0products that help\u00a0people do\u00a0more on their\u00a0own.',
  sub: 'Hi, I’m Angelina, a computer science senior at the University of Tennessee, graduating in May 2027. In my lab, I built the help button for PegasusAI, an assistant that helps students work toward an answer without leaving their notebook. Before that, I studied whether robot dogs could help older adults with dementia stay active. This summer, as a product management intern at St. Jude, I coordinated the user guide for ARIA Guide, a pediatric cancer care platform used by 1,750+ people in 116 countries.',
  // Rows in the "Selected work" list on the homepage.
  selected: [
    { title: 'Product intern at St. Jude', context: 'St. Jude Children’s Research Hospital', kind: 'Product', year: '2026', href: '/work/#st-jude' },
    { title: 'PegasusAI, an AI helper in JupyterLab', context: 'Global Computing Lab, UTK', kind: 'Research', year: '2025–', href: '/research/#pegasus' },
    { title: 'Robot dogs for people with dementia', context: 'Zhao Robotics Lab, UTK', kind: 'Research', year: '2024–25', href: '/research/#robots' },
    { title: 'A nonprofit client project', context: 'Hack4Impact UTK', kind: 'Product', year: '2026–', href: '/work/#hack4impact' },
    { title: 'A chatbot for kids', context: 'Wiillow', kind: 'Product', year: '2025', href: '/work/#wiillow' },
  ],
}

export const work: { lead: string; roles: Role[] } = {
  lead: 'Two internships and a student org. Most of it has been product work on software for people who aren’t engineers.',
  roles: [
    {
      id: 'st-jude',
      org: 'St. Jude Children’s Research Hospital',
      role: 'Product Management Intern',
      team: 'Research Support Services',
      location: 'Memphis, TN',
      date: 'Jun – Aug 2026',
      summary: '',
      points: [
        'Evaluated AI tools that work with Azure DevOps to make scrum ceremonies take less time.',
        'Coordinated the UI/UX, RAG, and Microsoft Teams integration workstreams for an internal assistant, so staff could use it inside Teams.',
        'Coordinated the user guide for ARIA Guide, a pediatric oncology platform built for hospitals in low- and middle-income countries and used by 1,750+ people in 116 countries.',
        'Was the go-between for developers and stakeholders, turning requests into clear technical direction.',
        'Ran daily standups, sprint planning, backlog refinement, and retros for several projects.',
      ],
      tags: ['Agile / Scrum', 'Azure DevOps', 'RAG', 'Stakeholders'],
      // Public work you can link to. Shown under the bullet points.
      links: [
        { label: 'ARIA Guide user guides', href: 'https://aria.stjude.org/user-guides' },
        { label: 'Case study', href: '/case-studies/#aria-guide' },
      ],
    },
    {
      id: 'hack4impact',
      org: 'Hack4Impact UTK',
      role: 'Product Manager',
      team: 'Student org that builds software for nonprofits',
      location: 'Knoxville, TN',
      date: 'Jul 2026 – now',
      summary: '',
      points: [
        'Leading the product side of a project for a nonprofit client: figuring out what they need and writing it up as requirements.',
        'Managing the client relationship and coordinating a team of 9 student developers.',
      ],
      tags: ['Requirements', 'Client work', 'Team of 9'],
    },
    {
      id: 'wiillow',
      org: 'Wiillow',
      role: 'Product Engineering Intern',
      location: 'Remote',
      date: 'Jun – Jul 2025',
      summary: '',
      points: [
        'Worked with the product and UX teams on an AI social-emotional learning chatbot for kids, used by 80+ children.',
        'Gathered requirements and planned features around what kids needed, weighed against what was technically doable in our timeline.',
        'Built kid-friendly chat screens in React, TypeScript, and TailwindCSS, and helped with backend features for emotional tone analysis and tracking language development.',
      ],
      tags: ['React', 'TypeScript', 'Feature planning'],
    },
  ],
}

export const research: { lead: string; roles: Role[]; posters: Poster[] } = {
  lead: 'I’ve worked in two labs at UTK. One runs an AI assistant in a data engineering class. The other looked at whether robot dogs could help older adults with dementia.',
  roles: [
    {
      id: 'pegasus',
      org: 'Global Computing Lab & EPIC Lab, UTK',
      role: 'Undergraduate Research Assistant',
      team: 'PegasusAI',
      location: 'Knoxville, TN',
      date: 'Aug 2025 – now',
      summary: '',
      points: [
        'Built the JupyterLab interface for PegasusAI, an AI assistant used in a data engineering course, so students can get help without leaving their notebook.',
        'Documented the system’s architecture, data flow, and the data it logs, so the team can study students’ interactions with the AI.',
        'Load-tested the model serving with different numbers of users at once to make sure it could handle a whole class.',
        'Helping with research on how students ask for help, how much they trust the AI, and whether they find it useful.',
      ],
      tags: ['JupyterLab', 'Human–AI interaction', 'Load testing'],
    },
    {
      id: 'robots',
      org: 'EPIC Lab & Zhao Robotics Lab, UTK',
      role: 'Undergraduate Research Assistant',
      team: 'Assistive quadruped robots',
      location: 'Knoxville, TN',
      date: 'Mar 2024 – Apr 2025',
      summary: '',
      points: [
        'Asked how open older adults with dementia would be to exercising with a robot dog (a Unitree Go2), like taking it for a walk. Used ROS and Python to simulate and control the robot.',
        'Worked with three other teams on interaction, mobility, and safety, and helped plan a design session with older adults from local senior centers (surveys, a robot demo, group discussion, and a collage activity).',
        'Presented the study as first author on a poster at EUReCA 2025.',
        'Rewrote the robot’s conversational AI prompts so its responses were clearer and sounded more natural.',
      ],
      tags: ['ROS', 'Participatory design', 'HRI'],
    },
  ],
  posters: [
    {
      title: 'Walking the Dog: Promoting Mobility and Emotional Support through Assistive Quadrupedal Robots for Dementia Care',
      venue: 'EUReCA, UTK',
      date: 'Apr 2025',
      note: 'First author',
    },
    {
      title: 'Evolutionary Optimization of Bridge Design Using Genetic Algorithms',
      venue: 'COSC 420 poster session, UTK',
      date: 'Spring 2026',
    },
  ],
}

export const projects: { lead: string; list: Project[] } = {
  lead: 'Some projects from classes and teams I’ve been on.',
  list: [
    {
      name: 'Evolving bridge designs',
      date: '2026',
      stack: 'Python · physics simulation',
      metric: '$91k → $28k',
      metricLabel: 'cost on the hardest level',
      blurb:
        'A class project with two teammates. We used a genetic algorithm to evolve bridges in a physics simulator. Evolving from scratch was unstable, but starting from bridges people had already designed worked much better.',
      github: null, // e.g. 'https://github.com/angelinaju/repo-name'
    },
    {
      name: 'Teaching a robot dog to follow someone',
      date: '2025',
      stack: 'PyTorch · PyBullet · Gym',
      metric: '+164%',
      metricLabel: 'reward performance',
      blurb:
        'We trained a robot dog in simulation (with PPO) to turn toward a person and follow them. I set up how we measured success and led our team of three. Training time also dropped by up to 40%.',
      github: null,
    },
    {
      name: 'Fitness tracker',
      date: '2025',
      stack: 'React · FastAPI · PostgreSQL',
      metric: '5 devs, 3 mo',
      metricLabel: 'team and timeline',
      blurb:
        'A team project with a dashboard plus nutrition, exercise, and goal tracking. I planned the features and split the work across five developers so we finished on time.',
      github: null,
    },
  ],
}

export const about: {
  bio: string[]
  education: { school: string; degree: string; date: string; gpa: string; coursework: string[] }
  honors: [name: string, years: string][]
  leadership: Leadership[]
  skills: [group: string, items: string][]
} = {
  // Replace with your own words whenever you're ready.
  bio: [
    'I’m a senior studying computer science at the University of Tennessee, and I graduate in May 2027.',
    'I’m looking for a full-time product management job. I’m also looking at HCI master’s programs, mainly ones doing research on how people interact with AI.',
    'Outside of class, I’m vice president of Systers and of the Korean Pop Dance Association (KPDA), and I plan SASE’s trip to its national convention each year.',
  ],
  education: {
    school: 'University of Tennessee, Knoxville',
    degree: 'B.S. Computer Science',
    date: 'Expected May 2027',
    gpa: '3.79 / 4.00 · Dean’s List',
    coursework: [
      'Human-Computer Interaction',
      'Introduction to Machine Learning',
      'Introduction to Artificial Intelligence',
      'Software Engineering',
      'Biologically-Inspired Computation',
      'Data Structures & Algorithms',
      'Operating Systems',
      'Probability & Random Variables',
      'Linear Algebra',
    ],
  },
  honors: [
    ['SWE Deloitte Scholarship', '2025, 2026'],
    ['Tau Beta Pi Engineering Honor Society', '2026'],
    ['Faculty Research Assistants Funding (FRAF)', '2024'],
  ],
  leadership: [
    {
      role: 'Vice President',
      org: 'Systers: Women in EECS',
      date: 'Aug 2025 – now',
      points: [
        'Plan events for women in computing in the EECS department.',
        'Manage $10,000+ a year in funding to send students to the Grace Hopper Celebration.',
      ],
    },
    {
      role: 'Conferences Director',
      org: 'Society of Asian Scientists and Engineers (SASE)',
      date: 'May 2024 – now',
      points: [
        'Plan the chapter’s trip to the SASE National Convention for 30+ students, including the timeline and budget.',
        'Raised $35,000+ by working with students, faculty, department heads, and sponsors.',
      ],
    },
    {
      role: 'Vice President',
      org: 'Korean Pop Dance Association (KPDA)',
      date: 'Aug 2025 – now',
      note: 'Member since Nov 2023',
      points: [],
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/kpda.utk/' },
        { label: 'YouTube', href: 'https://www.youtube.com/@utkpda' },
      ],
    },
  ],
  skills: [
    ['Product', 'Agile/Scrum, sprint facilitation, roadmapping, user research, MVP scoping, requirements documentation, feature prioritization, stakeholder management, A/B testing'],
    ['Tools', 'Azure DevOps, Jira, Trello, Git, Docker, VS Code, JupyterLab, Microsoft 365'],
    ['Code', 'Python, TypeScript, C/C++, SQL (PostgreSQL), HTML/CSS, TailwindCSS, React, FastAPI, Linux, ROS'],
    ['Libraries', 'Pandas, NumPy, PyTorch, PyBullet, Gym'],
    ['Languages', 'English (native), Mandarin (conversational)'],
  ],
}
