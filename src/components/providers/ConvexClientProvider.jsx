"use client";

import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";
import { useState, useEffect } from "react";

function ConvexClientProvider({ children }) {
  const [convexClient, setConvexClient] = useState(null);

  useEffect(() => {
    // Create the client inside useEffect to ensure we're in the browser
    // and have access to environment variables
    const url = process.env.NEXT_PUBLIC_CONVEX_URL || "https://majestic-panda-720.convex.cloud";
    const client = new ConvexReactClient(url);
    setConvexClient(client);
  }, []);

  // Show loading state until client is initialized
  if (!convexClient) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center">
          <div className="size-6 border-2 border-t-blue-500 border-blue-200/30 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Connecting to Convex...</p>
        </div>
      </div>
    );
  }

  return (
    <ConvexProvider client={convexClient}>
      {children}
    </ConvexProvider>
  );
}

export default ConvexClientProvider;