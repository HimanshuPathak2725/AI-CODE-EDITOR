import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
// Import your pages from the correct paths
import HomePage from "./pages/HomePage";
import SnippetsPage from "./app/snippets/page";
import SnippetDetailPage from "./app/snippets/$id/page";
import PricingPage from "./app/pricing/page";
import ProfilePage from "./app/profile/page";

function App() {
  return (
    <div className="antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/snippets" element={<SnippetsPage />} />
        <Route path="/snippets/:id" element={<SnippetDetailPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;