'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { Quote } from 'lucide-react';

export function FounderSection() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <SectionReveal>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">
                The Brand Behind Brands
              </h2>
              <div className="space-y-4 text-primary-foreground/80">
                <p>
                  Creative Direction Hub exists because too many businesses are held back by their brand, not supported by it.
                </p>
                <p>
                  We've seen businesses with incredible products lose opportunities because their website looked like a template. We've watched talented consultants get passed over because their digital presence didn't match their expertise.
                </p>
                <p>
                  That gap between capability and perception? That's what we close.
                </p>
                <p>
                  We're not here to make things pretty. We're here to make things work. Every design decision is tied to a business objective. Every pixel earns its place.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -top-4 -left-4">
                <Quote className="w-12 h-12 text-accent-orange opacity-50" />
              </div>
              <blockquote className="pl-8 border-l-2 border-accent-magenta">
                <p className="text-xl md:text-2xl font-serif italic mb-6">
                  Your brand should be the best demonstration of your expertise. If you can't execute excellence for yourself, why would anyone trust you to do it for them?
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="font-medium">Creative Direction Hub</span>
                    <br />
                    <span className="text-sm text-primary-foreground/60">Our founding philosophy</span>
                  </cite>
                </footer>
              </blockquote>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
