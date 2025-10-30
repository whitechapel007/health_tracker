import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";
import { Heart } from "lucide-react";

const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = username.trim();
    if (!trimmed) {
      setError("Username is required");
      return;
    }

    if (trimmed.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }

    login(trimmed);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-pink-500 to-rose-400 shadow-md">
              <Heart className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Health Tracker
          </h1>
          <p className="text-gray-500 mt-1">
            Track your medications & daily vitals
          </p>
        </div>

        {/* Card Form */}
        <Card className="p-6 border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-800">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Sign in to access your dashboard
              </p>
            </div>

            <Input
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              error={error}
              placeholder="Enter your username"
              autoFocus
            />

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-pink-500 to-rose-500 text-white font-medium hover:from-pink-600 hover:to-rose-600 transition-all"
            >
              Sign In
            </Button>

            <p className="text-center text-xs text-gray-400">
              Try <span className="text-gray-600 font-medium">user1</span> or{" "}
              <span className="text-gray-600 font-medium">user2</span>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
