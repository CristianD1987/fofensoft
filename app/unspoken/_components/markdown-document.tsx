import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-serif mt-12 border-t border-cream-border pt-12 text-2xl tracking-tight text-ink sm:text-3xl first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif mt-8 text-xl text-ink sm:text-2xl">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-[1.6] text-ink-secondary sm:text-lg">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-[1.6] text-ink-secondary sm:text-lg">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-[1.6] text-ink-secondary sm:text-lg">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => (
    <strong className="font-medium text-ink">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ink underline decoration-cream-border underline-offset-4 transition-colors hover:text-accent-warm"
    >
      {children}
    </a>
  ),
};

export function MarkdownDocument({ source }: { source: string }) {
  return (
    <article className="legal-prose mx-auto max-w-[45rem]">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {source}
      </ReactMarkdown>
    </article>
  );
}
