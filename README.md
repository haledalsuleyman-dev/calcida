# Calcida - Financial Calculators

A fast, SEO-optimized financial calculators website built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Features

- **12+ Calculators:** Mortgage, Loans, Salary, Retirement, and more.
- **Fast Performance:** Static generation (SSG) for all pages.
- **SEO Optimized:** Meta tags, JSON-LD Schema, Sitemap, and Robots.txt.
- **Clean UI:** Minimalist design using Tailwind CSS and Recharts.
- **Blog System:** MDX-based blog for financial guides.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Adding Content

### Adding a New Calculator
1. Create logic in `src/lib/calculators/`.
2. Create a component in `src/components/calculators/`.
3. Create a page in `src/app/new-calculator/page.tsx` using `CalculatorLayout`.
4. Add to `src/app/sitemap.ts` and `src/app/page.tsx` (popular list).

### Adding a Blog Post
1. Create a new `.mdx` file in `src/content/blog/`.
2. Add frontmatter (title, date, description).
3. Write content using Markdown.

## Project Structure

- `src/app`: Routes and pages.
- `src/components`: Reusable UI components.
- `src/lib`: Helper functions and calculator logic.
- `src/content`: MDX content for blog.
"# calcida" 
