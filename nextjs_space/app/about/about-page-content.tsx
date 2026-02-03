'use client';

import Link from 'next/link';
import { ArrowRight, Target, Sparkles, Users, Award, Quote } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const values = [
  {
    icon: Target,
    title: 'Strategy First',
    description: "Every design decision is tied to a business objective. We don't decorate. We solve problems.",
  },
  {
    icon: Sparkles,
    title: 'Intentional Design',
    description: "Every pixel earns its place. No filler, no trends for trends' sake. Just considered, purposeful work.",
  },
  {
    icon: Users,
    title: 'Collaborative Process',
    description: 'The best work happens through partnership. We bring expertise; you bring deep knowledge of your business.',
  },
  {
    icon: Award,
    title: 'Results That Matter',
    description: "We measure success by business outcomes, not awards. Did it move the needle? That's what counts.",
  },
];

const credibilitySignals = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 10, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 127, suffix: '%', label: 'Avg. Client ROI' },
];

export function AboutPageContent() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <SectionReveal>
          <header className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              The Brand Behind Brands
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Creative Direction Hub exists because too many businesses are held back by their brand, not supported by it.
            </p>
          </header>
        </SectionReveal>

        {/* Story */}
        <SectionReveal>
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif mb-6">Why We Exist</h2>
                <div className="space-y-4 text-secondary">
                  <p>
                    We've seen businesses with incredible products lose opportunities because their website looked like a template. 
                    We've watched talented consultants get passed over because their digital presence didn't match their expertise.
                  </p>
                  <p>
                    That gap between capability and perception? That's what we close.
                  </p>
                  <p>
                    Every business we work with has something valuable to offer. Our job is to make sure the world sees it that way too.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4">
                  <Quote className="w-12 h-12 text-accent-orange opacity-30" />
                </div>
                <blockquote className="p-8 bg-muted rounded-2xl border-l-4 border-accent-magenta">
                  <p className="text-xl font-serif italic mb-4">
                    &ldquo;Your brand is the first impression you make and the lasting memory you leave. 
                    Make it count.&rdquo;
                  </p>
                  <footer className="text-sm text-secondary">
                    &mdash; CDH founding philosophy
                  </footer>
                </blockquote>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Our Approach */}
        <SectionReveal>
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">Our Approach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-secondary">
                <p>
                  <strong className="text-foreground">We're not here to make things pretty.</strong> We're here to make things work.
                </p>
                <p>
                  Every project starts with understanding your business: your goals, your audience, your competitive landscape. 
                  We ask uncomfortable questions. We challenge assumptions. We dig until we find what makes you different.
                </p>
                <p>
                  Then we build a brand that communicates that difference clearly, consistently, and compellingly.
                </p>
              </div>
              <div className="space-y-4 text-secondary">
                <p>
                  <strong className="text-foreground">We believe in proof over promises.</strong>
                </p>
                <p>
                  You won't find vague claims about &ldquo;elevating your brand&rdquo; or &ldquo;creating synergies.&rdquo; 
                  You'll find case studies with real numbers, real outcomes, and real testimonials from real clients.
                </p>
                <p>
                  Our work speaks for itself, and we let it.
                </p>
              </div>
            </div>
          </section>
        </SectionReveal>

        {/* Values */}
        <SectionReveal>
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">What We Believe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="p-6 bg-white rounded-xl border border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-serif mb-2">{value.title}</h3>
                        <p className="text-secondary text-sm">{value.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </SectionReveal>

        {/* Credibility */}
        <SectionReveal>
          <section className="mb-20 p-10 bg-foreground text-primary-foreground rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {credibilitySignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-serif font-bold mb-1">
                    <AnimatedCounter value={signal.value} suffix={signal.suffix} />
                  </div>
                  <div className="text-sm text-primary-foreground/60">{signal.label}</div>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal>
          <section className="text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Ready to work together?
            </h2>
            <p className="text-secondary mb-8 max-w-xl mx-auto">
              We're selective about the projects we take on. Not because we're exclusive, but because we want to do great work for the right clients.
            </p>
            <MagneticButton asChild>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-primary-foreground gradient-bg rounded-full transition-all hover:shadow-xl"
              >
                Let's Talk
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
