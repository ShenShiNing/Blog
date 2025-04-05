// src/store/blog.ts
import { create } from "zustand";
import { Blog } from "@/types/blog";

interface BlogState {
  blogs: Blog[]; // 所有博客数据
  filteredBlogs: Blog[]; // 过滤后的博客数据
  selectedCategory: string | ""; // 当前选中的分类
  searchQuery: string; // 搜索查询
  setBlogs: (blogs: Blog[]) => void; // 初始化博客数据
  setCategory: (category: string | "") => void; // 设置分类
  setSearch: (query: string) => void; // 设置搜索查询
  filterBlogs: () => void; // 过滤博客
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  filteredBlogs: [],
  selectedCategory: "",
  searchQuery: "",

  setBlogs: (blogs) => {
    set({ blogs, filteredBlogs: blogs });
    get().filterBlogs(); // 初始化时应用过滤
  },

  setCategory: (category) => {
    set({ selectedCategory: category });
    get().filterBlogs();
  },

  setSearch: (query) => {
    set({ searchQuery: query });
    get().filterBlogs();
  },

  filterBlogs: () => {
    const { blogs, selectedCategory, searchQuery } = get();
    let result = [...blogs];

    // 应用分类过滤
    if (selectedCategory) {
      result = result.filter((blog) => blog.category === selectedCategory);
    }

    // 应用搜索过滤
    const trimmedQuery = searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      result = result.filter((blog) =>
        [
          blog.title,
          blog.description,
          blog.author,
          blog.tags?.join(" "),
          blog.content?.toString(),
        ]
          .filter(Boolean)
          .some((field) => field?.toLowerCase().includes(trimmedQuery))
      );
    }

    set({ filteredBlogs: result });
  },
}));
