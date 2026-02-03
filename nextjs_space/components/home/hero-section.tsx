'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy">
      {/* Navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-dark" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container mx-auto px-6 max-w-[1200px] pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
          >
            <CheckCircle2 className="w-4 h-4 text-orange" />
            <span className="text-sm font-medium text-white/80">Now accepting Q2 2026 projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-6 text-white"
          >
            We build brands that{' '}
            <span className="text-orange">convert attention into revenue</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Strategic branding and web design for businesses ready to be taken seriously. 
            No fluff. No templates. Just intentional design that converts.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton asChild>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-orange rounded-full transition-all hover:bg-orange-hover hover:shadow-xl hover:shadow-orange/30 hover:scale-105"
              >
                Book a Discovery Call
                <ArrowRight className="w-5 h-5" />
              </Link>
            </MagneticButton>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white border-2 border-white/30 rounded-full transition-all hover:bg-white hover:text-navy"
            >
              View Our Work
            </Link>
          </motion.div>

          {/* Proof Points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              10+ years combined experience
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              50+ successful projects
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange" />
              Avg. 127% ROI for clients
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
