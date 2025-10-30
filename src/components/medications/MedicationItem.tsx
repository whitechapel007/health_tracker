import { useState } from "react";
import { Medication } from "../../types";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { formatMedicationDate } from "../../utils/formatters";

interface MedicationItemProps {
  medication: Medication;
  onRemove: (id: string) => void;
}

const MedicationItem = ({ medication, onRemove }: MedicationItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    onRemove(medication.id);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Card */}
      <div className="group relative bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Icon + Name */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-500 text-lg">
                💊
              </div>
              <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                {medication.name}
              </h3>
            </div>

            {/* Details */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium text-gray-800">Dosage:</span>{" "}
                {medication.dosage}
              </p>
              <p>
                <span className="font-medium text-gray-800">Frequency:</span>{" "}
                {medication.frequency}
              </p>
            </div>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            onClick={() => setIsModalOpen(true)}
            className="text-sm px-3 py-1.5 text-red-600 border border-transparent hover:bg-red-50 hover:border-red-100 rounded-lg font-medium transition-all"
          >
            Remove
          </Button>
        </div>

        {/* Subtle Line Divider */}
        <div className="mt-5 border-t border-gray-100"></div>

        {/* Meta Info (Optional placeholder for future expansion) */}
        <div className="mt-3 text-xs text-gray-500 flex justify-between items-center">
          <span>
            Added on:{" "}
            <strong>{formatMedicationDate(medication.createdAt)}</strong>
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Remove Medication"
      >
        <div className="text-center py-5">
          <div className="text-6xl mb-3 animate-pulse">💊</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Remove this medication?
          </h3>
          <p className="text-gray-600 text-sm mb-6">
            You’re about to remove{" "}
            <span className="font-medium text-gray-900">{medication.name}</span>
            . This action cannot be undone.
          </p>

          <div className="flex justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="px-5 py-2"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MedicationItem;
