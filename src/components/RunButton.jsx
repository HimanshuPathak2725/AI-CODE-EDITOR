import { useCodeEditorStore } from '../store/useCodeEditorStore';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

function RunButton() {
  const { isRunning, runCode } = useCodeEditorStore();
  const recordExecution = useMutation(api.codeExecutions.recordExecution);

  const handleRunCode = async () => {
    const result = await runCode();
    if (result) {
      // Record the execution in Convex
      await recordExecution({
        code: result.code,
        language: result.language,
        output: result.output,
        error: result.error,
        duration: result.duration,
      });
    }
  };

  return (
    <button
      onClick={handleRunCode}
      disabled={isRunning}
      className="relative group flex items-center gap-2.5 px-5 py-2.5 rounded-xl overflow-hidden disabled:opacity-50"
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              {/* Loader2 Icon - hardcoded for simplicity */}
              <svg className="w-4 h-4 animate-spin text-white/70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              {/* Play Icon - hardcoded for simplicity */}
              <svg className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </button>
  );
}

export default RunButton;
