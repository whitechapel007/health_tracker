import { useVitals } from "../../contexts/VitalsContext";
import { useForm } from "../../hooks/useForm";
import { validateVitals } from "../../utils/validation";
import { VitalsFormData } from "../../types";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

const initialValues: VitalsFormData = {
  systolic: "",
  diastolic: "",
  heartRate: "",
  weight: "",
};

const VitalsForm = () => {
  const { addVitals } = useVitals();

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validateVitals,
    (data) => {
      addVitals(data);
    }
  );

  return (
    <Card
      title={
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Log Vital Signs
        </h3>
      }
      className="min-h-[500px]"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white   space-y-8 transition-all duration-200"
      >
        {/* Section: Blood Pressure */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">
              Blood Pressure
            </h3>
            <span className="text-xs text-gray-500">
              Measured in millimeters of mercury (mmHg)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="systolic"
              name="systolic"
              label="Systolic (mmHg)"
              type="number"
              value={values.systolic}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.systolic}
              placeholder="e.g., 120"
            />

            <Input
              id="diastolic"
              name="diastolic"
              label="Diastolic (mmHg)"
              type="number"
              value={values.diastolic}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.diastolic}
              placeholder="e.g., 80"
            />
          </div>
        </section>

        {/* Section: Other Measurements */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">
              Other Measurements
            </h3>
            <span className="text-xs text-gray-500">
              Keep these updated for better insights
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="heartRate"
              name="heartRate"
              label="Heart Rate (BPM)"
              type="number"
              value={values.heartRate}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.heartRate}
              placeholder="e.g., 68"
            />

            <Input
              id="weight"
              name="weight"
              label="Weight (lbs)"
              type="number"
              step="0.1"
              value={values.weight}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.weight}
              placeholder="e.g., 150"
            />
          </div>
        </section>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button type="submit" className="px-8 py-2.5 rounded-lg">
            Log Vitals
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default VitalsForm;
