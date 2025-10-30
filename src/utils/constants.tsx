// LocalStorage keys
export const STORAGE_KEYS = {
  CURRENT_USER: "health-tracker-current-user",
  MEDICATIONS: (username: string) => `medications-${username}`,
  VITALS: (username: string) => `vitals-${username}`,
} as const;

// Idle timeout in milliseconds (10 minutes)
export const IDLE_TIMEOUT = 10 * 60 * 1000;

export const WARNING_INACTIVITY_TIMEOUT_MS = 9 * 60 * 1000;

// Validation constraints
export const VALIDATION = {
  MEDICATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
  },
  VITALS: {
    SYSTOLIC_MIN: 70,
    SYSTOLIC_MAX: 200,
    DIASTOLIC_MIN: 40,
    DIASTOLIC_MAX: 130,
    HEART_RATE_MIN: 40,
    HEART_RATE_MAX: 200,
    WEIGHT_MIN: 0.1,
    WEIGHT_MAX: 500,
  },
} as const;

// Activity events for idle detection
export const ACTIVITY_EVENTS = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "click",
] as const;
