'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { MagneticButton } from '@/components/ui/magnetic-button';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/insights', label: 'Insights' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Pages with dark hero sections need light text
  const isDarkHero = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 max-w-[1200px]">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-opacity hover:opacity-70 ${
                isScrolled || isDarkHero ? 'text-white' : 'text-navy'
              }`}
            >
              Creative Direction Hub
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled || isDarkHero
                      ? pathname === link.href || pathname?.startsWith(link.href + '/')
                        ? 'text-white'
                        : 'text-white/70 hover:text-orange'
                      : pathname === link.href || pathname?.startsWith(link.href + '/')
                        ? 'text-navy'
                        : 'text-slate hover:text-navy'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <MagneticButton asChild>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-orange rounded-full transition-all hover:bg-orange-hover hover:shadow-lg hover:shadow-orange/30"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 -mr-2 ${isScrolled || isDarkHero ? 'text-white' : 'text-navy'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-navy pt-24 md:hidden"
          >
            <nav className="container px-6 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-serif ${
                      pathname === link.href ? 'text-white' : 'text-white/70 hover:text-orange'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-orange rounded-full hover:bg-orange-hover"
                >
                  Book a Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
