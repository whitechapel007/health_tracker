interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
}

const Card = ({ children, className = "", title }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {title && <div className=" mb-4">{title}</div>}
      {children}
    </div>
  );
};

export default Card;
