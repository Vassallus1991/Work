
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-2 border-slate-900 rounded-2xl mb-6 overflow-hidden bg-white shadow-xl transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl">{icon}</span>
          <span className="font-black text-slate-900 text-lg uppercase tracking-tight italic">{title}</span>
        </div>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 transition-transform ${isOpen ? 'rotate-180 bg-yellow-500' : ''}`}>
          <svg
            className={`w-5 h-5 ${isOpen ? 'text-white' : 'text-slate-400'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isOpen && (
        <div className="p-6 border-t-2 border-slate-900 bg-white animate-in slide-in-from-top-4 duration-500">
          {children}
        </div>
      )}
    </div>
  );
};
