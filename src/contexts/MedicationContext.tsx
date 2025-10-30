import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  MedicationContextType,
  Medication,
  MedicationFormData,
} from "../types";
import { storageService } from "../services/storageService";
import { STORAGE_KEYS } from "../utils/constants";
import { generateId } from "../utils/formatters";
import { useAuth } from "./AuthContext";

const MedicationContext = createContext<MedicationContextType | undefined>(
  undefined
);

interface MedicationProviderProps {
  children: ReactNode;
}

export const MedicationProvider = ({ children }: MedicationProviderProps) => {
  const { currentUser } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load medications for current user
  const loadMedications = () => {
    if (!currentUser) {
      setMedications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const stored = storageService.getItem<Medication[]>(
      STORAGE_KEYS.MEDICATIONS(currentUser)
    );
    setMedications(stored || []);
    setIsLoading(false);
  };

  // Load medications when user changes
  useEffect(() => {
    loadMedications();
  }, []);

  // Add medication
  const addMedication = (data: MedicationFormData) => {
    if (!currentUser) return;

    const newMedication: Medication = {
      id: generateId(),
      name: data.name.trim(),
      dosage: data.dosage.trim(),
      frequency: data.frequency.trim(),
      createdAt: Date.now(),
    };

    const updated = [...medications, newMedication];
    setMedications(updated);
    storageService.setItem(STORAGE_KEYS.MEDICATIONS(currentUser), updated);
  };

  // Remove medication
  const removeMedication = (id: string) => {
    if (!currentUser) return;

    const updated = medications.filter((med) => med.id !== id);
    setMedications(updated);
    storageService.setItem(STORAGE_KEYS.MEDICATIONS(currentUser), updated);
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        addMedication,
        removeMedication,
        isLoading,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
};

// Custom hook to use medication context
export const useMedication = (): MedicationContextType => {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error("useMedication must be used within MedicationProvider");
  }
  return context;
};
