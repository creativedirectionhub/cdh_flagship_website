import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getCurrentYear } from '@/lib/format-date';

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer className="bg-charcoal text-white">
      <div className="container mx-auto px-6 max-w-[1200px] py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl md:text-3xl font-serif font-bold text-white">
              Creative Direction Hub
            </Link>
            <p className="text-white/70 max-w-md leading-relaxed">
              Strategic branding and web design for businesses ready to be taken seriously.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:support@creativedirectionhub.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-orange transition-colors"
              >
                support@creativedirectionhub.com
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:items-end">
            <nav className="grid grid-cols-2 gap-x-12 gap-y-4">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">
            &copy; {currentYear} Creative Direction Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-white/50 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/50 hover:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
