import { Metadata } from 'next';
import { SectionReveal } from '@/components/ui/section-reveal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Creative Direction Hub',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[800px]">
        <SectionReveal>
          <h1 className="text-4xl md:text-5xl font-serif mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-secondary">
            <p className="text-lg mb-6">
              Last updated: February 2026
            </p>
            
            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Information We Collect</h2>
            <p className="mb-4">
              When you contact us through our website, we collect the information you provide, including your name, email address, company name, and message content. This information is used solely to respond to your inquiry and provide our services.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information collected to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Communicate with you about projects and proposals</li>
              <li>Improve our website and services</li>
              <li>Send occasional updates about our work (only with your consent)</li>
            </ul>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Data Protection</h2>
            <p className="mb-4">
              We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Your data is stored securely and is only accessed by authorized personnel.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We may use third-party services for analytics and communication. These services have their own privacy policies governing the use of your information.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Your Rights</h2>
            <p className="mb-4">
              You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact us at support@creativedirectionhub.com.
            </p>

            <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Contact</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy, please contact us at:
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
