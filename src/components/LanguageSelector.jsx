import { useEffect, useRef, useState } from 'react';
import { useCodeEditorStore } from '../store/useCodeEditorStore';
import { LANGUAGES, LANGUAGE_CONFIG } from '../constants';
import useMounted from '../hooks/useMounted';

function LanguageSelector({ hasAccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useMounted();
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef(null);
  const currentLanguage = LANGUAGE_CONFIG[language];

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
        className="group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
      >
        {/* hover state bg decorator */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-center justify-center w-5 h-5">
          <img src={"/" + language + ".png"} alt={language} className="max-w-full max-h-full" />
        </div>

        <span className="text-gray-300 group-hover:text-white transition-colors min-w-[100px] text-left">
          {currentLanguage.label}
        </span>

        {/* ChevronDown Icon - hardcoded for simplicity */}
        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-300 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95 
          backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
        >
          <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
            <p className="text-xs font-medium text-gray-400 px-2">Select Language</p>
          </div>

          <div className="max-h-[320px] overflow-y-auto">
            {LANGUAGES.map((langKey) => {
              const lang = LANGUAGE_CONFIG[langKey];
              const isLocked = !hasAccess && langKey !== "javascript";

              return (
                <div key={langKey} className="relative px-1 py-0.5">
                  <button
                    onClick={() => {
                      if (!isLocked) {
                        setLanguage(langKey);
                        setIsOpen(false);
                      }
                    }}
                    disabled={isLocked}
                    className={`
                      relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#262637] transition-all duration-200 rounded-lg
                      ${language === langKey ? "bg-blue-500/10 text-blue-400" : "text-gray-300"}
                      ${isLocked ? "cursor-not-allowed opacity-50" : ""}
                    `}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <img src={"/" + langKey + ".png"} alt={lang.label} className="max-w-full max-h-full" />
                    </div>

                    <span className="flex-1 text-left group-hover:text-white transition-colors">
                      {lang.label}
                    </span>

                    {/* selected language border */}
                    {language === langKey && (
                      <div className="absolute inset-0 border-2 border-blue-500/30 rounded-lg" />
                    )}

                    {isLocked ? (
                      // Lock Icon - hardcoded for simplicity
                      <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
                      language === langKey && (
                        // Sparkles Icon - hardcoded for simplicity
                        <svg className="w-4 h-4 text-blue-400 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                          <path d="M5 3v4" />
                          <path d="M19 17v4" />
                          <path d="M3 5h4" />
                          <path d="M17 19h4" />
                        </svg>
                      )
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
