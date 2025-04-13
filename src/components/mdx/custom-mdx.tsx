import Image from "next/image";
import React from "react";
import { CustomCode } from "./custom-code";

export const customComponents = {
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a
      href={props.href}
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors break-words"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {props.children}
    </a>
  ),
  img: (props: React.HTMLProps<HTMLImageElement>) => (
    <Image
      src={props.src || ""}
      alt={props.alt || ""}
      className="rounded-lg my-8 w-full max-w-2xl mx-auto object-contain shadow-md"
      width={800}
      height={500}
    />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary/50 bg-muted/30 pl-6 py-3 my-6 italic text-muted-foreground">
      {props.children}
    </blockquote>
  ),
  code: (props: React.HTMLProps<HTMLElement>) => {
    const { className, children } = props;
    if (!className) {
      return (
        <code className="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm break-words">
          {children}
        </code>
      );
    }
    return <>{children}</>;
  },
  pre: (props: React.HTMLProps<HTMLPreElement>) => {
    const child = React.Children.only(props.children) as React.ReactElement<
      React.HTMLProps<HTMLElement>
    >;
    const codeProps = child.props;
    const codeContent = codeProps.children;

    if (typeof codeContent !== "string") {
      console.error("Code block content is not a string:", codeContent);
      return (
        <div className="my-8 text-red-500">
          Error: Code block content must be a string.
        </div>
      );
    }

    return (
      <div className="my-8 relative group">
        <CustomCode className={codeProps.className || ""}>
          {codeContent}
        </CustomCode>
      </div>
    );
  },
};
