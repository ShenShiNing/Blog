import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentType, ReactNode } from "react";
import { customComponents } from "@/components/mdx/custom-mdx";
import { CustomCode } from "@/components/mdx/custom-code";

interface CompileMdxOptions {
  source: string;
  components?: Record<string, ComponentType<unknown>>;
}

export async function compileMdx({
  source,
}: CompileMdxOptions): Promise<ReactNode> {
  const result = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        format: "mdx",
      },
    },
    components: {
      code: CustomCode,
      ...customComponents,
    },
  });

  return result.content;
}
