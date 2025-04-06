import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

function CopyButton({ code }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 text-gray-400 hover:text-gray-300 hover:bg-[#ffffff10] rounded-md transition"
      title="Copy code"
    >
      {isCopied ? (
        <CheckIcon className="w-4 h-4 text-green-500" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </button>
  );
}

export default CopyButton;
