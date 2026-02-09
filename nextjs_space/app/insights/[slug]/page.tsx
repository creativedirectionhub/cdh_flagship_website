import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { ArticleContent } from './article-content';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: { slug: string };
}

async function getArticle(slug: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('BlogArticle')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching article:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

async function getRelatedArticles(currentSlug: string, category: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return [];
    
    const { data, error } = await supabase
      .from('BlogArticle')
      .select('*')
      .neq('slug', currentSlug)
      .eq('category', category)
      .eq('published', true)
      .order('publishedDate', { ascending: false })
      .limit(2);
    
    if (error) {
      console.error('Error fetching related articles:', error);
      return [];
    }
    
    return data || [];
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
      publishedTime: article.publishedDate,
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
