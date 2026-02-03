export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  strategy: string;
  execution: string;
  resultsMetrics: string[];
  resultsNarrative: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
  timeline: string;
  teamSize: string;
  deliverables: string[];
  technologies: string[];
  keyInsights: string;
  featuredImage?: string | null;
  mockupImages: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedDate: Date;
  readTime: string;
  tags: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  featuredImage?: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  projectType?: string | null;
  budget?: string | null;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  outcomes: string[];
  process: ProcessStep[];
  caseStudyIds: string[];
  icon: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  deliverables?: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}
