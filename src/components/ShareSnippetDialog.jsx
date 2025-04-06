import { useCodeEditorStore } from '../store/useCodeEditorStore';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../convex/_generated/api';

function ShareSnippetDialog({ onClose }) {
  const { getCode, language } = useCodeEditorStore();
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const createSnippet = useMutation(api.snippets.create);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const code = getCode();
      await createSnippet({
        title: title || `Untitled ${language.charAt(0).toUpperCase() + language.slice(1)} Snippet`,
        code,
        language,
        isPublic,
        userId: null, // We'll update this with actual user ID when auth is added
      });
      
      // Show success notification
      alert('Snippet shared successfully!');
      onClose();
    } catch (error) {
      console.error('Error sharing snippet:', error);
      alert('Failed to share snippet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#1e1e2e] rounded-xl border border-white/10 shadow-2xl p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300"
        >
          {/* X Icon - hardcoded for simplicity */}
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        
        <h3 className="text-xl font-medium text-white mb-4">Share Code Snippet</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your snippet"
              className="w-full px-4 py-2 bg-[#282a36] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-300">
              Make snippet public
            </label>
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Sharing...' : 'Share Snippet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareSnippetDialog;
