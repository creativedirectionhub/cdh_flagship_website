'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Palette, Share2, Zap, ArrowRight } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { CardHover } from '@/components/ui/card-hover';

const services = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Strategic websites that convert visitors into customers. Built for speed, SEO, and results.',
    forWho: 'For businesses needing a website that actually works.',
    href: '/services/web-design-development',
  },
  {
    icon: Palette,
    title: 'Branding & Rebranding',
    description: 'Brand systems that position you as the obvious choice. Logo, identity, guidelines, and beyond.',
    forWho: 'For businesses ready to look as good as they actually are.',
    href: '/services/branding-systems',
  },
  {
    icon: Share2,
    title: 'Social Media Branding',
    description: 'Cohesive social presence that builds audience and credibility. Templates, systems, and strategy.',
    forWho: 'For creators and brands building audience.',
    href: '/services/social-media-branding',
  },
  {
    icon: Zap,
    title: 'Ad Creative',
    description: 'Ad visuals that stop the scroll and drive action. Static, video, and everything in between.',
    forWho: 'For brands running paid campaigns.',
    href: '/services/ad-creative',
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32 bg-offwhite">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-navy">
              What We Do
            </h2>
            <p className="text-lg text-slate max-w-2xl mx-auto">
              Every service is designed to move your business forward. No fluff. No filler. Just work that works.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <SectionReveal key={index} delay={index * 0.1}>
                <Link href={service.href} className="block h-full group">
                  <CardHover className="h-full flex flex-col bg-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy flex items-center justify-center group-hover:bg-orange transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-serif mb-2 text-navy">{service.title}</h3>
                        <p className="text-slate mb-3">{service.description}</p>
                        <p className="text-sm text-orange font-medium">{service.forWho}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-medium text-navy group-hover:text-orange transition-colors">
                      Learn more
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardHover>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-base font-medium text-navy hover:text-orange transition-colors"
            >
              View all services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
