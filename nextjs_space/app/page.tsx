import { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { ProofStrip } from '@/components/home/proof-strip';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturedWork } from '@/components/home/featured-work';
import { ProcessSection } from '@/components/home/process-section';
import { FounderSection } from '@/components/home/founder-section';
import { InsightsPreview } from '@/components/home/insights-preview';
import { FinalCTA } from '@/components/home/final-cta';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Creative Direction Hub | Premium Brand & Web Design Studio',
  description: 'Strategic branding and web design for businesses ready to be taken seriously. We create brands that convert visitors into customers.',
};

export const dynamic = 'force-dynamic';

async function getFeaturedCaseStudies() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 3,
    });
    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

async function getLatestArticles() {
  try {
    const articles = await prisma.blogArticle.findMany({
      where: { published: true },
      orderBy: { publishedDate: 'desc' },
      take: 3,
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredCaseStudies, latestArticles] = await Promise.all([
    getFeaturedCaseStudies(),
    getLatestArticles(),
  ]);

  return (
    <>
      <HeroSection />
      <ProofStrip />
      <ServicesSection />
      <FeaturedWork caseStudies={featuredCaseStudies} />
      <ProcessSection />
      <FounderSection />
      <InsightsPreview articles={latestArticles} />
      <FinalCTA />
    </>
  );
}
