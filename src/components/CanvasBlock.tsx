import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { CanvasBlockData } from '../types';

interface CanvasBlockProps {
  block: CanvasBlockData;
  onChange: (id: string, content: string) => void;
  onAISuggest: (id: string) => void;
  isAIAssistantActive: boolean;
  className?: string;
}

export const CanvasBlock: React.FC<CanvasBlockProps> = ({ 
  block, 
  onChange, 
  onAISuggest,
  isAIAssistantActive,
  className
}) => {
  return (
    <section className={cn(
      "p-6 flex flex-col relative group bg-white border-outline-variant/20 transition-all hover:bg-surface-container-lowest/50",
      "border-b last:border-b-0 md:last:border-b-0 min-h-[220px]", // Adjusted for flexible layout and comfortable height
      className
    )}>
      <header className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
            {block.title.includes('·') ? block.title.split('·')[0].trim() : block.title.split('.')[0].trim()}
          </span>
          <span className="text-[0.75rem] font-black tracking-wider text-on-surface uppercase opacity-80">
            {block.title.includes('·')
              ? block.title.split('·').slice(1).join('·').trim()
              : block.title.split('.').slice(1).join('.').trim() || block.title}
          </span>
        </div>
        <p className="text-[0.7rem] text-on-surface-variant leading-relaxed font-medium">
          {block.description}
        </p>
      </header>
      
      <textarea
        className="flex-grow w-full bg-transparent border-none resize-none p-0 mt-2 text-sm leading-relaxed text-on-surface focus:ring-0 focus:outline-none placeholder:text-on-surface-variant/30 font-medium"
        placeholder={block.placeholder}
        value={block.content}
        onChange={(e) => onChange(block.id, e.target.value)}
      />
    </section>
  );
};


