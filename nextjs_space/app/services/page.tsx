import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, Palette, Share2, Zap, ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { CardHover } from '@/components/ui/card-hover';
import { services } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'Services | What We Do',
  description: 'Strategic branding, web design, social media systems, and ad creative. Every service designed to move your business forward.',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Palette,
  Share2,
  Zap,
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              What We Do
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Every service is designed to move your business forward. No fluff. No filler. 
              Just strategic work that delivers measurable results.
            </p>
          </div>
        </SectionReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <SectionReveal key={service.id} delay={index * 0.1}>
                <Link href={`/services/${service.slug}`} className="block group">
                  <CardHover className="p-8 md:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                      {/* Title & Description */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h2 className="text-2xl font-serif">{service.title}</h2>
                        </div>
                        <p className="text-secondary mb-6">{service.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.features.slice(0, 4).map((feature, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-muted rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          Learn more about {service.title.toLowerCase()}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>

                      {/* Outcomes */}
                      <div className="bg-muted rounded-xl p-6">
                        <h3 className="text-sm font-medium mb-4">Outcomes</h3>
                        <ul className="space-y-2">
                          {service.outcomes.slice(0, 4).map((outcome, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent-magenta flex-shrink-0 mt-1.5" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHover>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        {/* CTA */}
        <SectionReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-secondary mb-6">
              Not sure which service you need? Let&apos;s talk about your goals.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground gradient-bg rounded-full transition-all hover:shadow-xl hover:scale-105"
            >
              Book a Discovery Call
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
