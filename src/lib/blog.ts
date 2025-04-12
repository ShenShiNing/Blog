import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Blog } from "@/types/blog";
import { compileMdx } from "@/lib/mdx";

// 博客目录路径
const BLOGS_DIR = path.join(process.cwd(), "src", "content", "blogs");

// 缓存所有 slug，避免重复读取文件系统
const getCachedSlugs = (() => {
  let cachedSlugs: string[] | null = null;
  return () => {
    if (!cachedSlugs) {
      cachedSlugs = fs
        .readdirSync(BLOGS_DIR)
        .filter((filename) => filename.endsWith(".mdx"))
        .map((filename) => filename.replace(/\.mdx$/, ""));
    }
    return cachedSlugs;
  };
})();

// 获取所有博客 slug（用于 generateStaticParams）
export async function getAllBlogSlugs() {
  const slugs = getCachedSlugs();
  return slugs.map((slug) => ({ params: { slug } }));
}

// 获取单个博客数据
export async function getBlogData(slug: string): Promise<Blog> {
  const fullPath = path.join(BLOGS_DIR, `${slug}.mdx`);
  let fileContents: string;

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read file ${slug}.mdx: ${String(error)}`);
  }

  // 解析 frontmatter 和内容
  const { data, content } = matter(fileContents);

  const compiledContent = await compileMdx({ source: content });

  // 构造 Blog 对象
  const blog: Blog = {
    id: data.id as string,
    slug: (data.slug as string) || slug,
    author: data.author as string,
    category: data.category as string,
    title: data.title as string,
    description: data.description as string | undefined,
    tags: data.tags as string[] | undefined,
    coverImage: data.coverImage as string | undefined,
    createdDate: data.createdDate as string,
    updatedDate: data.updatedDate as string | undefined,
    content: compiledContent,
  };

  // 验证必要字段
  const requiredFields: (keyof Blog)[] = [
    "id",
    "author",
    "category",
    "title",
    "createdDate",
  ];
  const missingFields = requiredFields.filter((field) => !blog[field]);
  if (missingFields.length > 0) {
    throw new Error(
      `Post ${slug} is missing required fields: ${missingFields.join(", ")}`
    );
  }

  return blog;
}

// 获取所有博客数据（用于首页列表）
export async function getAllBlogs(): Promise<Blog[]> {
  const slugs = getCachedSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getBlogData(slug);
      } catch (error) {
        console.error(`Failed to load post ${slug}:`, error);
        return null;
      }
    })
  );

  // 过滤并排序
  return posts
    .filter((post): post is Blog => post !== null)
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
}
