import type { SkillCategory } from '@/data/skills';
import type { ProjectItem } from '@/data/projects';
import type { ExperienceItem } from '@/data/experience';
import type { EducationItem } from '@/data/education';
import type { CertificationItem } from '@/data/certifications';
import type { ResearchItem } from '@/data/research';
import type { SocialLinks } from '@/data/social';
import { portfolioConfig } from '@/data';

export interface PortfolioData {
  profile: {
    name: string;
    title: string;
    tagline: string;
    avatarUrl: string;
    location: string;
  };
  hero: {
    greeting: string;
    rotatingWords: string[];
  };
  about: {
    heading: string;
    paragraphs: string[];
    stats: { label: string; value: string }[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  research: ResearchItem[];
  certifications: CertificationItem[];
  achievements: string[];
  social: SocialLinks;
  theme: {
    accentColor: string;
    accentColor2: string;
    blobSpeed: number;
  };
}

export const defaultPortfolioData: PortfolioData = portfolioConfig;

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
}
