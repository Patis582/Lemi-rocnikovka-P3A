import { useState, useEffect, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isFirstRender = useRef(true);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp < 3 * 60 * 60 * 1000) {
          setStoredValue(parsed.value);
        } else {
          window.localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error("Chyba při načítání z localStorage:", error);
    } finally {
      isFirstRender.current = false;
    }
  }, [key]);

  useEffect(() => {
    if (isFirstRender.current) return;

    try {
      const dataToStore = {
        value: storedValue,
        timestamp: Date.now(),
      };
      window.localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Chyba při ukládání do localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}