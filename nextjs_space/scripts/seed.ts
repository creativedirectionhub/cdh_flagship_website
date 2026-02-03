import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Mockup mappings
const mockupMapping: Record<string, string[]> = {
  'precision-home-services': [
    'https://cdn.abacus.ai/images/d34730f8-e62e-4c7c-a637-e3ae61648f9e.png',
    'https://cdn.abacus.ai/images/c6fa09ac-f32d-406e-a074-81a4694c5f85.png',
    'https://cdn.abacus.ai/images/ae26ac5f-4a08-4abe-9b4f-5d7a2a50db20.png',
    'https://cdn.abacus.ai/images/7a04268d-7bcb-4c6e-be4d-be24cad9f9e1.png',
    'https://cdn.abacus.ai/images/8f5b2d9c-f610-4d6d-a152-9d8c62b55517.png'
  ],
  'morgan-blake-studio': [
    'https://cdn.abacus.ai/images/d065294d-e5df-48ee-a5a2-3b0c0a624442.png',
    'https://cdn.abacus.ai/images/e040dc82-63ec-427a-9bbd-b75f9d476c09.png',
    'https://cdn.abacus.ai/images/39a98f96-97ec-413e-a3cf-8a7932db3496.png',
    'https://cdn.abacus.ai/images/7f2e70ef-09d3-4fba-8fcc-e52b26b16e15.png',
    'https://cdn.abacus.ai/images/e23ae100-d564-4797-b53f-28623e608372.png'
  ],
  'community-forward-initiative': [
    'https://cdn.abacus.ai/images/d0b47f4c-7230-44c0-a24f-848be95c2343.png',
    'https://cdn.abacus.ai/images/160b9972-9308-44aa-9db6-47b894d4ae5f.png',
    'https://cdn.abacus.ai/images/46013684-a811-48e8-b9a0-1cc412afaa06.png',
    'https://cdn.abacus.ai/images/347029f0-3e6a-469b-b4df-d8c6a166a3c8.png',
    'https://cdn.abacus.ai/images/25d97f3a-b0a5-482c-836e-5d4555077625.png'
  ],
  'artisan-and-co': [
    'https://cdn.abacus.ai/images/0aef7b5c-dd57-4e1d-a8e5-1c6be8242cbf.png',
    'https://cdn.abacus.ai/images/6370cecb-ab2b-4098-a9fd-11f86f8069f2.png',
    'https://cdn.abacus.ai/images/e68833ba-ddb0-4c58-8d18-ff98d54a41c4.png',
    'https://cdn.abacus.ai/images/c4870ad4-7e77-47a8-bf7f-887b6ed7535e.png',
    'https://cdn.abacus.ai/images/ad96619f-4f65-408f-81f9-f2d70b5076ac.png'
  ],
  'strategic-insights-consulting': [
    'https://cdn.abacus.ai/images/76d55e85-09cc-4a81-91ec-f565b24817f0.png',
    'https://cdn.abacus.ai/images/76f09d80-550d-4c6e-9fca-b69b166450be.png',
    'https://cdn.abacus.ai/images/8e2a445e-62cd-4268-a1cb-42c6075ba72e.png',
    'https://cdn.abacus.ai/images/a9fdbb77-6919-4c21-9366-91030aee66e6.png',
    'https://cdn.abacus.ai/images/fcd61c4a-e9bf-46db-8048-79d06e69e0c5.png'
  ],
  'streamline-ai': [
    'https://cdn.abacus.ai/images/f8fd42ca-6023-48c9-ba61-2c3756bc924a.png',
    'https://cdn.abacus.ai/images/8385e8b9-20ea-4df0-a720-dda35c308b08.png',
    'https://cdn.abacus.ai/images/8749ad94-a0ff-4af9-806a-d87f4638095d.png',
    'https://cdn.abacus.ai/images/38633170-642d-47ff-ad2a-8e5ca257aa0a.png',
    'https://cdn.abacus.ai/images/faf7a3ab-d8fb-4a03-a293-0e4a6939f89e.png'
  ],
  'elevate-lifestyle': [
    'https://cdn.abacus.ai/images/073b0e3c-f201-40b4-bf8d-e6676e565ef7.png',
    'https://cdn.abacus.ai/images/6a57ab81-e53a-48f9-8896-276ad1a73918.png',
    'https://cdn.abacus.ai/images/deca4a53-2f06-4314-b8e5-02069fc7d340.png',
    'https://cdn.abacus.ai/images/d6ddf2e4-ae73-4dc6-9001-fca2cf01cd41.png',
    'https://cdn.abacus.ai/images/71aef459-1892-4633-9dc3-efa89e625139.png'
  ],
  'grace-community-church': [
    'https://cdn.abacus.ai/images/5fac804b-f27e-40c8-9c99-10ddc5c1d926.png',
    'https://cdn.abacus.ai/images/e77cc559-3765-4c8e-bd17-9bd691a7d8bc.png',
    'https://cdn.abacus.ai/images/0bfee2e0-a24a-4d6c-b36a-eb302aa1b25e.png',
    'https://cdn.abacus.ai/images/ef6d740e-204e-41ec-ab98-f96b4ff02b45.png',
    'https://cdn.abacus.ai/images/16d410d2-dc5a-4e60-b2c4-031eb3e812f7.png'
  ],
  'forge-creative-co': [
    'https://cdn.abacus.ai/images/af3d8a96-2020-495f-a96b-4657fdc3bc02.png',
    'https://cdn.abacus.ai/images/5fd1c702-a92e-4ade-a087-1a16e20d55e6.png',
    'https://cdn.abacus.ai/images/614df2a2-9ba4-4dfb-9c3d-2949e2ce7f2d.png',
    'https://cdn.abacus.ai/images/7e317984-0f50-423a-b1f4-a86e24473fa6.png',
    'https://cdn.abacus.ai/images/d1ac095c-8149-45ff-857d-32baa5768cbe.png'
  ],
  'cdh-flagship': [
    'https://cdn.abacus.ai/images/23f74ab8-dc9e-471d-96c8-d54258f072ba.png',
    'https://cdn.abacus.ai/images/4e9ca69f-cfbf-4601-801d-90a8a0cbb0cc.png',
    'https://cdn.abacus.ai/images/b28695d7-7b00-4321-95a7-5ab332eb83a7.png',
    'https://cdn.abacus.ai/images/b725e6e6-8585-49ff-bacf-25ed1d602498.png',
    'https://cdn.abacus.ai/images/719e5f7f-ba49-4122-92c4-f007120be556.png'
  ]
};

