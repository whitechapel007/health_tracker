import { AuthProvider } from "./contexts/AuthContext";
import AppContent from "./pages/AppContent";

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
