'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, CheckCircle2, Globe, Palette, Share2, Zap } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import type { Service, CaseStudy, ProcessStep } from '@/lib/types';

interface ServicePageContentProps {
  service: Service;
  relatedCaseStudies: CaseStudy[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Palette,
  Share2,
  Zap,
};

export function ServicePageContent({ service, relatedCaseStudies }: ServicePageContentProps) {
  const Icon = iconMap[service?.icon ?? 'Globe'] ?? Globe;
  const studies = relatedCaseStudies ?? [];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Back Link */}
        <SectionReveal>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All services
          </Link>
        </SectionReveal>

        {/* Header */}
        <SectionReveal>
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif">
                {service?.title ?? ''}
              </h1>
            </div>
            <p className="text-xl text-secondary max-w-3xl">
              {service?.description ?? ''}
            </p>
          </header>
        </SectionReveal>

        {/* Features & Outcomes */}
        <SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* What You Get */}
            <div className="p-8 bg-muted rounded-2xl">
              <h2 className="text-xl font-serif mb-6">What You Get</h2>
              <ul className="space-y-4">
                {(service?.features ?? []).map((feature: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-magenta flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes */}
            <div className="p-8 bg-foreground text-primary-foreground rounded-2xl">
              <h2 className="text-xl font-serif mb-6">Expected Outcomes</h2>
              <ul className="space-y-4">
                {(service?.outcomes ?? []).map((outcome: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>

        {/* Process */}
        <SectionReveal>
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-serif mb-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(service?.process ?? []).map((step: ProcessStep, index: number) => (
                <div key={index} className="p-6 bg-white rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-mono text-accent-magenta">
                      {String(step?.number ?? index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif mb-2">{step?.title ?? ''}</h3>
                  <p className="text-sm text-secondary mb-4">{step?.description ?? ''}</p>
                  {(step?.deliverables ?? []).length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-secondary mb-2">Deliverables:</p>
                      <ul className="space-y-1">
                        {(step?.deliverables ?? []).map((d: string, i: number) => (
                          <li key={i} className="text-xs text-secondary flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-accent-violet" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* Pricing Approach */}
        <SectionReveal>
          <section className="mb-16 p-8 border border-border rounded-2xl">
            <h2 className="text-xl font-serif mb-4">Pricing Approach</h2>
            <p className="text-secondary mb-4">
              We price based on scope and complexity, not hourly rates. Every project starts with 
              a discovery conversation to understand your specific needs, followed by a clear proposal 
              with fixed pricing and no surprises.
            </p>
            <p className="text-secondary">
              Investment typically ranges from <strong className="text-foreground">$5,000 to $25,000</strong> depending on scope, 
              with most projects falling in the $8,000-$15,000 range.
            </p>
          </section>
        </SectionReveal>

        {/* Related Case Studies */}
        {studies.length > 0 && (
          <SectionReveal>
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif mb-8">Related Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {studies.map((study) => (
                  <Link key={study?.id} href={`/work/${study?.slug ?? ''}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                      <Image
                        src={study?.featuredImage ?? study?.mockupImages?.[0] ?? '/mockups/mockup46_cdh_desktop.png'}
                        alt={study?.title ?? 'Case study'}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif mb-1">{study?.client ?? ''}</h3>
                    <p className="text-sm text-secondary">{study?.title ?? ''}</p>
                  </Link>
                ))}
              </div>
            </section>
          </SectionReveal>
        )}

        {/* CTA */}
        <SectionReveal>
          <section className="text-center py-16 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Ready to get started?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              Book a free discovery call to discuss your project and see if we're a good fit.
            </p>
            <MagneticButton asChild>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground gradient-bg rounded-full transition-all hover:shadow-xl"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
