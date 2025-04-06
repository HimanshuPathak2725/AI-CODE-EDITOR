import React from "react";
import NavigationHeader from "../components/NavigationHeader";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Lightbulb, Zap } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <NavigationHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text mb-6">
            Code. Share. Learn.
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            An interactive code editor for creating, sharing and exploring code snippets across multiple programming languages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/snippets"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all flex items-center gap-2"
            >
              Browse Snippets <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all"
            >
              Create Code <Code className="w-4 h-4 inline ml-2" />
            </Link>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="bg-blue-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Interactive Editor</h2>
            <p className="text-gray-300">
              Powerful Monaco-based editor with syntax highlighting and autocompletion for multiple languages.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="bg-purple-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Code Execution</h2>
            <p className="text-gray-300">
              Run your code instantly to see results. Support for JavaScript, Python, Java and more.
            </p>
          </div>
          
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
            <div className="bg-amber-500/10 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-3">Community Sharing</h2>
            <p className="text-gray-300">
              Share your code snippets with others, add comments, and learn from the community.
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 sm:p-12 rounded-2xl border border-blue-500/20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to start coding?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Join our community and start creating your own code snippets today.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default HomePage;