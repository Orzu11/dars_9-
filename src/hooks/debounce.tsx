import { useEffect, useState } from "react";

function debounce(value: string, delay: number) {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounceValue;
}

export default debounce; 





