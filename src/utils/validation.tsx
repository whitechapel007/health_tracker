import { MedicationFormData, VitalsFormData, FormErrors, User } from "../types";
import { VALIDATION } from "./constants";

/**
 * Validate medication form data
 */
export const validateMedication = (
  data: MedicationFormData
): FormErrors<MedicationFormData> => {
  const errors: FormErrors<MedicationFormData> = {};

  // Validate name
  if (!data.name.trim()) {
    errors.name = "Medication name is required";
  } else if (data.name.trim().length < VALIDATION.MEDICATION.NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.MEDICATION.NAME_MIN_LENGTH} characters`;
  } else if (data.name.trim().length > VALIDATION.MEDICATION.NAME_MAX_LENGTH) {
    errors.name = `Name must be less than ${VALIDATION.MEDICATION.NAME_MAX_LENGTH} characters`;
  }

  // Validate dosage
  if (!data.dosage.trim()) {
    errors.dosage = "Dosage is required";
  }

  // Validate frequency
  if (!data.frequency.trim()) {
    errors.frequency = "Frequency is required";
  }

  return errors;
};

/**
 * Validate vitals form data
 */
export const validateVitals = (
  data: VitalsFormData
): FormErrors<VitalsFormData> => {
  const errors: FormErrors<VitalsFormData> = {};

  // Validate systolic
  const systolic = Number(data.systolic);
  if (!data.systolic.trim()) {
    errors.systolic = "Systolic pressure is required";
  } else if (isNaN(systolic)) {
    errors.systolic = "Must be a valid number";
  } else if (
    systolic < VALIDATION.VITALS.SYSTOLIC_MIN ||
    systolic > VALIDATION.VITALS.SYSTOLIC_MAX
  ) {
    errors.systolic = `Must be between ${VALIDATION.VITALS.SYSTOLIC_MIN} and ${VALIDATION.VITALS.SYSTOLIC_MAX}`;
  }

  // Validate diastolic
  const diastolic = Number(data.diastolic);
  if (!data.diastolic.trim()) {
    errors.diastolic = "Diastolic pressure is required";
  } else if (isNaN(diastolic)) {
    errors.diastolic = "Must be a valid number";
  } else if (
    diastolic < VALIDATION.VITALS.DIASTOLIC_MIN ||
    diastolic > VALIDATION.VITALS.DIASTOLIC_MAX
  ) {
    errors.diastolic = `Must be between ${VALIDATION.VITALS.DIASTOLIC_MIN} and ${VALIDATION.VITALS.DIASTOLIC_MAX}`;
  }

  // Validate heart rate
  const heartRate = Number(data.heartRate);
  if (!data.heartRate.trim()) {
    errors.heartRate = "Heart rate is required";
  } else if (isNaN(heartRate)) {
    errors.heartRate = "Must be a valid number";
  } else if (
    heartRate < VALIDATION.VITALS.HEART_RATE_MIN ||
    heartRate > VALIDATION.VITALS.HEART_RATE_MAX
  ) {
    errors.heartRate = `Must be between ${VALIDATION.VITALS.HEART_RATE_MIN} and ${VALIDATION.VITALS.HEART_RATE_MAX}`;
  }

  // Validate weight
  const weight = Number(data.weight);
  if (!data.weight.trim()) {
    errors.weight = "Weight is required";
  } else if (isNaN(weight)) {
    errors.weight = "Must be a valid number";
  } else if (
    weight < VALIDATION.VITALS.WEIGHT_MIN ||
    weight > VALIDATION.VITALS.WEIGHT_MAX
  ) {
    errors.weight = `Must be between ${VALIDATION.VITALS.WEIGHT_MIN} and ${VALIDATION.VITALS.WEIGHT_MAX}`;
  }

  return errors;
};

export const validateLogin = (data: User): FormErrors<User> => {
  const errors: FormErrors<User> = {};
  const trimmed = data.username.trim();

  //  Empty check
  if (!trimmed) {
    errors.username = "Username is required";
    return errors;
  }

  //  Leading or trailing whitespace
  if (data.username !== trimmed) {
    errors.username = "Username cannot start or end with spaces";
    return errors;
  }

  //  Length check
  if (trimmed.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  } else if (trimmed.length > 20) {
    errors.username = "Username cannot exceed 20 characters";
  }

  //  Character restrictions
  if (/[^a-zA-Z0-9_]/.test(trimmed)) {
    errors.username =
      "Username can only contain letters, numbers, and underscores";
  }

  //  No consecutive underscores
  if (/__/.test(trimmed)) {
    errors.username = "Username cannot contain consecutive underscores";
  }

  //  Must start with a letter
  if (!/^[A-Za-z]/.test(trimmed)) {
    errors.username = "Username must start with a letter";
  }

  return errors;
};
