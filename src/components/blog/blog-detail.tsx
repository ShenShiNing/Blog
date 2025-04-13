import { Blog } from "@/types/blog";
import Image from "next/image";
import { CalendarIcon, UserIcon, TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

interface BlogDetailProps {
  blog: Blog;
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <article className="blog-detail">
      {/* 博客头部信息 */}
      <motion.header
        className="blog-detail-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="blog-detail-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {blog.title}
        </motion.h1>

        {/* 博客元信息 */}
        <motion.div
          className="blog-detail-meta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="blog-detail-meta-item">
            <UserIcon className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>

          <div className="blog-detail-meta-item">
            <CalendarIcon className="h-4 w-4" />
            <span>{blog.createdDate}</span>
          </div>

          <div className="blog-detail-meta-item">
            <span className="font-medium">{blog.category}</span>
          </div>
        </motion.div>

        {/* 描述 */}
        {blog.description && (
          <motion.p
            className="blog-detail-description"
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
          className="blog-detail-cover"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="blog-detail-cover-container">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="blog-detail-cover-image"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* 标签 */}
      {blog.tags && blog.tags.length > 0 && (
        <motion.div
          className="blog-detail-tags"
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
              <Badge className="blog-detail-tag">
                <TagIcon className="h-3 w-3" />
                {tag}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 博客内容 */}
      <motion.div
        className="blog-detail-content"
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
