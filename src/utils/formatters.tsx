/**
 * Format date to readable string
 */
export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("en-US", options);
};

/**
 * Format blood pressure reading
 */
export const formatBloodPressure = (
  systolic: number,
  diastolic: number
): string => {
  return `${systolic}/${diastolic} mmHg`;
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatMedicationDate = (dateString: number): string => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  // Format for older dates: e.g., Oct 15, 2025
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
