import { Metadata } from 'next';
import { SectionReveal } from '@/components/ui/section-reveal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Creative Direction Hub',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[800px]">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-lg mb-6">
              Last updated: February 2026
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using the Creative Direction Hub website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Services</h2>
            <p className="mb-4">
              Creative Direction Hub provides branding, web design, and creative services. Specific terms for individual projects are outlined in separate project agreements and proposals.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
              All content on this website, including text, images, and design elements, is the property of Creative Direction Hub unless otherwise noted. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Limitation of Liability</h2>
            <p className="mb-4">
              Creative Direction Hub provides this website "as is" without warranties of any kind. We are not liable for any damages arising from your use of this website.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Contact</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:support@creativedirectionhub.com" className="text-accent-magenta hover:underline">
                support@creativedirectionhub.com
              </a>
            </p>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
