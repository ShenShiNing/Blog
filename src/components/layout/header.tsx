"use client";

import clsx from "clsx";
import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toggle";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { scrollLock, scrollToSection } from "@/lib/scroll";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { label: "Home", href: "/", sectionId: "hero" },
  { label: "Blog", href: "/blog", sectionId: "blog" },
  { label: "Portfolio", href: "/portfolio", sectionId: "portfolio" },
  { label: "About", href: "/about", sectionId: "about" },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const isHomePage = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 当菜单打开时，禁止滚动
  useEffect(() => {
    if (!isOpen) {
      scrollLock.disable();
    } else {
      scrollLock.enable();
    }
  }, [isOpen]);

  // 监听滚动，检测当前可见的section
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(null);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // 添加一些偏移量，避免过早触发

      // 检查每个section的位置
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        if (!item.sectionId) continue;

        const section = document.getElementById(item.sectionId);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // 如果当前滚动位置在section内，则设置为活跃
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(item.sectionId);
          break;
        }
      }
    };

    // 初始调用一次
    handleScroll();

    // 添加滚动监听
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const handleNavClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    // 如果是首页并且有section ID，滚动到对应位置
    if (isHomePage && item.sectionId) {
      e.preventDefault();
      scrollToSection(item.sectionId);
      setActiveSection(item.sectionId);
      if (isOpen) {
        setIsOpen(false);
      }
    }
  };

  // 检查导航项是否活跃
  const isItemActive = (item: (typeof navItems)[0]) => {
    if (isHomePage) {
      return activeSection === item.sectionId;
    }
    return pathname === item.href;
  };

  return (
    <header className="header">
      <div className="container mx-auto h-14 flex items-center justify-between">
        <div className="px-4 flex items-center justify-center">
          <Link href="/">
            <span className="text-2xl font-bold">XIAOSHEN</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={clsx("header-link relative", {
                  "header-link-active": isItemActive(item),
                })}
                onClick={(e) => handleNavClick(item, e)}
              >
                {isItemActive(item) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="active-section"
                  />
                )}
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <nav className="flex items-center gap-4 px-4">
            <ThemeToggle />
            <motion.div
              key="menu-button"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="mobile-menu"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="mobile-menu"
                >
                  <div className="flex flex-col justify-center items-center gap-8">
                    {navItems.map((item) => (
                      <div key={item.label}>
                        <Link
                          href={item.href}
                          key={item.label}
                          onClick={(e) => {
                            handleNavClick(item, e);
                          }}
                          className={clsx("header-link text-lg", {
                            "header-link-active": isItemActive(item),
                          })}
                        >
                          {item.label}
                        </Link>
                        {isItemActive(item) && (
                          <motion.div className="h-0.5 bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
