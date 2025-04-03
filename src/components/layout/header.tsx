"use client";

import clsx from "clsx";
import Link from "next/link";
import ThemeToggle from "@/components/theme/theme-toggle";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { scrollLock } from "@/lib/scroll";
import { usePathname } from "next/navigation";
const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // 当菜单打开时，禁止滚动
  useEffect(() => {
    if (!isOpen) {
      scrollLock.disable();
    } else {
      scrollLock.enable();
    }
  }, [isOpen]);

  return (
    <header className="header">
      <div className="container mx-auto h-14 flex items-center justify-between">
        <div className="px-4 flex items-center justify-center">
          <Link href="/">
            <span className="text-2xl font-bold">XIAOSHEN</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={clsx("header-link relative", {
                "header-link-active": pathname === item.href,
              })}
            >
              {pathname === item.href && (
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

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-4 px-4">
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
                        onClick={() => {
                          setIsOpen(false);
                        }}
                        className={clsx("header-link text-lg", {
                          "header-link-active": pathname === item.href,
                        })}
                      >
                        {item.label}
                      </Link>
                      {pathname === item.href && (
                        <motion.div className="h-0.5 bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
};

export default Header;
