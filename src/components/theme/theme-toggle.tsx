"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 确保组件只在客户端渲染
  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  // 在客户端渲染前返回一个占位符
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <MoonIcon className="h-[1.2rem] w-[1.2rem] text-muted-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};

export default ThemeToggle;
