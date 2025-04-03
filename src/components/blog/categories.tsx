"use client";

import { clsx } from "clsx";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { FilterIcon } from "lucide-react";
import SearchInput from "@/components/blog/search-input";
import { Blog } from "@/types/blog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const categories = [
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

const Categories = ({
  onCategoryChange,
  blogsList,
  handleSearchResults,
}: {
  onCategoryChange: (category: string) => void;
  blogsList: Blog[];
  handleSearchResults: (results: Blog[]) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabStyle, setActiveTabStyle] = useState({
    left: 0,
    width: 0,
  });
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const drawerTabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  // 使用useCallback包装计算指示器位置的函数
  const updateIndicatorPosition = useCallback(() => {
    const index = categories.findIndex((cat) => cat.value === selectedCategory);
    const selectedTab = tabsRef.current[index];

    if (selectedTab) {
      const { offsetLeft, offsetWidth } = selectedTab;
      setActiveTabStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [selectedCategory, tabsRef]);

  // 更新active指示器的位置
  useEffect(() => {
    updateIndicatorPosition();
  }, [updateIndicatorPosition]);

  // 监听窗口尺寸变化
  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition();
    };

    // 添加防抖以提高性能
    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);

    // 初始状态下延迟运行一次以确保DOM完全加载
    const initialTimer = setTimeout(updateIndicatorPosition, 50);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(initialTimer);
      clearTimeout(resizeTimer);
    };
  }, [updateIndicatorPosition]);

  return (
    <div className="flex flex-col gap-4">
      {/* 移动端搜索和过滤 */}
      <div className="flex items-center justify-between gap-2 md:hidden">
        <div className="flex-1">
          <SearchInput
            blogs={blogsList}
            onSearchResults={handleSearchResults}
            isMobile={true}
          />
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

      {/* desktop 过滤 */}
      <div className="hidden md:flex items-center justify-around bg-foreground text-sm rounded-md p-4 shadow-lg w-full relative">
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
        <SearchInput blogs={blogsList} onSearchResults={handleSearchResults} />
      </div>
    </div>
  );
};

export default Categories;
