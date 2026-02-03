import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { CaseStudyContent } from './case-study-content';

export const dynamic = 'force-dynamic';

interface CaseStudyPageProps {
  params: { slug: string };
}

async function getCaseStudy(slug: string) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { slug },
    });
    return caseStudy;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

async function getRelatedCaseStudies(currentSlug: string, services: string[]) {
  try {
    const related = await prisma.caseStudy.findMany({
      where: {
        slug: { not: currentSlug },
        services: { hasSome: services },
      },
      take: 2,
      orderBy: { order: 'asc' },
    });
    return related;
  } catch (error) {
    console.error('Error fetching related case studies:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: `${caseStudy.client} | ${caseStudy.title}`,
    description: caseStudy.challenge?.slice(0, 160),
    openGraph: {
      title: `${caseStudy.client} | ${caseStudy.title}`,
      description: caseStudy.challenge?.slice(0, 160),
      images: caseStudy.featuredImage ? [caseStudy.featuredImage] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(
    params.slug,
    caseStudy.services ?? []
  );

  return <CaseStudyContent caseStudy={caseStudy} relatedCaseStudies={relatedCaseStudies} />;
}
