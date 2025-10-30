import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../common/Button";
import { Stethoscope } from "lucide-react";
import Modal from "../common/Modal";

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  return (
    <>
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
                  <span className="font-medium text-gray-700">
                    {currentUser}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Logout Button */}
              <Button
                variant="ghost"
                onClick={() => setShowLogoutModal(true)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Sign Out"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to sign out? You’ll need to log in again to
            continue.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowLogoutModal(false)}
              className="text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
