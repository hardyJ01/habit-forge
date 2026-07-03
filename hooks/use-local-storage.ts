"use client";

import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  // Read data on client mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setState(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading LocalStorage key "${key}":`, error);
    }
  }, [key]);

  // Sync mutations back to local disk
  const setLocalStorageState = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting LocalStorage key "${key}":`, error);
    }
  };

  return [state, setLocalStorageState];
}