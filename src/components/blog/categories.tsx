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

const categories: Category[] = [
  {
    name: "All Posts",
    value: "",
  },
  {
    name: "Web Design",
    value: "Web Design",
  },
  {
    name: "Development",
    value: "Development",
  },
  {
    name: "Databases",
    value: "Databases",
  },
  {
    name: "Search Engines",
    value: "SEO",
  },
  {
    name: "Marketing",
    value: "Marketing",
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
    <div className="flex flex-col gap-4">
      {/* 移动端布局 */}
      {isMobile && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <SearchInput />
          </div>
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="bg-foreground hover:bg-foreground text-background flex items-center gap-1">
                <FilterIcon className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="text-center">
              <DrawerHeader>
                <DrawerTitle>Categories</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col px-4 gap-4">
                {categories.map((category, index) => (
                  <Button
                    key={category.name}
                    ref={(el) => {
                      drawerTabsRef.current[index] = el;
                    }}
                    className={clsx(
                      "rounded-md py-3 bg-background text-foreground",
                      {
                        "bg-foreground text-background":
                          selectedCategory === category.value,
                      }
                    )}
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
      )}

      {/* 桌面端布局 */}
      {!isMobile && (
        <div className="flex items-center justify-around bg-foreground text-sm rounded-md p-4 shadow-lg w-full relative">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={clsx(
                "text-background rounded-md px-4 py-2 cursor-pointer z-10",
                {
                  "text-foreground": selectedCategory === category.value,
                }
              )}
              onClick={() => handleCategoryClick(category.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}

          {/* 滑动的desktop active指示器 */}
          <motion.div
            className="absolute bg-background rounded-md h-10 z-0"
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
          <span className="text-xl font-medium text-background">|</span>

          {/* search */}
          <SearchInput />
        </div>
      )}
    </div>
  );
};

export default Categories;
