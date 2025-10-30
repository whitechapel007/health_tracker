import { useState, ChangeEvent, FormEvent } from "react";
import { FormErrors } from "../types";

/**
 * Custom hook for form handling
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate: (values: T) => FormErrors<T>,
  onSubmit: (values: T) => void
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle input blur
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field
    const fieldErrors = validate(values);
    if (fieldErrors[name as keyof T]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof T],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const validationErrors = validate(values);
    setErrors(validationErrors);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // If no errors, submit
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
