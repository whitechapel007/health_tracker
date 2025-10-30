import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { VitalsContextType, Vitals, VitalsFormData } from "../types";
import { storageService } from "../services/storageService";
import { STORAGE_KEYS } from "../utils/constants";
import { generateId } from "../utils/formatters";
import { useAuth } from "./AuthContext";

const VitalsContext = createContext<VitalsContextType | undefined>(undefined);

interface VitalsProviderProps {
  children: ReactNode;
}

export const VitalsProvider = ({ children }: VitalsProviderProps) => {
  const { currentUser } = useAuth();
  const [vitalsLog, setVitalsLog] = useState<Vitals[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load vitals for current user
  const loadVitals = useCallback(() => {
    if (!currentUser) {
      setVitalsLog([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const stored = storageService.getItem<Vitals[]>(
      STORAGE_KEYS.VITALS(currentUser)
    );
    setVitalsLog(stored || []);
    setIsLoading(false);
  }, [currentUser]);

  // Load vitals when user changes
  useEffect(() => {
    loadVitals();
  }, [loadVitals]);

  // Add vitals entry
  const addVitals = useCallback(
    (data: VitalsFormData) => {
      if (!currentUser) return;

      const newVitals: Vitals = {
        id: generateId(),
        systolic: Number(data.systolic),
        diastolic: Number(data.diastolic),
        heartRate: Number(data.heartRate),
        weight: Number(data.weight),
        timestamp: new Date().toISOString(),
        createdAt: Date.now(),
      };

      // Add to beginning for reverse chronological order
      const updated = [newVitals, ...vitalsLog];
      setVitalsLog(updated);
      storageService.setItem(STORAGE_KEYS.VITALS(currentUser), updated);
    },
    [currentUser, vitalsLog]
  );

  return (
    <VitalsContext.Provider
      value={{
        vitalsLog,
        addVitals,
        isLoading,
      }}
    >
      {children}
    </VitalsContext.Provider>
  );
};

// Custom hook to use vitals context
export const useVitals = (): VitalsContextType => {
  const context = useContext(VitalsContext);
  if (!context) {
    throw new Error("useVitals must be used within VitalsProvider");
  }
  return context;
};
