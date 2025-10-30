import Header from "./layout/Header";
import MedicationForm from "./medications/MedicationForm";
import MedicationList from "./medications/MedicationList";
import VitalsForm from "./vitals/VitalsForm";
import VitalsLog from "./vitals/VitalsLog";
import { Pill, HeartPulse } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Overview Title */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Your Health Overview
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Stay on top of your medications and vital health records
          </p>
        </header>

        <div className="space-y-16">
          {/* Medications Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-tr from-blue-500 to-sky-400 rounded-xl shadow-sm">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Medications
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" transition-all duration-300 ">
                <MedicationForm />
              </div>

              <div className=" shadow-sm hover:shadow-md transition-all duration-300">
                <MedicationList />
              </div>
            </div>
          </section>

          {/* Vital Signs Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-linear-to-tr from-rose-500 to-pink-400 rounded-xl shadow-sm">
                <HeartPulse className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Vital Signs
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" transition-all duration-300">
                <VitalsForm />
              </div>

              <div className=" ">
                <VitalsLog />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
