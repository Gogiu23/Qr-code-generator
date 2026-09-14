import type { ReactNode } from "react";
import Link from "next/link";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

/**
 * Mini-markdown inline: **negrita**, *cursiva* y [texto](href). Los links que
 * empiezan con "/" usan next/link; el resto (https://...) son <a> externos.
 */
export function renderInline(text: string): ReactNode[] {
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      parts.push(<em key={key++}>{match[2]}</em>);
    } else {
      const href = match[4];
      const label = match[3];
      if (href.startsWith("/")) {
        parts.push(
          <Link key={key++} href={href} className="underline">
            {label}
          </Link>,
        );
      } else {
        parts.push(
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {label}
          </a>,
        );
      }
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={i} className="text-lg font-semibold mt-8 mb-2">
                {renderInline(block.text)}
              </h2>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-5 mb-4 space-y-2">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-5 mb-4 space-y-2">
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "p":
          default:
            return (
              <p key={i} className="mb-4">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </>
  );
}
