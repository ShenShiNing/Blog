import Image from "next/image";
import React from "react";
import { CustomCode } from "./custom-code";

export const customComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-10 pb-2 border-b">
      {props.children}
    </h1>
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mt-12 mb-6 pb-2 border-b first:mt-0">
      {props.children}
    </h2>
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-5">
      {props.children}
    </h3>
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-8 mb-4">
      {props.children}
    </h4>
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <div className="leading-relaxed text-base my-6 [&:not(:first-child)]:mt-6">
      {props.children}
    </div>
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary/50 bg-muted/30 pl-6 py-3 my-6 italic text-muted-foreground">
      {props.children}
    </blockquote>
  ),
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
    />
  ),
  hr: () => <hr className="my-12 border-border/50" />,
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto border rounded-lg">
      <table className="w-full min-w-[600px]">{props.children}</table>
    </div>
  ),
  tr: (props: React.HTMLProps<HTMLTableRowElement>) => (
    <tr className="m-0 border-t border-border/50 p-0 transition-colors hover:bg-muted/50">
      {props.children}
    </tr>
  ),
  th: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <th className="border-b border-border/50 px-4 py-3 text-left font-semibold text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right">
      {props.children}
    </th>
  ),
  td: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <td className="px-4 py-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {props.children}
    </td>
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc space-y-2 pl-4">{props.children}</ul>
  ),
  ol: (props: React.HTMLProps<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal space-y-2 pl-4">{props.children}</ol>
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => (
    <li className="leading-relaxed">{props.children}</li>
  ),
  small: (props: React.HTMLProps<HTMLElement>) => (
    <small className="text-sm font-medium leading-none text-muted-foreground">
      {props.children}
    </small>
  ),
  code: (props: React.HTMLProps<HTMLElement>) => {
    const { className, children } = props;
    if (!className) {
      return (
        <code className="relative rounded bg-foreground px-[0.4rem] py-[0.2rem] font-mono text-sm text-background break-words">
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
