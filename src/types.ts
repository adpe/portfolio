export interface Skill {
  name: string;
  level: string;
  link?: string;
}

export interface SkillsData {
  id: string;
  grouping: string;
  skills: Skill[];
}

export interface EducationItem {
  degree: string;
  school: string;
  major: string;
  minor?: string[];
  notes?: string;
  range: string;
}

export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface ProjectItem {
  title: string;
  slug: string;
  description: string;
  image?: string;
  tags: string[];
  type: 'creation' | 'contribution';
  date?: string;
}

export interface Handle {
  icon: string;
  url: string;
  label: string;
}

export interface SiteConfig {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  address: string;
  phone?: string;
  handles: Handle[];
  showEducation: boolean;
  showExperience: boolean;
  showSkills: boolean;
  showProjects: boolean;
  showPublications: boolean;
}