async function main() {
  console.log('Starting seed...');

  // Read content JSON
  const contentPath = '/home/ubuntu/cdh_content.json';
  const contentRaw = fs.readFileSync(contentPath, 'utf-8');
  const content = JSON.parse(contentRaw);

  // Featured case studies (first 3)
  const featuredSlugs = ['precision-home-services', 'morgan-blake-studio', 'community-forward-initiative'];

  // Seed Case Studies
  console.log('Seeding case studies...');
  for (let i = 0; i < content.caseStudies.length; i++) {
    const cs = content.caseStudies[i];
    const slug = cs.id;
    const mockups = mockupMapping[slug] || [];
    const featured = featuredSlugs.includes(slug);

    await prisma.caseStudy.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: cs.title,
        client: cs.client,
        industry: cs.industry,
        services: cs.services || [],
        challenge: cs.challenge,
        strategy: cs.strategy,
        execution: cs.execution,
        resultsMetrics: cs.results?.metrics || [],
        resultsNarrative: cs.results?.narrative || '',
        testimonialQuote: cs.testimonial?.quote || '',
        testimonialAuthor: cs.testimonial?.author || '',
        testimonialRole: cs.testimonial?.role || '',
        timeline: cs.projectDetails?.timeline || '',
        teamSize: cs.projectDetails?.teamSize || '',
        deliverables: cs.projectDetails?.deliverables || [],
        technologies: cs.projectDetails?.technologies || [],
        keyInsights: cs.keyInsights || '',
        featuredImage: mockups[0] || null,
        mockupImages: mockups,
        featured,
        order: i,
      },
    });
    console.log(`  - ${cs.client}`);
  }

  // Seed Blog Articles
  console.log('Seeding blog articles...');
  for (const article of content.blogArticles) {
    const slug = article.slug || article.id;

    await prisma.blogArticle.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category || 'Strategy',
        author: article.author || 'CDH Team',
        publishedDate: new Date(article.publishedDate || '2026-01-15'),
        readTime: article.readTime || '8 min read',
        tags: article.tags || [],
        metaTitle: article.metaTitle || null,
        metaDescription: article.metaDescription || null,
        featuredImage: null,
        published: true,
      },
    });
    console.log(`  - ${article.title}`);
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
