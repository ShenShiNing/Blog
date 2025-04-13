"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import { useState, useRef, useEffect, useCallback } from "react";

import SearchInput from "@/components/blog/search-input";
import { Category } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBlogStore } from "@/store/blog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";

const categories: Category[] = [
  {
    name: "All Posts",
    value: "",
  },
  {
    name: "Frontend",
    value: "Frontend",
  },
  {
    name: "Backend",
    value: "Backend",
  },
  {
    name: "DevOps",
    value: "DevOps",
  },
  {
    name: "Search Engines",
    value: "SEO",
  },
  {
    name: "AI",
    value: "AI",
  },
];

const Categories = () => {
  const isMobile = useIsMobile();
  const { selectedCategory, setCategory } = useBlogStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabStyle, setActiveTabStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const drawerTabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  // 处理分类点击事件
  const handleCategoryClick = useCallback(
    (category: string) => {
      setCategory(category);
      if (isMobile) setIsOpen(false);
    },
    [setCategory, isMobile]
  );

  // 更新指示器位置
  const updateIndicatorPosition = useCallback(() => {
    if (isMobile) return; // 移动端无需指示器
    const index = categories.findIndex(
      (category) => category.value === selectedCategory
    );
    const selectedTab = tabsRef.current[index];
    if (selectedTab) {
      setActiveTabStyle({
        left: selectedTab.offsetLeft,
        width: selectedTab.offsetWidth,
      });
    }
  }, [selectedCategory, isMobile]);

  // 监听分类变化和初次加载
  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  // 监听窗口尺寸变化
  useEffect(() => {
    if (isMobile) return; // 移动端无需监听
    const handleResize = () => {
      const timer = setTimeout(updateIndicatorPosition, 100);
      return () => clearTimeout(timer);
    };
    window.addEventListener("resize", handleResize);
    // 初始状态下延迟运行一次以确保DOM完全加载
    const initialTimer = setTimeout(updateIndicatorPosition, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(initialTimer);
    };
  }, [updateIndicatorPosition, isMobile]);

  return (
    <div className="categories-container">
      {/* 移动端布局 */}
      {isMobile ? (
        <div className="categories-mobile">
          <div className="categories-mobile-header">
            <div className="categories-mobile-search">
              <SearchInput />
            </div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger asChild>
                <Button className="categories-mobile-filter-button">
                  <FilterIcon className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="text-center">
                <DrawerHeader>
                  <DrawerTitle>Categories</DrawerTitle>
                </DrawerHeader>
                <div className="categories-drawer-buttons">
                  {categories.map((category, index) => (
                    <Button
                      key={category.name}
                      ref={(el) => {
                        drawerTabsRef.current[index] = el;
                      }}
                      variant={
                        selectedCategory === category.value
                          ? "default"
                          : "outline"
                      }
                      className="categories-drawer-button"
                      onClick={() => {
                        handleCategoryClick(category.value);
                        setIsOpen(false);
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button>Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>

          {/* 当前选中的分类标签 */}
          {selectedCategory && (
            <div className="categories-mobile-selected">
              <Badge className="categories-mobile-badge">
                <span>
                  Category:{" "}
                  {categories.find((c) => c.value === selectedCategory)?.name}
                </span>
              </Badge>
            </div>
          )}
        </div>
      ) : (
        /* 桌面端布局 */
        <div className="categories-desktop">
          <div className="categories-desktop-container">
            <div className="categories-list">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  className={clsx("category-button", {
                    "category-button-active":
                      selectedCategory === category.value,
                    "category-button-inactive":
                      selectedCategory !== category.value,
                  })}
                  onClick={() => handleCategoryClick(category.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}

              {/* 滑动的active指示器 */}
              <motion.div
                className="category-indicator"
                initial={false}
                animate={{
                  left: activeTabStyle.left,
                  width: activeTabStyle.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                layoutDependency={activeTabStyle}
              />
            </div>

            {/* 分隔线 */}
            <div className="categories-divider" />

            {/* 搜索 */}
            <div className="categories-search">
              <SearchInput />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
