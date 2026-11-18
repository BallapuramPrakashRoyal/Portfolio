export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  link: string;
  linkLabel?: string;
  liveUrl?: string;
  repoUrl?: string;
  image: string;
  featured: boolean;
  status?: string;
  role?: string;
}

export const projectsData: ProjectItem[] = [
  {
    title: 'Intelligent Multi-Layer Penetration Testing System (IMLPTS)',
    description:
      'An intelligent multi-layer penetration testing framework that integrates traditional security testing methodologies with hybrid AI models to improve vulnerability detection, prioritization, and attack-path planning. Encompasses Network Reconnaissance, Application Vulnerability Scanning, Authentication & Access Control Testing, API & Business Logic Analysis, Post-Exploitation & Risk Scoring, and a Hybrid AI Decision Engine.',
    tags: ['Python', 'Machine Learning', 'Random Forest', 'XGBoost', 'BiLSTM', 'DQN', 'Cybersecurity'],
    link: 'https://ieeexplore.ieee.org/document/11518386',
    linkLabel: 'View Research Work',
    image: '/projects/imlpts.png',
    featured: true,
    status: 'Presented at ICSEDIS 2026 & IEEE Xplore',
  },
  {
    title: 'FlowPilot AI',
    description:
      'An AI-powered business workflow automation platform designed to automate repetitive business operations through intelligent workflow orchestration and integrations. Focuses on task orchestration, integration architecture, and modern full-stack development.',
    tags: ['AI', 'Workflow Automation', 'Task Orchestration', 'FastAPI', 'Next.js'],
    link: 'https://github.com/BallapuramPrakashRoyal/FlowPilotAI',
    linkLabel: 'View Project',
    repoUrl: 'https://github.com/BallapuramPrakashRoyal/FlowPilotAI',
    image: '/projects/flowpilot_ai.png',
    featured: true,
    status: 'In Active Development',
  },
  {
    title: 'PhraseFusion',
    description:
      'A creative language and text fusion tool that intelligently synthesizes and merges phrasing patterns to generate unique linguistic compositions with an intuitive web interface.',
    tags: ['React', 'Vite', 'Spring Boot', 'NLP', 'Frontend'],
    link: 'https://phrase-fusion.vercel.app/',
    liveUrl: 'https://phrase-fusion.vercel.app/',
    repoUrl: 'https://github.com/BallapuramPrakashRoyal/PhraseFusion',
    image: '/projects/phrase_fusion.png',
    featured: false,
  },
  {
    title: 'BizFlow',
    description:
      'A full-stack business process management and workflow tracking platform built to streamline operational tasks, monitor process lifecycles, and enhance enterprise efficiency.',
    tags: ['Spring Boot', 'React', 'PostgreSQL', 'Full-Stack'],
    link: 'https://github.com/BallapuramPrakashRoyal/bizflow',
    linkLabel: 'View Project',
    repoUrl: 'https://github.com/BallapuramPrakashRoyal/bizflow',
    image: '/projects/bizflow.png',
    featured: false,
  },
];
