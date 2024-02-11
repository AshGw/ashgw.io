'use client';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { FC } from 'react';
import { Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCopyToClipboard } from 'react-use';

interface CopyButtonProps {
  code: string;
  className?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ code, className }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  return (
    <button
      className={cn(
        'rounded-xl border-2 border-[#191919] p-2 px-3 py-2 average-transition  hover:average-translate  hover:border-[#340929]   active:bg-[#340929]',
        className
      )}
      onClick={() => {
        copyToClipboard(code);
      }}
    >
      <AnimatedCopyButton />
    </button>
  );
};

export default CopyButton;

const AnimatedCopyButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`average-transition ${copied ? 'scale-0' : 'scale-100'}`}
    >
      {copied ? <Check /> : <Copy />}
    </button>
  );
};
