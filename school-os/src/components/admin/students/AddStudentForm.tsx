import { PlusCircle } from "lucide-react";
import api from "../../../api/api";
import Button from "../../ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import Loader from "../../ui/Loader";
import { inputClass } from "../../../styles/forms";

const AddStudentForm = ({ onSuccess }: { onSuccess: () => Promise<void> }) => {
  type FormDataType = {
    name: string;
    admissionNo: number;
    className: string;
    section: string;
    rollNumber: number;
    fatherName: string;
    motherName: string;
    mobile: number;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>();
  const [submitting, setSubmitting] = useState(false);

  const submitFnc: SubmitHandler<FormDataType> = async (data) => {
    setSubmitting(true);
    try {
      const res = await api.post("/api/students", data);
      showSuccess(res.data.message);
      onSuccess();
      reset();
    } catch (error: any) {
      showError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="
        p-4
        bg-surface
        rounded-2xl border border-border
        shadow-card
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
     <div className="flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-success/10
          "
        >
          <PlusCircle size={22} className="text-success" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-textPrimary
            "
          >
            Add Student
          </h2>

          <p
            className="
              text-sm
              text-textSecondary
            "
          >
            Create a new student account
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(submitFnc)}
        className="
          mt-5 space-y-4
          sm:mt-6
        "
      >
        {/* Student Name */}
        <input
          type="text"
          placeholder="Student Name"
          className={inputClass}
        />
        {errors.name && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.name?.message}
          </p>
        )}

        {/* Admission Number */}
        <input
          type="number"
          placeholder="Admission Number"
         className={inputClass}
        />
        {errors.admissionNo && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.admissionNo?.message}
          </p>
        )}

        {/* Class + Section */}
        <div
          className="
            grid grid-cols-2
            gap-4
          "
        >
          <select
            className="
              w-full
              px-4 py-3
              text-sm
              rounded-xl border border-border
              transition-colors
              outline-none focus:border-primary
              sm:text-base
            "
          >
            <option value="">Select Class</option>

            {[...Array(10)].map((_, index) => (
              <option key={index} value={index + 1}>
                Class {index + 1}
              </option>
            ))}
          </select>
          {errors.className && (
            <p
              className="
                ml-2
                text-red-500 text-sm
              "
            >
              {errors.className?.message}
            </p>
          )}

          <select
            className="
              w-full
              px-4 py-3
              text-sm
              rounded-xl border border-border
              transition-colors
              outline-none focus:border-primary
              sm:text-base
            "
          >
            <option value="">Section</option>

            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          {errors.section && (
            <p
              className="
                ml-2
                text-red-500 text-sm
              "
            >
              {errors.section?.message}
            </p>
          )}
        </div>

        {/* Roll Number */}
        <input
          type="number"
          placeholder="Roll Number"
         className={inputClass}
        />
        {errors.rollNumber && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.rollNumber?.message}
          </p>
        )}

        {/* Father Name */}
        <input
          type="text"
          placeholder="Father Name"
         className={inputClass}
        />
        {errors.fatherName && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.fatherName?.message}
          </p>
        )}

        {/* Mother Name */}
        <input
          type="text"
          placeholder="Mother Name"
         className={inputClass}
        />
        {errors.motherName && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.motherName?.message}
          </p>
        )}

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
         className={inputClass}
        />
        {errors.mobile && (
          <p
            className="
              ml-2
              text-red-500 text-sm
            "
          >
            {errors.mobile?.message}
          </p>
        )}

        {/* Submit */}

        <Button
          disabled={submitting}
          className="
            w-full
          "
        >
          {submitting ? (
            <>
              Creating... <Loader />
            </>
          ) : (
            "Create Student Account"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddStudentForm;
