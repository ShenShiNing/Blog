"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { codeToHtml } from "shiki";
import { useTheme } from "next-themes";

interface CodeProps {
  children: string;
  className?: string;
}

export function CustomCode({ children, className = "" }: CodeProps) {
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

  return (
    <div
      ref={ref}
      dangerouslySetInnerHTML={{ __html: html }}
      className="mt-4 mb-4 border rounded-md overflow-hidden"
    />
  );
}
