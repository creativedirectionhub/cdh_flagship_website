'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { formatDate } from '@/lib/format-date';
import type { BlogArticle } from '@/lib/types';

interface ArticleContentProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export function ArticleContent({ article, relatedArticles }: ArticleContentProps) {
  const related = relatedArticles ?? [];

  // Simple markdown to HTML conversion
  const formatContent = (content: string) => {
    if (!content) return '';
    
    // Convert markdown headers
    let html = content
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-serif mt-8 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-serif mt-10 mb-6">$1</h2>')
      .replace(/^# (.*$)/gim, '<h2 class="text-3xl font-serif mt-12 mb-6">$1</h2>')
      // Bold text
      .replace(/\*\*(.*)\*\*/gim, '<strong class="text-foreground">$1</strong>')
      // Italic text
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p class="mb-4 text-secondary leading-relaxed">')
      // Lists
      .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>');

    return `<p class="mb-4 text-secondary leading-relaxed">${html}</p>`;
  };

  return (
    <article className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[800px]">
        {/* Back Link */}
        <SectionReveal>
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All insights
          </Link>
        </SectionReveal>

        {/* Header */}
        <SectionReveal>
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-4">
              <span className="px-3 py-1 bg-muted rounded-full font-medium">
                {article?.category ?? 'Insight'}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article?.readTime ?? '5 min read'}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(article?.publishedDate, 'long')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              {article?.title ?? ''}
            </h1>
            <p className="text-xl text-secondary">
              {article?.excerpt ?? ''}
            </p>
          </header>
        </SectionReveal>

        {/* Author */}
        <SectionReveal>
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-border">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="font-medium text-sm">{article?.author ?? 'CDH Team'}</p>
              <p className="text-xs text-secondary">Creative Direction Hub</p>
            </div>
          </div>
        </SectionReveal>

        {/* Content */}
        <SectionReveal>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(article?.content ?? '') }}
          />
        </SectionReveal>

        {/* Tags */}
        {(article?.tags ?? []).length > 0 && (
          <SectionReveal>
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {(article?.tags ?? []).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-muted rounded-full text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}

        {/* CTA */}
        <SectionReveal>
          <div className="mt-16 p-8 bg-muted rounded-2xl text-center">
            <h3 className="text-xl font-serif mb-3">Need help with your brand?</h3>
            <p className="text-secondary mb-6">
              Let&apos;s discuss how we can apply these insights to your business.
            </p>
            <MagneticButton asChild>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-foreground gradient-bg rounded-full"
              >
                Book a Call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
          </div>
        </SectionReveal>

        {/* Related Articles */}
        {related.length > 0 && (
          <SectionReveal>
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="text-xl font-serif mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r?.id}
                    href={`/insights/${r?.slug ?? ''}`}
                    className="group p-6 bg-white rounded-xl border border-border hover:shadow-md transition-all"
                  >
                    <p className="text-xs text-secondary mb-2">{r?.category ?? ''}</p>
                    <h4 className="font-serif mb-2 group-hover:text-accent-magenta transition-colors">
                      {r?.title ?? ''}
                    </h4>
                    <p className="text-sm text-secondary line-clamp-2">
                      {r?.excerpt ?? ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </SectionReveal>
        )}
      </div>
    </article>
  );
}
