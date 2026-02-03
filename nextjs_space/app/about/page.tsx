import { Metadata } from 'next';
import { AboutPageContent } from './about-page-content';

export const metadata: Metadata = {
  title: 'About | The Brand Behind Brands',
  description: 'Creative Direction Hub exists to help businesses close the gap between capability and perception. Learn about our philosophy and approach.',
};

export default function AboutPage() {
  return <AboutPageContent />;
}
