"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const [year, setYear] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  const footerLinks = [
    {
      href: "https://beian.mps.gov.cn/#/query/webSearch?code=52060202000576",
      label: "贵公网安备52060202000576号",
      icon: "/images/BAIcon.png",
      target: "_blank",
    },
    {
      href: "https://beian.miit.gov.cn",
      label: "黔ICP备2025044906号",
      target: "_blank",
    },
    {
      label: `© ${year} SSN 版权所有`,
    },
  ];

  return (
    <div className="w-full border-t border-dashed h-14 py-4">
      <footer className="footer">
        <div className="footer-link-wrapper">
          {footerLinks.map((link, index) => (
            <div key={link.label} className="flex items-center gap-2">
              {link.icon && (
                <Image
                  src={link.icon}
                  alt="公安备案"
                  className="w-4 h-4"
                  width={16}
                  height={16}
                />
              )}
              {link.href ? (
                <Link
                  href={link.href}
                  target={link.target}
                  className="hover:text-foreground"
                >
                  {link.label}
                </Link>
              ) : (
                <span>{link.label}</span>
              )}
              {index < footerLinks.length - 1 && !isMobile && (
                <span className="text-muted-foreground/50">|</span>
              )}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
