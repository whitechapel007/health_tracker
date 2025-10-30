import { useEffect, useRef, useCallback } from "react";
import { ACTIVITY_EVENTS, IDLE_TIMEOUT } from "../utils/constants";

/**
 * Custom hook to detect user inactivity (browser-safe, TS-safe)
 *
 * @param onIdle - Callback fired when user becomes idle
 * @param timeout - Optional custom idle timeout (ms)
 */
export const useIdleTimer = (
  onIdle: () => void,
  timeout: number = IDLE_TIMEOUT
) => {
  // Use `ReturnType<typeof setTimeout>` — works in both browser and Node environments
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset the idle timer
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onIdle();
    }, timeout);
  }, [onIdle, timeout]);

  useEffect(() => {
    resetTimer();

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [resetTimer]);
};
