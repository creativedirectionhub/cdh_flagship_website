'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import type { CaseStudy } from '@/lib/types';

interface WorkPageClientProps {
  caseStudies: CaseStudy[];
}

export function WorkPageClient({ caseStudies }: WorkPageClientProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const studies = caseStudies ?? [];

  // Extract unique industries and services for filtering
  const filters = useMemo(() => {
    const industries = [...new Set(studies.map((s) => s?.industry).filter(Boolean))];
    const services = [...new Set(studies.flatMap((s) => s?.services ?? []))];
    return {
      industries,
      services: services.slice(0, 6),
    };
  }, [studies]);

  // Filter case studies
  const filteredStudies = useMemo(() => {
    if (activeFilter === 'all') return studies;
    return studies.filter(
      (s) =>
        s?.industry === activeFilter ||
        (s?.services ?? []).includes(activeFilter)
    );
  }, [studies, activeFilter]);

  const filterOptions = [
    { value: 'all', label: 'All Work' },
    ...filters.services.map((s) => ({ value: s, label: s })),
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Our Work
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Real projects. Real results. See how strategic branding and design 
              helps businesses transform their digital presence.
            </p>
          </div>
        </SectionReveal>

        {/* Filters */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <Filter className="w-4 h-4 text-secondary" />
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  activeFilter === filter.value
                    ? 'bg-foreground text-primary-foreground'
                    : 'bg-muted text-secondary hover:bg-border'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Case Studies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredStudies.map((study, index) => {
              const featuredImage =
                study?.featuredImage ??
                study?.mockupImages?.[0] ??
                '/mockups/mockup46_cdh_desktop.png';
              const keyMetric = study?.resultsMetrics?.[0] ?? '';

              return (
                <motion.div
                  key={study?.id ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/work/${study?.slug ?? ''}`} className="group block">
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={featuredImage}
                          alt={study?.title ?? 'Case study'}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(study?.services ?? []).slice(0, 2).map((service: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium bg-muted rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>

                        <h3 className="text-lg font-serif mb-1">
                          {study?.client ?? ''}
                        </h3>
                        <p className="text-sm text-secondary mb-3">
                          {study?.title ?? ''}
                        </p>

                        {keyMetric && (
                          <p className="text-sm font-medium text-accent-magenta">
                            {keyMetric}
                          </p>
                        )}

                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-secondary">
                            {study?.industry ?? ''}
                          </span>
                          <span className="text-sm font-medium flex items-center gap-1">
                            View
                            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary">No case studies found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
