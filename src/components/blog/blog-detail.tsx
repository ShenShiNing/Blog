import { Blog } from "@/types/blog";
import Image from "next/image";
import { CalendarIcon, UserIcon, ClockIcon, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <article className="mx-auto">
      {/* 博客头部信息 */}
      <motion.header
        className="space-y-5 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {blog.title}
        </motion.h1>

        {/* 博客元信息 */}
        <motion.div
          className="flex flex-wrap gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-1">
            <UserIcon className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>

          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{blog.createdDate}</span>
          </div>

          {blog.readTime && (
            <div className="flex items-center gap-1">
              <ClockIcon className="h-4 w-4" />
              <span>{blog.readTime}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <span className="font-medium">{blog.category}</span>
          </div>
        </motion.div>

        {/* 描述 */}
        {blog.description && (
          <motion.p
            className="text-lg text-muted-foreground font-medium border-l-4 border-primary/70 pl-4 py-2 bg-muted/30 rounded-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {blog.description}
          </motion.p>
        )}
      </motion.header>

      {/* 封面图片 */}
      {blog.coverImage && (
        <motion.div
          className="rounded-xl overflow-hidden mb-10 shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
        </motion.div>
      )}

      {/* 标签 */}
      {blog.tags && blog.tags.length > 0 && (
        <motion.div
          className="mb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {blog.tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <Badge variant="outline" className="flex items-center gap-1">
                <TagIcon className="h-3 w-3" />
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 博客内容 */}
      <motion.div
        className="prose dark:prose-invert prose-lg max-w-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        {blog.content}
      </motion.div>
    </article>
  );
};

export default BlogDetail;
