import { useState } from "react";
import { storageService } from "../services/storageService";

/**
 * Custom hook for managing localStorage with React state
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storageService.getItem<T>(key);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      storageService.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // Function to remove the value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      storageService.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};
