// Core data models
export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: number;
}

export interface Vitals {
  id: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  weight: number;
  timestamp: string;
  createdAt: number;
}

export interface User {
  username: string;
}

// Form data types
export interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: string;
}

export interface VitalsFormData {
  systolic: string;
  diastolic: string;
  heartRate: string;
  weight: string;
}

// Validation error types

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

// Context types
export interface AuthContextType {
  currentUser: string | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
}

export interface MedicationContextType {
  medications: Medication[];
  addMedication: (medication: MedicationFormData) => void;
  removeMedication: (id: string) => void;
  isLoading: boolean;
}

export interface VitalsContextType {
  vitalsLog: Vitals[];
  addVitals: (vitals: VitalsFormData) => void;
  isLoading: boolean;
}
