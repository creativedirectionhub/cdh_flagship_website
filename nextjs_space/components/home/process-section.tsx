'use client';

import { SectionReveal } from '@/components/ui/section-reveal';
import { Search, Lightbulb, PenTool, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We learn your business, audience, goals, and challenges. No assumptions, just questions and listening.',
    deliverables: ['Competitive analysis', 'Audience research', 'Goals definition'],
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Strategy',
    description: 'We define the positioning, messaging, and creative direction that will differentiate you.',
    deliverables: ['Brand positioning', 'Messaging framework', 'Creative direction'],
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Design & Build',
    description: 'We create the visual identity and digital assets that bring your strategy to life.',
    deliverables: ['Design concepts', 'Iterative refinement', 'Final assets'],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Optimize',
    description: 'We deploy, test, and refine to ensure everything performs as intended.',
    deliverables: ['Quality assurance', 'Launch support', 'Training docs'],
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <SectionReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
              How We Work
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              A proven process that delivers results. No surprises, no scope creep. Just clear steps from kickoff to launch.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <SectionReveal key={index} delay={index * 0.1}>
                <div className="relative">
                  {/* Connection line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-mono text-accent-magenta">{step.number}</span>
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                    <p className="text-secondary text-sm mb-4">{step.description}</p>

                    <div className="space-y-2">
                      {step.deliverables.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 rounded-full bg-accent-violet" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
