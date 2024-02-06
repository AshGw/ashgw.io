// Ignore typescript errors for now
// @ts-nocheck
import clsx from 'clsx';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import rust from 'react-syntax-highlighter/dist/cjs/languages/prism/rust';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

SyntaxHighlighter.registerLanguage('rust', rust);

cargo.displayName = 'cargo';

cargo.aliases = [];

function cargo(Prism: any) {
  Prism.languages.cargo = {
    builtin: /\b(?:Packaging|Archiving|Compiling|Finished)\b/,
  };
}

SyntaxHighlighter.registerLanguage('cargo', cargo);

interface Props {
  readonly language: string;
  readonly code: string;
  readonly showLineNumbers?: boolean;
  readonly className?: string;
}

export default function CodeBlock({
  code,
  language,
  showLineNumbers,
  className,
}: Props) {
  return (
    <div
      className={clsx('relative rounded !bg-black p-4 shadow-lg', className)}
    >
      <SyntaxHighlighter
        className="!m-0 overflow-auto !p-0 text-sm dark:!bg-black dark:[&>*]:!bg-black"
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        lineNumberStyle={{
          width: '3.25em',
          position: 'sticky',
          left: 0,
          background: 'black',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
