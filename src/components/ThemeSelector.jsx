import { useEffect, useRef, useState } from 'react';
import { useCodeEditorStore } from '../store/useCodeEditorStore';
import { THEMES } from '../constants';
import useMounted from '../hooks/useMounted';

// Theme icons using hardcoded SVG for simplicity
const THEME_ICONS = {
  'vs-dark': (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  'vs-light': (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  ),
  'github-dark': (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  'monokai': (
    <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <path d="M12 6v4" />
      <path d="M12 14h.01" />
    </svg>
  ),
};

function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { theme, setTheme } = useCodeEditorStore();
  const dropdownRef = useRef(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-48 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
      >
        {/* hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Palette Icon - hardcoded for simplicity */}
        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" />
          <circle cx="17.5" cy="10.5" r=".5" />
          <circle cx="8.5" cy="7.5" r=".5" />
          <circle cx="6.5" cy="12.5" r=".5" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>

        <span className="text-gray-300 min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentTheme?.label}
        </span>

        {/* color indicator */}
        <div
          className="relative w-4 h-4 rounded-full border border-gray-600 group-hover:border-gray-500 transition-colors"
          style={{ background: currentTheme?.color }}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95 
          backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
        >
          <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
            <p className="text-xs font-medium text-gray-400 px-2">Select Theme</p>
          </div>

          {THEMES.map((t, index) => (
            <button
              key={t.id}
              className={`
                relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#262637] transition-all duration-200
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
              `}
              onClick={() => setTheme(t.id)}
            >
              {/* bg gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 
                group-hover:opacity-100 transition-opacity"
              />

              {/* icon */}
              <div
                className={`
                flex items-center justify-center size-8 rounded-lg
                ${theme === t.id ? "bg-blue-500/10 text-blue-400" : "bg-gray-800/50 text-gray-400"}
                group-hover:scale-110 transition-all duration-200
              `}
              >
                {THEME_ICONS[t.id] || (
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.93 4.93 14.14 14.14" />
                  </svg>
                )}
              </div>
              {/* label */}
              <span className="flex-1 text-left group-hover:text-white transition-colors">
                {t.label}
              </span>

              {/* color indicator */}
              <div
                className="relative size-4 rounded-full border border-gray-600 
                group-hover:border-gray-500 transition-colors"
                style={{ background: t.color }}
              />

              {/* active theme border */}
              {theme === t.id && (
                <div className="absolute inset-0 border-2 border-blue-500/30 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;
