import { useVitals } from "../../contexts/VitalsContext";
import VitalsEntry from "./VitalsEntry";
import Card from "../common/Card";
import EmptyState from "../common/EmptyState";
import { HeartPulse } from "lucide-react";

const VitalsLog = () => {
  const { vitalsLog, isLoading } = useVitals();

  if (isLoading) {
    return (
      <Card title="Vitals History">
        <div className="flex flex-col items-center justify-center py-10">
          <HeartPulse className="w-6 h-6 text-blue-500 animate-pulse mb-2" />
          <p className="text-gray-500 text-sm">
            Loading your vitals history...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-rose-500" />
          <span className="font-semibold text-gray-800">Vitals History</span>
        </div>
      }
      className="max-h-[500px] h-full overflow-y-auto"
    >
      {vitalsLog.length === 0 ? (
        <EmptyState
          message="No vitals logged yet. Start tracking your health today."
          icon={<HeartPulse size={50} />}
        />
      ) : (
        <div className="space-y-4 ">
          {vitalsLog.map((vitals, index) => (
            <div
              key={vitals.id}
              className={`transition-all duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-indigo-50/40 rounded-xl`}
            >
              <VitalsEntry vitals={vitals} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default VitalsLog;
