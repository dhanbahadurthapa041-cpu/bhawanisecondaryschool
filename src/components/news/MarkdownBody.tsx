import React from 'react';

interface MarkdownBodyProps {
  content: string;
}

export const MarkdownBody: React.FC<MarkdownBodyProps> = ({ content }) => {
  // Split lines and parse basic markdown structures safely
  const lines = content.split('\n');

  return (
    <div className="prose prose-slate max-w-none space-y-4 text-slate-700 leading-relaxed">
      {lines.map((line, index) => {
        const trimmed = line.trim();

        // Empty line
        if (!trimmed) {
          return <div key={index} className="h-2" />;
        }

        // H3 Header: ### Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={index}
              className="font-heading text-lg sm:text-xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-200"
            >
              {trimmed.replace('### ', '')}
            </h3>
          );
        }

        // H2 Header: ## Heading
        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="font-heading text-xl sm:text-2xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-200"
            >
              {trimmed.replace('## ', '')}
            </h2>
          );
        }

        // H1 Header: # Heading
        if (trimmed.startsWith('# ')) {
          return (
            <h1
              key={index}
              className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 pt-6 pb-2"
            >
              {trimmed.replace('# ', '')}
            </h1>
          );
        }

        // Bullet list item: - Item or * Item
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.substring(2);
          return (
            <li key={index} className="ml-5 list-disc text-sm sm:text-base text-slate-700">
              {renderFormattedText(itemText)}
            </li>
          );
        }

        // Numbered list item: 1. Item
        if (/^\d+\.\s/.test(trimmed)) {
          const itemText = trimmed.replace(/^\d+\.\s/, '');
          return (
            <li key={index} className="ml-5 list-decimal text-sm sm:text-base text-slate-700">
              {renderFormattedText(itemText)}
            </li>
          );
        }

        // Blockquote: > Quote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-amber-500 pl-4 py-1.5 italic text-slate-600 bg-amber-50/50 rounded-r-lg"
            >
              {renderFormattedText(trimmed.replace('> ', ''))}
            </blockquote>
          );
        }

        // Normal paragraph
        return (
          <p key={index} className="text-sm sm:text-base leading-relaxed text-slate-700">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

function renderFormattedText(text: string): React.ReactNode {
  // Parse bold **text** and inline backticks
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
