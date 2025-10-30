import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextType } from "../types";
import { storageService } from "../services/storageService";
import { STORAGE_KEYS } from "../utils/constants";
import { useIdleTimer } from "../hooks/useIdleTimer";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return storageService.getItem<string>(STORAGE_KEYS.CURRENT_USER);
  });

  const [showIdleModal, setShowIdleModal] = useState(false);
  const [countdown, setCountdown] = useState(10); // seconds before auto-logout
  const isAuthenticated = currentUser !== null;

  // --- Login / Logout ---
  const login = (username: string) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      setCurrentUser(trimmedUsername);
      storageService.setItem(STORAGE_KEYS.CURRENT_USER, trimmedUsername);
    }
  };

  const logout = () => {
    setShowIdleModal(false);
    setCurrentUser(null);
    storageService.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  // --- Idle Timer Handling ---
  useIdleTimer(() => {
    if (isAuthenticated) {
      setShowIdleModal(true);
      setCountdown(10); // reset countdown each idle trigger
    }
  });

  // --- Countdown Effect ---
  useEffect(() => {
    if (!showIdleModal) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showIdleModal]);

  // --- User Cancels Logout (resets timer) ---
  const handleStayLoggedIn = () => {
    setShowIdleModal(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}

      {/* Auto Logout Modal */}

      <Modal
        title="Auto Logout Warning"
        open={showIdleModal}
        onClose={handleStayLoggedIn}
      >
        <div className="space-y-4 text-center">
          <p className="text-gray-600">
            You’ve been inactive for a while. You’ll be logged out in{" "}
            <span className="font-semibold text-red-500">{countdown}</span>{" "}
            seconds.
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={handleStayLoggedIn}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Stay Logged In
            </Button>
            <Button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Logout Now
            </Button>
          </div>
        </div>
      </Modal>
    </AuthContext.Provider>
  );
};

// --- Custom hook ---
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
