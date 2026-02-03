'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, Calendar, Users, CheckCircle2 } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import type { CaseStudy } from '@/lib/types';

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
  relatedCaseStudies: CaseStudy[];
}

export function CaseStudyContent({ caseStudy, relatedCaseStudies }: CaseStudyContentProps) {
  const study = caseStudy;
  const related = relatedCaseStudies ?? [];
  const mockups = study?.mockupImages ?? [];

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Back Link */}
        <SectionReveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all work
          </Link>
        </SectionReveal>

        {/* Header */}
        <SectionReveal>
          <header className="mb-16">
            <div className="flex flex-wrap gap-2 mb-4">
              {(study?.services ?? []).map((service: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm font-medium bg-muted rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4">
              {study?.client ?? ''}
            </h1>
            <p className="text-xl text-secondary max-w-3xl">
              {study?.title ?? ''}
            </p>
          </header>
        </SectionReveal>

        {/* Hero Image */}
        {mockups[0] && (
          <SectionReveal>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-16">
              <Image
                src={mockups[0]}
                alt={study?.title ?? 'Case study hero'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </SectionReveal>
        )}

        {/* Project Details */}
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 p-8 bg-muted rounded-2xl">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-accent-magenta flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Timeline</p>
                <p className="font-medium">{study?.timeline ?? ''}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-accent-magenta flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Team</p>
                <p className="font-medium">{study?.teamSize ?? ''}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-magenta flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-secondary">Industry</p>
                <p className="font-medium">{study?.industry ?? ''}</p>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* The Challenge */}
        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">The Challenge</h2>
            <p className="text-lg text-secondary leading-relaxed max-w-4xl">
              {study?.challenge ?? ''}
            </p>
          </section>
        </SectionReveal>

        {/* Mockup Gallery - First Set */}
        {mockups.length > 1 && (
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {mockups.slice(1, 3).map((img: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt={`${study?.client ?? ''} mockup ${i + 2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* The Strategy */}
        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">The Strategy</h2>
            <p className="text-lg text-secondary leading-relaxed max-w-4xl">
              {study?.strategy ?? ''}
            </p>
          </section>
        </SectionReveal>

        {/* The Execution */}
        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">The Execution</h2>
            <p className="text-lg text-secondary leading-relaxed max-w-4xl">
              {study?.execution ?? ''}
            </p>
          </section>
        </SectionReveal>

        {/* More Mockups */}
        {mockups.length > 3 && (
          <SectionReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {mockups.slice(3, 5).map((img: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image src={img} alt={`${study?.client ?? ''} mockup ${i + 4}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </SectionReveal>
        )}

        {/* The Results */}
        <SectionReveal>
          <section className="mb-16 p-8 md:p-12 bg-foreground text-primary-foreground rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-serif mb-8">The Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {(study?.resultsMetrics ?? []).map((metric: string, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90">{metric}</span>
                </div>
              ))}
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-4xl">
              {study?.resultsNarrative ?? ''}
            </p>
          </section>
        </SectionReveal>

        {/* Testimonial */}
        {study?.testimonialQuote && (
          <SectionReveal>
            <section className="mb-16">
              <div className="relative p-8 md:p-12 bg-muted rounded-2xl">
                <Quote className="w-10 h-10 text-accent-magenta opacity-30 absolute top-8 left-8" />
                <blockquote className="relative z-10 pl-8">
                  <p className="text-xl md:text-2xl font-serif italic mb-6 max-w-3xl">
                    &ldquo;{study.testimonialQuote}&rdquo;
                  </p>
                  <footer>
                    <cite className="not-italic">
                      <span className="font-medium">{study?.testimonialAuthor ?? ''}</span>
                      <br />
                      <span className="text-sm text-secondary">{study?.testimonialRole ?? ''}</span>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            </section>
          </SectionReveal>
        )}

        {/* Deliverables */}
        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">Deliverables</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(study?.deliverables ?? []).map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-accent-magenta flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Key Insights */}
        {study?.keyInsights && (
          <SectionReveal>
            <section className="mb-16 p-8 border border-border rounded-2xl">
              <h2 className="text-xl font-serif mb-4">Key Insight</h2>
              <p className="text-secondary leading-relaxed">
                {study.keyInsights}
              </p>
            </section>
          </SectionReveal>
        )}

        {/* CTA */}
        <SectionReveal>
          <section className="text-center py-16 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Want results like this for your business?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Let&apos;s talk about how we can help transform your brand and digital presence.
            </p>
            <MagneticButton asChild>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground gradient-bg rounded-full transition-all hover:shadow-xl"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
          </section>
        </SectionReveal>

        {/* Related Case Studies */}
        {related.length > 0 && (
          <SectionReveal>
            <section className="pt-16 border-t border-border">
              <h2 className="text-2xl font-serif mb-8">Related Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {related.map((r) => (
                  <Link key={r?.id} href={`/work/${r?.slug ?? ''}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={r?.featuredImage ?? r?.mockupImages?.[0] ?? '/mockups/mockup46_cdh_desktop.png'}
                        alt={r?.title ?? 'Related case study'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif text-lg mb-1">{r?.client ?? ''}</h3>
                    <p className="text-sm text-secondary">{r?.title ?? ''}</p>
                  </Link>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}
      </div>
    </article>
  );
}
