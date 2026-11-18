export interface ResearchItem {
  title: string;
  venue: string;
  year: string;
  abstract: string;
  link: string;
}

export const researchData: ResearchItem[] = [
  {
    title: 'Intelligent Multi-Layer Penetration Testing System Using Hybrid AI Models',
    venue: 'ICSEDIS 2026 — IEEE Xplore',
    year: '2026',
    abstract:
      'An intelligent multi-layer penetration testing framework that integrates traditional security testing methodologies with hybrid AI models — including Random Forest, XGBoost, BiLSTM, and Deep Q-Network — to improve vulnerability detection, prioritization, and attack-path planning across network reconnaissance, application vulnerability scanning, authentication testing, API logic analysis, and post-exploitation risk scoring.',
    link: 'https://ieeexplore.ieee.org/document/11518386',
  },
];
