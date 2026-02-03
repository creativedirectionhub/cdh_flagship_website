'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { CardHover } from '@/components/ui/card-hover';
import { formatDate } from '@/lib/format-date';
import type { BlogArticle } from '@/lib/types';

interface InsightsPreviewProps {
  articles: BlogArticle[];
}

export function InsightsPreview({ articles }: InsightsPreviewProps) {
  const articleList = articles ?? [];

  if (articleList.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
                Insights
              </h2>
              <p className="text-lg text-secondary max-w-xl">
                Strategic thinking on branding, web design, and building businesses that matter.
              </p>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 mt-6 md:mt-0 text-base font-medium text-foreground hover:text-accent-magenta transition-colors"
            >
              View all insights
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articleList.map((article, index) => (
            <SectionReveal key={article?.id ?? index} delay={index * 0.1}>
              <Link href={`/insights/${article?.slug ?? ''}`} className="block h-full">
                <CardHover className="h-full flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-secondary mb-4">
                    <span className="px-2 py-1 bg-muted rounded text-xs font-medium">
                      {article?.category ?? 'Insight'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article?.readTime ?? '5 min'}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif mb-3 line-clamp-2 group-hover:text-accent-magenta transition-colors">
                    {article?.title ?? ''}
                  </h3>

                  <p className="text-secondary text-sm line-clamp-3 mb-4 flex-1">
                    {article?.excerpt ?? ''}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-secondary">
                      {formatDate(article?.publishedDate, 'short')}
                    </span>
                    <span className="text-sm font-medium flex items-center gap-1 text-foreground">
                      Read article
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardHover>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
