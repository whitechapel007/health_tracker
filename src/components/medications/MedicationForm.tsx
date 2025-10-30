import { useMedication } from "../../contexts/MedicationContext";
import { useForm } from "../../hooks/useForm";
import { validateMedication } from "../../utils/validation";
import { MedicationFormData } from "../../types";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

const initialValues: MedicationFormData = {
  name: "",
  dosage: "",
  frequency: "",
};

const MedicationForm = () => {
  const { addMedication } = useMedication();

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialValues,
    validateMedication,
    (data) => {
      addMedication(data);
    }
  );

  return (
    <Card
      title={
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Medication Details
        </h3>
      }
      className="min-h-[500px]"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white   space-y-8 transition-all duration-200"
      >
        {/* Medication Details Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              id="name"
              name="name"
              label="Medication Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              placeholder="e.g., Lisinopril"
            />
            <Input
              id="dosage"
              name="dosage"
              label="Dosage"
              type="text"
              value={values.dosage}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.dosage}
              placeholder="e.g., 20mg"
            />
          </div>
        </div>

        {/* Frequency Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Frequency
          </h3>
          <Input
            id="frequency"
            name="frequency"
            label="How Often?"
            type="text"
            value={values.frequency}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.frequency}
            placeholder="e.g., Once daily in the morning"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full text-base font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            Add Medication
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default MedicationForm;
