import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-[#171717] text-white shadow-xl border border-[#242321] transition-all duration-300"
    >
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-[#D8D1C7] shrink-0" />
      )}
      <span className="text-xs font-medium tracking-wide">{toast.message}</span>
    </div>
  );
};
