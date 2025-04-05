import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <main className="main px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/blog">
            <Button size="sm" className="flex items-center">
              <ArrowLeftIcon className="w-3.5 h-3.5" />
              <span>Back to Blog</span>
            </Button>
          </Link>
        </div>

        {/* Header 区块 */}
        <header className="space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {blog.title}
          </h1>
          <p className="text-sm text-muted-foreground">{blog.createdDate}</p>
          {blog.description && (
            <p className="text-base text-muted-foreground">
              {blog.description}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="rounded-xl overflow-hidden mb-10">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </div>
        )}

        {/* Blog Content */}
        <article className="prose dark:prose-invert prose-lg">
          <section>{blog.content}</section>
        </article>
      </div>
    </main>
  );
};

export default BlogDetail;
