import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SectionReveal } from '@/components/ui/section-reveal';
import { CardHover } from '@/components/ui/card-hover';
import { formatDate } from '@/lib/format-date';

export const metadata: Metadata = {
  title: 'Insights | Strategic Thinking on Branding & Design',
  description: 'Strategic thinking on branding, web design, and building businesses that matter. Practical insights from real projects.',
};

export const dynamic = 'force-dynamic';

async function getArticles() {
  try {
    const articles = await prisma.blogArticle.findMany({
      where: { published: true },
      orderBy: { publishedDate: 'desc' },
    });
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <SectionReveal>
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
              Insights
            </h1>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              Strategic thinking on branding, web design, and building businesses that matter. 
              No fluff. Just practical insights from real projects.
            </p>
          </header>
        </SectionReveal>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(articles ?? []).map((article, index) => (
            <SectionReveal key={article?.id ?? index} delay={index * 0.1}>
              <Link href={`/insights/${article?.slug ?? ''}`} className="block h-full group">
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

                  <h2 className="text-xl font-serif mb-3 group-hover:text-accent-magenta transition-colors">
                    {article?.title ?? ''}
                  </h2>

                  <p className="text-secondary text-sm line-clamp-3 mb-4 flex-1">
                    {article?.excerpt ?? ''}
                  </p>

                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-secondary">
                      {formatDate(article?.publishedDate, 'short')}
                    </span>
                    <span className="text-sm font-medium flex items-center gap-1 text-foreground">
                      Read article
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </CardHover>
              </Link>
            </SectionReveal>
          ))}
        </div>

        {(articles ?? []).length === 0 && (
          <div className="text-center py-12">
            <p className="text-secondary">No articles published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
