import { Metadata } from 'next';
import { ContactPageContent } from './contact-page-content';

export const metadata: Metadata = {
  title: 'Contact | Book a Discovery Call',
  description: 'Ready to transform your brand? Book a free discovery call to discuss your project. No pitch decks or sales pressure, just a real conversation about your business.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
