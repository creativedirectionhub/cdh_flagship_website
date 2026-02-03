import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { WorkPageClient } from './work-page-client';

export const metadata: Metadata = {
  title: 'Our Work | Case Studies & Portfolio',
  description: 'Explore our portfolio of strategic branding and web design projects. See how we help businesses transform their digital presence and drive real results.',
};

export const dynamic = 'force-dynamic';

async function getCaseStudies() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      orderBy: { order: 'asc' },
    });
    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return <WorkPageClient caseStudies={caseStudies} />;
}
