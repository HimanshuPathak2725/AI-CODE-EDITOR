import { useState } from "react";

function CommentForm({ onSubmit, isSubmitting }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="4"
          className="w-full px-4 py-3 bg-[#0a0a0f] border border-[#ffffff0a] focus:border-blue-500 rounded-xl text-white placeholder-gray-500 focus:outline-none resize-none"
          placeholder="Add a comment... (supports markdown code blocks with ```language)"
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
