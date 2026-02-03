import { Service } from './types';

export const services: Service[] = [
  {
    id: 'web-design-development',
    slug: 'web-design-development',
    title: 'Web Design & Development',
    shortDescription: 'Strategic websites that convert visitors into customers.',
    description: 'We build websites that work as hard as you do. Strategic architecture, compelling design, and technical excellence—all focused on moving your business forward.',
    icon: 'Globe',
    features: [
      'Conversion-focused design architecture',
      'Custom Next.js or WordPress development',
      'Mobile-first responsive design',
      'Performance optimization (90+ Lighthouse)',
      'SEO foundation and schema markup',
      'CMS for easy content management'
    ],
    outcomes: [
      'Higher conversion rates from website visitors',
      'Improved search engine visibility',
      'Faster page load speeds',
      'Lower bounce rates',
      'More qualified leads'
    ],
    process: [
      { number: 1, title: 'Discovery', description: 'We learn your business, audience, and goals to define success metrics.', deliverables: ['Competitive analysis', 'User journey mapping', 'Technical requirements'] },
      { number: 2, title: 'Strategy', description: 'We architect the site structure and content hierarchy for maximum impact.', deliverables: ['Information architecture', 'Wireframes', 'Content strategy'] },
      { number: 3, title: 'Design', description: 'We create visual designs that communicate your brand and guide users to action.', deliverables: ['Design concepts', 'Mobile and desktop mockups', 'Interactive prototypes'] },
      { number: 4, title: 'Development', description: 'We build a fast, secure, and scalable website with clean code.', deliverables: ['Custom development', 'CMS integration', 'Quality assurance'] },
      { number: 5, title: 'Launch', description: 'We deploy, test, and optimize for peak performance.', deliverables: ['Deployment', 'Performance testing', 'Training and documentation'] }
    ],
    caseStudyIds: ['precision-home-services', 'community-forward-initiative', 'strategic-insights-consulting']
  },
  {
    id: 'branding-systems',
    slug: 'branding-systems',
    title: 'Branding & Rebranding',
    shortDescription: 'Brand systems that position you as the obvious choice.',
    description: 'Your brand is how the market perceives you. We create brand systems that communicate authority, build trust, and make you memorable.',
    icon: 'Palette',
    features: [
      'Brand strategy and positioning',
      'Logo and visual identity design',
      'Typography and color systems',
      'Brand guidelines documentation',
      'Collateral design (business cards, letterhead)',
      'Brand voice and messaging framework'
    ],
    outcomes: [
      'Clear market positioning',
      'Consistent brand recognition',
      'Higher perceived value',
      'Premium pricing power',
      'Stronger customer loyalty'
    ],
    process: [
      { number: 1, title: 'Discovery', description: 'We understand your business, market, and competitive landscape.', deliverables: ['Brand audit', 'Competitor analysis', 'Stakeholder interviews'] },
      { number: 2, title: 'Strategy', description: 'We define your positioning, personality, and messaging framework.', deliverables: ['Positioning statement', 'Brand attributes', 'Messaging hierarchy'] },
      { number: 3, title: 'Design', description: 'We create the visual identity that brings your strategy to life.', deliverables: ['Logo concepts', 'Color palette', 'Typography system'] },
      { number: 4, title: 'System', description: 'We build the complete brand toolkit for consistent application.', deliverables: ['Brand guidelines', 'Collateral templates', 'Asset library'] }
    ],
    caseStudyIds: ['precision-home-services', 'morgan-blake-studio', 'forge-creative-co']
  },
  {
    id: 'social-media-branding',
    slug: 'social-media-branding',
    title: 'Social Media Branding',
    shortDescription: 'Cohesive social presence that builds audience and credibility.',
    description: 'Stop posting randomly and start building a recognizable brand. We create social media systems that are consistent, efficient, and effective.',
    icon: 'Share2',
    features: [
      'Social media brand guidelines',
      'Profile optimization across platforms',
      'Content template systems (Canva/Figma)',
      'Post and story design systems',
      'Photo filter and editing presets',
      'Content calendar frameworks'
    ],
    outcomes: [
      'Cohesive, recognizable feed aesthetic',
      'Faster content creation with templates',
      'Higher engagement rates',
      'Increased follower growth',
      'More brand partnership opportunities'
    ],
    process: [
      { number: 1, title: 'Audit', description: 'We analyze your current social presence and competitive landscape.', deliverables: ['Platform audit', 'Content analysis', 'Competitor review'] },
      { number: 2, title: 'Strategy', description: 'We define your visual direction and content approach.', deliverables: ['Visual direction', 'Content pillars', 'Posting strategy'] },
      { number: 3, title: 'Design', description: 'We create templates and systems you can use independently.', deliverables: ['Template library', 'Profile graphics', 'Photo presets'] },
      { number: 4, title: 'Training', description: 'We teach you how to maintain consistency efficiently.', deliverables: ['Tutorial videos', 'Style guide', 'Ongoing support'] }
    ],
    caseStudyIds: ['elevate-lifestyle', 'morgan-blake-studio']
  },
  {
    id: 'ad-creative',
    slug: 'ad-creative',
    title: 'Ad Creative',
    shortDescription: 'Ad visuals that stop the scroll and drive action.',
    description: 'Great ads get attention and drive action. We create ad creative that performs—designed for the platform, optimized for the objective.',
    icon: 'Zap',
    features: [
      'Static ad design (social, display, print)',
      'Video ad production and editing',
      'A/B test variations',
      'Platform-specific optimization',
      'Ad copy collaboration',
      'Performance-driven iteration'
    ],
    outcomes: [
      'Higher click-through rates',
      'Lower cost per acquisition',
      'Stronger brand recall',
      'More efficient ad spend',
      'Scalable creative systems'
    ],
    process: [
      { number: 1, title: 'Brief', description: 'We understand your campaign objectives, audience, and constraints.', deliverables: ['Creative brief', 'Platform requirements', 'Performance goals'] },
      { number: 2, title: 'Concepts', description: 'We develop creative directions that align with your strategy.', deliverables: ['Concept boards', 'Copy options', 'Format recommendations'] },
      { number: 3, title: 'Production', description: 'We create the final ad assets in all required formats.', deliverables: ['Final assets', 'Size variations', 'Animation/video'] },
      { number: 4, title: 'Iteration', description: 'We refine based on performance data.', deliverables: ['A/B variations', 'Performance analysis', 'Optimization recommendations'] }
    ],
    caseStudyIds: ['streamline-ai', 'artisan-and-co']
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
