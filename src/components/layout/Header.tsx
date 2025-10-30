import { useAuth } from "../../contexts/AuthContext";
import Button from "../common/Button";
import { Stethoscope } from "lucide-react";

const Header = () => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section — Logo & App name */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <Stethoscope className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
                Health Tracker
              </h1>
              <p className="text-sm text-gray-500">
                Welcome,{" "}
                <span className="font-medium text-gray-700">{currentUser}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={logout}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
