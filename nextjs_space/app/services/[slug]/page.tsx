import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePageContent } from './service-page-content';
import { getServiceBySlug, services } from '@/lib/services-data';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Services`,
    description: service.description,
  };
}

async function getRelatedCaseStudies(caseStudyIds: string[]) {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: {
        slug: { in: caseStudyIds },
      },
      take: 3,
    });
    return caseStudies;
  } catch (error) {
    console.error('Error fetching related case studies:', error);
    return [];
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(service.caseStudyIds);

  return <ServicePageContent service={service} relatedCaseStudies={relatedCaseStudies} />;
}
