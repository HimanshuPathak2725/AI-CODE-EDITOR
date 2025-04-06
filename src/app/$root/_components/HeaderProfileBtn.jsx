import { Code2 } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 border border-gray-800 transition-all duration-300">
      <Code2 className="w-4 h-4" />
      <span className="text-sm font-medium">Editor</span>
    </div>
  );
}
export default HeaderProfileBtn;
