'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Star, TrendingUp, Users, Award } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: 127,
    suffix: '%',
    label: 'Avg. ROI for Clients',
  },
  {
    icon: Users,
    value: 50,
    suffix: '+',
    label: 'Projects Delivered',
  },
  {
    icon: Star,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
  },
  {
    icon: Award,
    value: 10,
    suffix: '+',
    label: 'Years Experience',
  },
];

const testimonialSnippets = [
  {
    quote: "CDH made us look like the professionals we actually are.",
    author: "Marcus Thompson",
    company: "Precision Home Services",
  },
  {
    quote: "The rebrand didn't just change how brands saw me. It changed how I saw myself.",
    author: "Morgan Blake",
    company: "Morgan Blake Studio",
  },
  {
    quote: "Best investment we've made in the business.",
    author: "David Martinez",
    company: "Strategic Insights Consulting",
  },
];

export function ProofStrip() {
  return (
    <section className="py-20 bg-offwhite">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Metrics */}
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-3 text-orange" />
                  <div className="text-3xl md:text-4xl font-serif font-bold mb-1 text-navy">
                    <AnimatedCounter 
                      value={metric.value} 
                      suffix={metric.suffix} 
                    />
                  </div>
                  <div className="text-sm text-slate">{metric.label}</div>
                </div>
              );
            })}
          </div>
        </SectionReveal>

        {/* Testimonial Snippets */}
        <SectionReveal delay={0.2}>
          <div className="mt-16 pt-16 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialSnippets.map((item, index) => (
                <div key={index} className="text-center md:text-left">
                  <p className="text-charcoal italic mb-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-navy">{item.author}</span>
                    <span className="text-slate"> &middot; {item.company}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
