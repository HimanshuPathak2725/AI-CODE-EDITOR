import React from 'react';
import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import App from "../App";

// Import font styles
import "./fonts.css";

export default function RootLayout() {
  return (
    <ConvexClientProvider>
      <App />
    </ConvexClientProvider>
  );
}