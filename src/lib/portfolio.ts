import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Portfolio } from "@/types/portfolio";
import { compileMdx } from "@/lib/mdx";

// 作品集目录路径
const PORTFOLIOS_DIR = path.join(process.cwd(), "src", "content", "portfolios");

// 缓存所有 slug，避免重复读取文件系统
const getCachedSlugs = (() => {
  let cachedSlugs: string[] | null = null;
  return () => {
    if (!cachedSlugs) {
      cachedSlugs = fs
        .readdirSync(PORTFOLIOS_DIR)
        .filter((filename) => filename.endsWith(".mdx"))
        .map((filename) => filename.replace(/\.mdx$/, ""));
    }
    return cachedSlugs;
  };
})();

// 获取所有作品集 slug（用于 generateStaticParams）
export async function getAllPortfolioSlugs() {
  const slugs = getCachedSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

// 获取单个作品数据
export async function getPortfolioData(slug: string): Promise<Portfolio> {
  const fullPath = path.join(PORTFOLIOS_DIR, `${slug}.mdx`);
  let fileContents: string;

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read file ${slug}.mdx: ${String(error)}`);
  }

  // 解析 frontmatter 和内容
  const { data, content } = matter(fileContents);

  const compiledContent = await compileMdx({ source: content });

  // 构造 Portfolio 对象
  const portfolio: Portfolio = {
    id: data.id as string,
    slug: slug,
    title: data.title as string,
    shortDescription: data.shortDescription as string,
    description: (data.description as string) || "",
    coverImage: data.coverImage as string,
    tags: data.tags as string[],
    features: data.features as string[] | undefined,
    images: data.images as string[] | undefined,
    liveUrl: data.liveUrl as string | undefined,
    githubUrl: data.githubUrl as string | undefined,
    date: data.date as string,
    content: compiledContent,
  };

  // 验证必要字段
  const requiredFields: (keyof Portfolio)[] = [
    "id",
    "title",
    "shortDescription",
    "coverImage",
    "tags",
    "date",
  ];
  const missingFields = requiredFields.filter((field) => !portfolio[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Portfolio ${slug} is missing required fields: ${missingFields.join(", ")}`
    );
  }

  return portfolio;
}

// 获取所有作品数据
export async function getAllPortfolios(): Promise<Portfolio[]> {
  const slugs = getCachedSlugs();

  const portfolios = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getPortfolioData(slug);
      } catch (error) {
        console.error(`Failed to load portfolio ${slug}:`, error);
        return null;
      }
    })
  );

  // 过滤并排序（按日期倒序）
  return portfolios
    .filter((portfolio): portfolio is Portfolio => portfolio !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
