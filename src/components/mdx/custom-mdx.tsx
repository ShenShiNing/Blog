export const customComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {props.children}
    </h1> // 应用 Tailwind 样式
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {props.children}
    </h2> // 适用于段落
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3> // 适用于段落
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {props.children}
    </h4> // 适用于段落
  ),
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="leading-7 mt-4 mb-4">{props.children}</p> // 适用于段落
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="mt-4 mb-4 border-l-2 pl-6 italic">
      {props.children}
    </blockquote> // 适用于引用
  ),
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <table className="w-full">{props.children}</table> // 适用于表格
  ),
  tr: (props: React.HTMLProps<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-muted">{props.children}</tr> // 适用于表格行
  ),
  th: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
      {props.children}
    </th> // 适用于表格头
  ),
  td: (props: React.HTMLProps<HTMLTableCellElement>) => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
      {props.children}
    </td> // 适用于表格单元格
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{props.children}</ul> // 适用于无序列表
  ),
  ol: (props: React.HTMLProps<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{props.children}</ol> // 适用于有序列表
  ),

  small: (props: React.HTMLProps<HTMLElement>) => (
    <small className="text-sm font-medium leading-none">{props.children}</small>
  ),
};
