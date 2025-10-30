import LoginForm from "../components/auth/LoginForm";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../contexts/AuthContext";
import { MedicationProvider } from "../contexts/MedicationContext";
import { VitalsProvider } from "../contexts/VitalsContext";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <MedicationProvider>
      <VitalsProvider>
        <Dashboard />
      </VitalsProvider>
    </MedicationProvider>
  );
};

export default AppContent;
