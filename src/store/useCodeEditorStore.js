import { create } from 'zustand';

let executionResult = null;

export const getExecutionResult = () => executionResult;

export const useCodeEditorStore = create((set, get) => ({
  language: 'javascript',
  theme: 'vs-dark',
  fontSize: 16,
  isRunning: false,
  editor: null,
  output: '',
  error: '',
  
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setEditor: (editor) => set({ editor }),

  getCode: () => {
    const { editor } = get();
    return editor ? editor.getValue() : '';
  },

  runCode: async () => {
    const { language, editor, setOutput, setError } = get();
    
    if (!editor) return;
    
    const code = editor.getValue();
    
    set({ isRunning: true, output: '', error: '' });
    
    try {
      // API endpoint for code execution
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          version: '0',
          files: [
            {
              content: code,
            },
          ],
        }),
      });
      
      const data = await response.json();
      
      if (data.run.stderr) {
        set({ error: data.run.stderr });
        executionResult = {
          code,
          error: data.run.stderr,
        };
      } else {
        set({ output: data.run.stdout });
        executionResult = {
          code,
          output: data.run.stdout,
        };
      }
    } catch (error) {
      set({ error: error.message || 'Error executing code' });
      executionResult = {
        code,
        error: error.message || 'Error executing code',
      };
    } finally {
      set({ isRunning: false });
    }
  },
  
  setOutput: (output) => set({ output }),
  setError: (error) => set({ error }),
}));