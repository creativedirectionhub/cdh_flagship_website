'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import type { CaseStudy } from '@/lib/types';

interface FeaturedWorkProps {
  caseStudies: CaseStudy[];
}

export function FeaturedWork({ caseStudies }: FeaturedWorkProps) {
  const studies = caseStudies ?? [];

  if (studies.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-navy">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white">
                Featured Work
              </h2>
              <p className="text-lg text-white/70 max-w-xl">
                Real projects. Real results. See how we help businesses transform their digital presence.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 mt-6 md:mt-0 text-base font-medium text-white hover:text-orange transition-colors"
            >
              View all work
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-8">
          {studies.map((study, index) => {
            const featuredImage = study?.featuredImage ?? study?.mockupImages?.[0] ?? '/mockups/mockup46_cdh_desktop.png';
            const keyMetric = study?.resultsMetrics?.[0] ?? '';

            return (
              <SectionReveal key={study?.id ?? index} delay={index * 0.15}>
                <Link href={`/work/${study?.slug ?? ''}`} className="group block">
                  <motion.div
                    className="relative bg-white rounded-2xl overflow-hidden shadow-lg"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Image */}
                      <div className="relative aspect-[16/10] md:aspect-auto bg-muted">
                        <Image
                          src={featuredImage}
                          alt={study?.title ?? 'Case study'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {(study?.services ?? []).slice(0, 3).map((service: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-navy/5 text-navy rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-xl md:text-2xl font-serif mb-2 text-navy">
                          {study?.client ?? ''}
                        </h3>
                        <p className="text-slate mb-4">
                          {study?.title ?? ''}
                        </p>

                        {keyMetric && (
                          <div className="mb-6 p-4 bg-navy/5 rounded-xl border border-navy/10">
                            <p className="text-sm font-medium text-orange">
                              Key Result
                            </p>
                            <p className="text-lg font-serif text-navy">{keyMetric}</p>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm font-medium text-navy group-hover:text-orange transition-colors">
                          View case study
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
