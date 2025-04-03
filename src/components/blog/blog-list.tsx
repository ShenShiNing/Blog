"use client";

import { Blog } from "@/types/blog";
import BlogCard from "@/components/blog/blog-card";
import Categories from "@/components/blog/categories";
import { useState } from "react";

const blogsList: Blog[] = [
  {
    id: "1",
    author: "John Doe",
    createdDate: "2025-01-01",
    title: "Web Design Trends",
    description: "Latest design techniques...",
    category: "Web Design",
    tags: ["web-design"],
    content: "详细探讨了当前流行的网页设计趋势和技术...",
  },
  {
    id: "2",
    author: "Jane Smith",
    createdDate: "2025-01-02",
    title: "React Server Components",
    description: "How to use RSC in Next.js 13...",
    category: "Development",
    tags: ["development", "react", "nextjs"],
    content:
      "详细介绍了React Server Components的工作原理和在Next.js中的应用...",
  },
  {
    id: "3",
    author: "Mike Johnson",
    createdDate: "2025-01-03",
    title: "Database Optimization",
    description: "Speed up queries...",
    category: "Databases",
    tags: ["databases", "performance"],
    content: "提供了数据库查询优化的实用技巧和最佳实践...",
  },
  {
    id: "4",
    author: "Sarah Lee",
    createdDate: "2025-01-04",
    title: "SEO in 2024",
    description: "Boost your website ranking...",
    category: "SEO",
    tags: ["seo", "marketing"],
    content: "分析了2024年搜索引擎优化的最新趋势和算法变化...",
  },
  {
    id: "5",
    author: "John Doe",
    createdDate: "2025-01-05",
    title: "Marketing Strategies",
    description: "Growth hacking tips...",
    category: "Marketing",
    tags: ["marketing", "growth"],
    content: "分享了一系列有效的市场增长策略和案例研究...",
  },
  {
    id: "6",
    author: "Emily Chen",
    createdDate: "2025-01-06",
    title: "Mobile Design Principles",
    description: "Create better mobile experiences...",
    category: "Web Design",
    tags: ["web-design", "mobile", "ui-ux"],
    content: "探讨了移动设备设计的关键原则和用户体验优化方法...",
  },
];

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>(blogsList);

  const onCategoryChange = (category: string) => {
    setSelectedCategory(category);

    // 当分类改变时，先应用分类过滤，然后显示结果
    const filtered = category
      ? blogsList.filter((blog) => blog.category === category)
      : blogsList;

    setDisplayedBlogs(filtered);
  };

  const handleSearchResults = (results: Blog[]) => {
    // 如果已选择了分类，则在搜索结果中再次应用分类过滤
    if (selectedCategory) {
      setDisplayedBlogs(
        results.filter((blog) => blog.category === selectedCategory)
      );
    } else {
      setDisplayedBlogs(results);
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <Categories
        onCategoryChange={onCategoryChange}
        handleSearchResults={handleSearchResults}
        blogsList={blogsList}
      />

      {displayedBlogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-foreground">No blogs found...</p>
        </div>
      ) : (
        <BlogCard blogs={displayedBlogs} />
      )}
    </div>
  );
};

export default BlogList;
