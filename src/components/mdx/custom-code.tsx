"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "next-themes";

interface CodeProps {
  children: string;
  className: string;
}

export function CustomCode({ children, className = "" }: CodeProps) {
  console.log("className :", className);

  const { theme } = useTheme();
  const resolvedTheme = useMemo(
    () => (theme === "dark" ? "github-dark-default" : "github-light-default"),
    [theme]
  );

  const lang = useMemo(() => {
    if (className.startsWith("language-")) {
      return className.replace("language-", "");
    }
    return "tsx";
  }, [className]);

  const [html, setHtml] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const generatedHtml = await codeToHtml(children.trim(), {
        lang,
        theme: resolvedTheme,
      });
      if (isMounted) setHtml(generatedHtml);
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [children, lang, resolvedTheme]);

  if (!className) {
    return (
      <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm text-foreground break-words">
        {children}
      </code>
    );
  }

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
