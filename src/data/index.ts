import { personalData } from './personal';
import { skillsData } from './skills';
import { projectsData } from './projects';
import { experienceData } from './experience';
import { educationData } from './education';
import { certificationsData } from './certifications';
import { achievementsData } from './achievements';
import { researchData } from './research';
import { socialLinksData } from './social';
import type { PortfolioData } from '@/lib/types';

export const portfolioConfig: PortfolioData = {
  ...personalData,
  experience: experienceData,
  education: educationData,
  skills: skillsData,
  projects: projectsData,
  research: researchData,
  certifications: certificationsData,
  achievements: achievementsData,
  social: socialLinksData,
  theme: {
    accentColor: '#22b8ff',
    accentColor2: '#ff4d6d',
    blobSpeed: 1.0,
  },
};

export * from './personal';
export * from './skills';
export * from './projects';
export * from './experience';
export * from './education';
export * from './certifications';
export * from './achievements';
export * from './research';
export * from './social';
