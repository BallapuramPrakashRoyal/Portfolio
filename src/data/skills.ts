export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Programming Languages',
    items: ['Java', 'Python', 'JavaScript'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI', 'REST APIs'],
  },
  {
    category: 'Database',
    items: ['MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Cybersecurity',
    items: [
      'Burp Suite',
      'Nmap',
      'Wireshark',
      'Metasploit',
      'Nessus',
      'OpenVAS',
      'Splunk',
      'SIEM',
      'OWASP Top 10',
      'Web App Penetration Testing',
      'Vulnerability Assessment',
    ],
  },
  {
    category: 'AI / ML',
    items: [
      'Machine Learning',
      'RAG',
      'Agentic AI',
      'MCP',
      'LLM Fine-Tuning',
      'Prompt Engineering',
      'Random Forest',
      'XGBoost',
      'BiLSTM',
      'Deep Q-Network (DQN)',
      'AI-Powered Automation',
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'VS Code',
      'Claude Code',
      'Codex',
      'GitHub Copilot',
      'Postman',
      'Linux',
    ],
  },
];
