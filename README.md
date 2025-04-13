# Xiaoshen's Personal Blog & Portfolio

This is a personal website project built with [Next.js](https://nextjs.org), bootstrapped using [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It serves as a platform to showcase blog posts and portfolio projects.

## ✨ Features

- **Blog:** Browse articles, filter by category, and search by keywords.
- **Portfolio:** Showcase of personal projects with details and links.
- **MDX Support:** Blog posts and portfolio details written in MDX for rich content formatting.
- **Responsive Design:** Adapts seamlessly to different screen sizes (desktop, tablet, mobile).
- **Theme Toggling:** Switch between light and dark modes.
- **Syntax Highlighting:** Code blocks in MDX content are beautifully highlighted.
- **State Management:** Uses Zustand for efficient global state management.
- **UI Components:** Built with [shadcn/ui](https://ui.shadcn.com/) for accessible and customizable components.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Content:** [MDX](https://mdxjs.com/) (Markdown with JSX)
- **Syntax Highlighting:** [Shiki](https://shiki.style/) (via `next-mdx-remote` or similar)
- **UI Animation:** [Framer Motion](https://www.framer.com/motion/)

## 📦 Project Structure

```
/public          # Static assets
/src
|-- /app         # Next.js App Router (pages, layouts, API routes)
|-- /components  # Reusable UI components (layout, ui, specific features)
|-- /content     # MDX content files (blogs, portfolios)
|-- /hooks       # Custom React hooks
|-- /lib         # Utility functions, data fetching logic
|-- /modules     # Page sections or larger feature modules
|-- /store       # Zustand state management stores
|-- /styles      # Global styles and Tailwind CSS setup
|-- /types       # TypeScript type definitions
```

## 📝 Content Management

Blog posts and portfolio items are managed as MDX files within the `src/content` directory:

- **Blog Posts:** Located in `src/content/blogs`. Each `.mdx` file represents a blog post. Frontmatter is used for metadata (title, date, tags, category, etc.).
- **Portfolio Items:** Located in `src/content/portfolios`. Each `.mdx` file represents a portfolio item, using frontmatter for details like title, description, tags, images, links, etc.

To add new content, simply create a new `.mdx` file in the appropriate directory and fill in the frontmatter and markdown/JSX content.

## 🏁 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## ☁️ Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
