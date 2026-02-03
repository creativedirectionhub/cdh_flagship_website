# Creative Direction Hub - Flagship Website

Premium branding and web design agency website built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js (if needed)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Set Up Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Set Up Database

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment on Vercel

1. Push this repo to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── contact/         # Contact page with form
│   ├── insights/        # Blog articles
│   ├── services/        # Service pages
│   ├── work/            # Portfolio/case studies
│   └── api/             # API routes
├── components/          # React components
│   ├── home/           # Homepage sections
│   ├── layout/         # Header, Footer
│   └── ui/             # Reusable UI components
├── lib/                 # Utilities and data
├── prisma/             # Database schema
├── public/             # Static assets
└── scripts/            # Database seeding
```

## Color Palette

- **CDH Navy:** #0B1F3A (primary)
- **Off-White:** #F9FAFB (background)
- **Conversion Orange:** #FF7A18 (CTA accent)
- **Charcoal:** #2E2E2E (text)
- **Slate Gray:** #6B7280 (muted)

---

Built with care by Creative Direction Hub.
