const Modal = ({
  title,
  open,
  onClose,
  children,
}: {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg">
        <div className="bg-white rounded-md shadow-lg p-6">
          {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
