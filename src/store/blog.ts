// src/store/blog.ts
import { create } from "zustand";
import { Blog } from "@/types/blog";

interface BlogState {
  blogs: Blog[]; // 所有博客数据
  filteredBlogs: Blog[]; // 过滤后的博客数据
  selectedCategory: string | ""; // 当前选中的分类
  searchQuery: string; // 搜索查询
  selectedBlog: Blog | null; // 当前选中的博客
  isDetailView: boolean; // 是否显示详情视图
  currentPage: number; // 当前页码
  pageSize: number; // 每页显示数量
  setBlogs: (blogs: Blog[]) => void; // 初始化博客数据
  setCategory: (category: string | "") => void; // 设置分类
  setSearch: (query: string) => void; // 设置搜索查询
  filterBlogs: () => void; // 过滤博客
  selectBlog: (blog: Blog) => void; // 选择博客
  clearSelectedBlog: () => void; // 清除选中的博客
  setCurrentPage: (page: number) => void; // 设置当前页码
  setPageSize: (size: number) => void; // 设置每页显示数量
  getPaginatedBlogs: () => Blog[]; // 获取当前页的博客
  getTotalPages: () => number; // 获取总页数
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  filteredBlogs: [],
  selectedCategory: "",
  searchQuery: "",
  selectedBlog: null,
  isDetailView: false,
  currentPage: 1,
  pageSize: 3,

  setBlogs: (blogs) => {
    set({ blogs, filteredBlogs: blogs });
    get().filterBlogs(); // 初始化时应用过滤
  },

  setCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 }); // 切换分类时重置页码
    get().filterBlogs();
  },

  setSearch: (query) => {
    set({ searchQuery: query, currentPage: 1 }); // 搜索时重置页码
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

  selectBlog: (blog) => {
    set({ selectedBlog: blog, isDetailView: true });
  },

  clearSelectedBlog: () => {
    set({ selectedBlog: null, isDetailView: false });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  setPageSize: (size) => {
    set({ pageSize: size, currentPage: 1 }); // 改变每页数量时重置页码
  },

  getPaginatedBlogs: () => {
    const { filteredBlogs, currentPage, pageSize } = get();
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(startIndex, startIndex + pageSize);
  },

  getTotalPages: () => {
    const { filteredBlogs, pageSize } = get();
    return Math.ceil(filteredBlogs.length / pageSize);
  },
}));
