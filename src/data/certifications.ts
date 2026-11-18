export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  credentialId: string;
  link: string;
  image?: string;
  proof?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    title: 'Certified AppSec Practitioner (CAP)',
    issuer: 'The SecOps Group',
    year: 'Nov 2024',
    credentialId: 'ID: 9281071 (Merit)',
    link: '/certifications/docs/cap.pdf',
    image: '/certifications/images/cap.png',
    proof: '/certifications/docs/cap.pdf',
  },
  {
    title: 'Certified Network Security Practitioner (CNSP)',
    issuer: 'The SecOps Group',
    year: 'Apr 2025',
    credentialId: 'ID: 9829374 (Merit)',
    link: '/certifications/docs/cnsp.pdf',
    image: '/certifications/images/cnsp.png',
    proof: '/certifications/docs/cnsp.pdf',
  },
  {
    title: "API Security Fundamentals '25",
    issuer: 'APIsec University',
    year: 'May 2025',
    credentialId: 'Credly Badge',
    link: 'https://www.credly.com/badges/f2b93b1c-c477-487b-8650-7c99e2f270cc',
    image: '/certifications/images/api_security_fundamentals.png',
    proof: '/certifications/docs/api_security_fundamentals.pdf',
  },
  {
    title: 'Introduction to Dark Web Operations',
    issuer: 'Cyber Warfare Labs',
    year: 'Oct 2024',
    credentialId: 'ID: 411325227',
    link: '/certifications/docs/dark_web_operations.pdf',
    image: '/certifications/images/dark_web_operations.png',
    proof: '/certifications/docs/dark_web_operations.pdf',
  },
  {
    title: 'Cisco Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    year: 'Jun 2024',
    credentialId: 'Verified Completion',
    link: '/certifications/docs/cisco_cybersecurity_essentials.pdf',
    image: '/certifications/images/cisco_cybersecurity_essentials.png',
    proof: '/certifications/docs/cisco_cybersecurity_essentials.pdf',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: 'Jun 2024',
    credentialId: 'Verified Completion',
    link: '/certifications/docs/intro_to_cybersecurity.pdf',
    image: '/certifications/images/intro_to_cybersecurity.png',
    proof: '/certifications/docs/intro_to_cybersecurity.pdf',
  },
  {
    title: 'Cybersecurity for Everyone',
    issuer: 'University of Maryland (Coursera)',
    year: 'Jan 2024',
    credentialId: 'ID: DNHU7UNZ86BC',
    link: 'https://coursera.org/verify/DNHU7UNZ86BC',
    image: '/certifications/images/cybersecurity_for_everyone.png',
    proof: '/certifications/docs/cybersecurity_for_everyone.pdf',
  },
  {
    title: 'AWS S3 Basics',
    issuer: 'Coursera Project Network',
    year: 'Jan 2024',
    credentialId: 'ID: 3GRBTRGQ9M8X',
    link: 'https://coursera.org/verify/3GRBTRGQ9M8X',
    image: '/certifications/images/aws_s3_basics.png',
    proof: '/certifications/docs/aws_s3_basics.pdf',
  },
  {
    title: 'Java Programming Fundamentals',
    issuer: 'GalileoX / Universidad Galileo (edX)',
    year: 'May 2024',
    credentialId: 'ID: 9457c628df5c422d9a8bc153f2b3c225',
    link: '/certifications/docs/java_programming_fundamentals.pdf',
    image: '/certifications/images/java_programming_fundamentals.png',
    proof: '/certifications/docs/java_programming_fundamentals.pdf',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy / Python Institute',
    year: 'Oct 2024',
    credentialId: 'Verified Completion',
    link: '/certifications/docs/python_essentials_1.pdf',
    image: '/certifications/images/python_essentials_1.png',
    proof: '/certifications/docs/python_essentials_1.pdf',
  },
  {
    title: 'HTML & CSS Foundation Level',
    issuer: 'Full Stack Developer Course',
    year: 'Jan 2024',
    credentialId: 'ID: XpRCbTQOUH',
    link: '/certifications/docs/html_css_foundation.pdf',
    image: '/certifications/images/html_css_foundation.png',
    proof: '/certifications/docs/html_css_foundation.pdf',
  },
];
