interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
}

const Card = ({ children, className = "", title }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
