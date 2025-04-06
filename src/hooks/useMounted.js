import { useEffect, useState } from "react";

/**
 * Custom hook to track if component is mounted
 * Useful for preventing hydration errors with server-side rendering
 */
export default function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
