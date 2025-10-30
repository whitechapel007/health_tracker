import { Vitals } from "../../types";
import { formatDate, formatBloodPressure } from "../../utils/formatters";
import { HeartPulse, Gauge, Activity } from "lucide-react";

interface VitalsEntryProps {
  vitals: Vitals;
}

const VitalsEntry = ({ vitals }: VitalsEntryProps) => {
  const status =
    vitals.systolic >= 140 || vitals.diastolic >= 90
      ? { label: "High", color: "text-red-600 bg-red-100" }
      : vitals.systolic >= 120 || vitals.diastolic >= 80
      ? { label: "Elevated", color: "text-amber-600 bg-amber-100" }
      : { label: "Normal", color: "text-green-600 bg-green-100" };

  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs text-gray-500 font-medium tracking-wide">
          {formatDate(vitals.timestamp)}
        </span>
        <span
          className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Blood Pressure */}
        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Blood Pressure</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatBloodPressure(vitals.systolic, vitals.diastolic)}
              <span className="text-sm text-gray-500 ml-1">mmHg</span>
            </p>
          </div>
        </div>

        {/* Heart Rate */}
        <div className="flex items-center gap-3">
          <HeartPulse className="w-5 h-5 text-rose-500" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Heart Rate</p>
            <p className="text-lg font-semibold text-gray-800">
              {vitals.heartRate}
              <span className="text-sm text-gray-500 ml-1">BPM</span>
            </p>
          </div>
        </div>

        {/* Weight */}
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-emerald-500" />
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Weight</p>
            <p className="text-lg font-semibold text-gray-800">
              {vitals.weight}
              <span className="text-sm text-gray-500 ml-1">lbs</span>
            </p>
          </div>
        </div>

        {/* Temperature (optional future data) */}
      </div>
    </div>
  );
};

export default VitalsEntry;
