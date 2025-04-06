import { useCodeEditorStore } from '../store/useCodeEditorStore';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import RunButton from './RunButton';

function Header() {
  return (
    <div className="relative z-10">
      <div className="flex items-center lg:justify-between justify-center 
        bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg">
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-3 group relative">
            {/* Logo hover effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl" />

            {/* Logo */}
            <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all">
              <div className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                {/* Blocks Icon - hardcoded for simplicity */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                CodeCrafter
              </span>
              <span className="block text-xs text-blue-400/60 font-medium">
                Interactive Code Editor
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <a
              href="/snippets"
              className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform">
                {/* Code2 Icon - hardcoded for simplicity */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                Snippets
              </span>
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <ThemeSelector />
            {/* All languages are accessible in the simple version */}
            <LanguageSelector hasAccess={true} />
          </div>

          <a
            href="/pricing"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
              to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
              transition-all duration-300"
          >
            <div className="w-4 h-4 text-amber-400 hover:text-amber-300">
              {/* Sparkles Icon - hardcoded for simplicity */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
              Features
            </span>
          </a>

          <RunButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
