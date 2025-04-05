import { getBlogData, getAllBlogSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogDetail from "@/components/blog/blog-detail";
export async function generateStaticParams() {
  return await getAllBlogSlugs();
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// 动态生成页面元数据
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogData(slug);
    return {
      title: `${blog.title} | My Blog`,
      description: blog.description || "Read the latest blog post on My Blog.",
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
      },
    };
  } catch (error) {
    console.error(`Failed to generate metadata for slug ${slug}:`, error);
    return {
      title: "Blog Not Found | My Blog",
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogData(slug);
  } catch (error) {
    console.error(`Failed to load blog for slug ${slug}:`, error);
    notFound();
  }

  return <BlogDetail blog={blog} />;
}
