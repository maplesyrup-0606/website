export const GROUND_Y = 88; // percent of viewport height

// x and widthPct are percentages of viewport width (0–100)
// y is percentage of viewport height (0–100)
export const PLATFORMS = [
  { id: 'about',    label: 'ABOUT',    color: '#39ff14', xPct: 6,  y: 66, widthPct: 13 },
  { id: 'projects', label: 'PROJECTS', color: '#00ffff', xPct: 24, y: 50, widthPct: 16 },
  { id: 'mycats',   label: 'MY CATS',  color: '#ffaaff', xPct: 44, y: 30, widthPct: 13 },
  { id: 'contact',  label: 'CONTACT',  color: '#b400ff', xPct: 47, y: 62, widthPct: 14 },
  { id: 'resume',   label: 'RESUME',   color: '#ff4488', xPct: 69, y: 46, widthPct: 12 },
  { id: 'skills',   label: 'SKILLS',   color: '#ff6600', xPct: 86, y: 57, widthPct: 12 },
];

export const CONTENT = {
  about: {
    title: 'ABOUT ME',
    color: '#39ff14',
    body: `Mercury Mcindoe.

Computer Engineering @ UBC

SWE Intern @ Amazon — building
AI-powered call-resolution systems.

Previously: Vision-Language Model
research @ UBC Vision Group.

Software Team Lead @ UBC UAS —
2nd place, AEAC 2025 Nationals.`,
  },

  projects: {
    title: 'PROJECTS',
    color: '#00ffff',
    items: [
      {
        name: 'Human-Like-Attention',
        desc: 'Research @ UBC Vision Group with Prof. Leonid Sigal. VLM gaze + attention.',
        link: 'https://github.com/maplesyrup-0606/Human-Like-Attention-in-Vision-Language-Models',
      },
      {
        name: 'Hawkeye-OS',
        desc: 'ROS ecosystem designed for UBC Uncrewed Aircraft Systems.',
        link: 'https://github.com/ubcuas/Hawkeye-OS',
      },
      {
        name: 'LectureLink',
        desc: 'NwHacks 2024 — linking students in similar courses. Node.js, Firebase, MongoDB.',
        link: 'https://github.com/maplesyrup-0606/LectureLink',
      },
      {
        name: 'My Game Manager',
        desc: 'DataGrip-like frontend with no-code SQL platform. React, TypeScript, PHP, Oracle.',
        link: 'https://github.com/maplesyrup-0606/MyGameManager',
      },
    ],
  },

  contact: {
    title: 'CONTACT',
    color: '#b400ff',
    items: [
      { name: 'Email',    url: 'mailto:mercurymcindoe@gmail.com',        label: 'mercurymcindoe@gmail.com' },
      { name: 'GitHub',   url: 'https://github.com/maplesyrup-0606',     label: 'github.com/maplesyrup-0606' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/maplesyruphg06/', label: 'linkedin.com/in/mercurymcindoe' },
      { name: 'Notion',   url: 'https://mercurymcindoe.notion.site',     label: 'mercurymcindoe.notion.site' },
    ],
  },

  mycats: {
    title: 'MY CATS',
    color: '#ffaaff',
    cats: [
      { name: 'Rocket', img: '/rocket.png' },
      { name: 'Bullet', img: '/bullet.png' },
    ],
  },

  resume: {
    title: 'RESUME',
    color: '#ff4488',
  },

  skills: {
    title: 'SKILLS',
    color: '#ff6600',
    groups: [
      { label: 'Languages',  items: 'Python  C/C++  Java  SQL  Julia' },
      { label: 'Frameworks', items: 'React  Node.js  PyTorch  Flask  Express' },
      { label: 'Tools',      items: 'AWS  Docker  Git  MongoDB  Unix/Linux' },
    ],
  },
};
