import { useMedication } from "../../contexts/MedicationContext";
import MedicationItem from "./MedicationItem";
import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import { Pill } from "lucide-react";

const MedicationList = () => {
  const { medications, removeMedication, isLoading } = useMedication();

  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center py-12">
          <Pill className="w-6 h-6 text-blue-400 mb-2 animate-pulse" />
          <p className="text-gray-500 text-sm">Loading medications...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-linear-to-br from-blue-500 to-sky-400 rounded-lg">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            My Medications
          </h2>
        </div>
      }
      className="max-h-[500px] h-full overflow-y-auto "
    >
      {medications.length === 0 ? (
        <EmptyState
          message="No medications added yet. Add your first medication above."
          icon={<Pill size={50} />}
        />
      ) : (
        <div className="space-y-4">
          {medications.map((medication) => (
            <MedicationItem
              medication={medication}
              onRemove={removeMedication}
              key={medication.id}
            />
          ))}
        </div>
      )}
    </Card>
  );
};

export default MedicationList;
