'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-orange">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-navy">
              Ready to build a brand that{' '}
              <span className="text-white">converts</span>?
            </h2>
            <p className="text-lg text-navy/80 mb-10 max-w-2xl mx-auto">
              No pitch decks. No sales pressure. Just a conversation about your business 
              and whether we might be a good fit to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton asChild>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-navy rounded-full transition-all hover:bg-navy-dark hover:shadow-xl hover:scale-105"
                >
                  Book a Discovery Call
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </MagneticButton>
              <p className="text-sm text-navy/80">
                or email{' '}
                <a
                  href="mailto:support@creativedirectionhub.com"
                  className="text-navy font-medium hover:text-white transition-colors underline underline-offset-2"
                >
                  support@creativedirectionhub.com
                </a>
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
