'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';

const projectTypes = [
  'Web Design & Development',
  'Branding / Rebranding',
  'Social Media Branding',
  'Ad Creative',
  'Multiple Services',
  'Not Sure Yet',
];

const budgetRanges = [
  '$5,000 - $10,000',
  '$10,000 - $15,000',
  '$15,000 - $25,000',
  '$25,000+',
  'Let\'s discuss',
];

export function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message ?? 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit form. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <SectionReveal>
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-6">
                Let&apos;s Talk
              </h1>
              <p className="text-lg text-secondary mb-8">
                Ready to transform your brand? Book a free discovery call to discuss your project. 
                No pitch decks or sales pressure. Just a real conversation about your business and whether we might be a good fit.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <a
                      href="mailto:support@creativedirectionhub.com"
                      className="text-secondary hover:text-accent-magenta transition-colors"
                    >
                      support@creativedirectionhub.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-secondary">Serving clients worldwide</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Response Time</p>
                    <p className="text-secondary">Within 24-48 business hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-muted rounded-xl">
                <p className="text-sm text-secondary">
                  <strong className="text-foreground">What happens next?</strong>
                  <br /><br />
                  1. Fill out the form with your project details
                  <br />
                  2. We&apos;ll review and respond within 24-48 hours
                  <br />
                  3. If it looks like a fit, we&apos;ll schedule a 30-minute discovery call
                  <br />
                  4. After the call, you&apos;ll receive a custom proposal
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Right Column - Form */}
          <SectionReveal delay={0.1}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-serif mb-3">Message Received!</h2>
                    <p className="text-secondary">
                      Thanks for reaching out. We&apos;ll review your message and get back to you within 24-48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder="Your company or brand name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                          Project Type
                        </label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        >
                          <option value="">Select a service</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium mb-2">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        >
                          <option value="">Select budget</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Tell us about your project *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                        placeholder="What are you looking to achieve? What challenges are you facing? Any timeline or deadlines?"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-primary-foreground gradient-bg rounded-full transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-secondary text-center">
                      By submitting this form, you agree to receive communication from Creative Direction Hub.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
