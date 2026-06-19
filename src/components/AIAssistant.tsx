import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit } from 'lucide-react';

interface AIAssistantProps {
  isVisible: boolean;
  onApply: () => void;
  onIgnore: () => void;
  suggestion: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isVisible, onApply, onIgnore, suggestion }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 right-8 w-80 glass p-5 rounded-xl z-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-tertiary-container rounded-lg">
              <BrainCircuit className="w-4 h-4 text-on-tertiary-container" />
            </div>
            <span className="text-xs font-bold tracking-wider text-on-surface">PRECISION ASSISTANT</span>
          </div>
          
          <p className="text-xs text-on-tertiary-container leading-relaxed mb-4">
            {suggestion}
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={onApply}
              className="flex-grow py-2 text-[10px] font-bold uppercase bg-gradient-to-b from-primary-dim to-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Aplicar Sugestão
            </button>
            <button
              onClick={onIgnore}
              className="px-3 py-2 text-[10px] font-bold uppercase text-on-surface bg-surface-container-highest rounded-lg hover:bg-surface-variant transition-colors active:scale-[0.98]"
            >
              Ignorar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
