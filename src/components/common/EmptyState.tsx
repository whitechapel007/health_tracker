import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

const EmptyState = ({ message, icon }: EmptyStateProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="text-8xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg">{message}</p>
    </div>
  );
};

export default EmptyState;
