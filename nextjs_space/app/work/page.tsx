import { Metadata } from 'next';
import { WorkPageClient } from './work-page-client';
import { getSupabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Our Work | Case Studies & Portfolio',
  description: 'Explore our portfolio of strategic branding and web design projects. See how we help businesses transform their digital presence and drive real results.',
};

export const dynamic = 'force-dynamic';

async function getCaseStudies() {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    
    const { data, error } = await supabase
      .from('CaseStudy')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error fetching case studies:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return <WorkPageClient caseStudies={caseStudies} />;
}
