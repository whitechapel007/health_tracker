/**
 * LocalStorage Service (Object Version)
 * Provides safe abstraction for localStorage operations with error handling
 */

export const storageService = {
  /**
   * Check if localStorage is available
   */
  isAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get item from localStorage
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  setItem<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear(): boolean {
    if (!this.isAvailable()) {
      console.warn("localStorage is not available");
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  },
};
