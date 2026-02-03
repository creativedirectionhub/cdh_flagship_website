import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { ArticleContent } from './article-content';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { slug: string };
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.blogArticle.findUnique({
      where: { slug },
    });
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(currentSlug: string, category: string) {
  try {
    const related = await prisma.blogArticle.findMany({
      where: {
        slug: { not: currentSlug },
        category,
        published: true,
      },
      take: 2,
      orderBy: { publishedDate: 'desc' },
    });
    return related;
  } catch (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt,
    openGraph: {
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt,
      type: 'article',
      publishedTime: article.publishedDate?.toISOString(),
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(
    params.slug,
    article.category ?? ''
  );

  return <ArticleContent article={article} relatedArticles={relatedArticles} />;
}
