export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  mobile?: string;
}

/**
 * Configure your personal social links here.
 * Leave empty string if not yet available, and the UI will handle it gracefully.
 */
export const socialLinksData: SocialLinks = {
  github: 'https://www.github.com/BallapuramPrakashRoyal',
  linkedin: 'https://www.linkedin.com/in/ballapuramprakashroyal',
  twitter: '',
  email: 'prakashroyal.ballapuram@gmail.com',
  mobile: '+91 6302366691',
};
