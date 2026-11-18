import { Sparkles } from 'lucide-react';

interface SkillIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, string> = {
  // Programming Languages
  'java': '/skills/java.svg',
  'python': '/skills/python.svg',
  'javascript': '/skills/javascript.svg',

  // Frontend
  'react.js': '/skills/react_js.svg',
  'react': '/skills/react_js.svg',
  'html5': '/skills/html5.svg',
  'css3': '/skills/css3.svg',

  // Backend
  'node.js': '/skills/node_js.svg',
  'express.js': '/skills/express_js.svg',
  'spring boot': '/skills/spring_boot.svg',
  'fastapi': '/skills/fastapi.svg',
  'rest apis': '/skills/rest_apis.svg',

  // Database
  'mongodb': '/skills/mongodb.svg',
  'postgresql': '/skills/postgresql.svg',

  // Cybersecurity
  'burp suite': '/skills/burp_suite.svg',
  'nmap': '/skills/nmap.svg',
  'wireshark': '/skills/wireshark.svg',
  'metasploit': '/skills/metasploit.svg',
  'nessus': '/skills/nessus.svg',
  'openvas': '/skills/openvas.svg',
  'splunk': '/skills/splunk.svg',
  'siem': '/skills/siem.svg',
  'owasp top 10': '/skills/owasp_top_10.svg',
  'web app penetration testing': '/skills/web_app_penetration_testing.svg',
  'vulnerability assessment': '/skills/vulnerability_assessment.svg',

  // AI / ML
  'machine learning': '/skills/machine_learning.svg',
  'rag': '/skills/rag.svg',
  'agentic ai': '/skills/agentic_ai.svg',
  'mcp': '/skills/mcp.svg',
  'llm fine-tuning': '/skills/llm_fine_tuning.svg',
  'llm fine tuining': '/skills/llm_fine_tuning.svg',
  'prompt engineering': '/skills/prompt_engineering.svg',
  'random forest': '/skills/random_forest.svg',
  'xgboost': '/skills/xgboost.svg',
  'bilstm': '/skills/bilstm.svg',
  'deep q-network (dqn)': '/skills/deep_q_network_dqn.svg',
  'ai-powered automation': '/skills/ai_powered_automation.svg',

  // Tools & Platforms
  'git': '/skills/git.svg',
  'github': '/skills/github.svg',
  'docker': '/skills/docker.svg',
  'vs code': '/skills/vs_code.svg',
  'claude code': '/skills/claude_code.svg',
  'codex': '/skills/codex.svg',
  'github copilot': '/skills/github_copilot.svg',
  'postman': '/skills/postman.svg',
  'linux': '/skills/linux.svg',
};

export default function SkillIcon({ name, className = 'w-4 h-4 shrink-0' }: SkillIconProps) {
  const key = name.toLowerCase().trim();
  const iconSrc = iconMap[key];

  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt={name}
        className={`${className} object-contain`}
        loading="lazy"
        onError={(e) => {
          // If image fails to load, gracefully hide it
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }

  return <Sparkles className={`${className} text-white/50`} />;
}
