import { useEffect, useState } from "react";
/**
 * Generic debounce hook
 * Delays updating value until user stops typing.
 */
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);
    // Clear timeout if value changes before delay finishes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
