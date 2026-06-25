import { PlusCircle } from "lucide-react";
import api from "../../../api/api";
import Button from "../../common/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import Loader from "../../common/Loader";

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
        rounded-2xl
        border
        border-border
        bg-surface
        p-6
        shadow-card
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
      <form onSubmit={handleSubmit(submitFnc)} className="mt-6 space-y-4">
        {/* Student Name */}
        <input
          type="text"
          {...register("name", {
            required: "Please enter the name",
          })}
          placeholder="Student Name"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.name && (
          <p className="text-red-500 ml-2 text-sm">{errors.name?.message}</p>
        )}

        {/* Admission Number */}
        <input
          type="number"
          {...register("admissionNo", {
            required: "Please enter the admission number",
          })}
          placeholder="Admission Number"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.admissionNo && (
          <p className="text-red-500 ml-2 text-sm">
            {errors.admissionNo?.message}
          </p>
        )}

        {/* Class + Section */}
        <div className="grid grid-cols-2 gap-4">
          <select
            {...register("className", {
              validate: (value) => value !== "" || "Please select the class",
            })}
            className="
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              focus:border-primary
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
            <p className="text-red-500 ml-2 text-sm">
              {errors.className?.message}
            </p>
          )}

          <select
            {...register("section", {
              validate: (value) => value !== "" || "Please select a section",
            })}
            className="
              rounded-xl
              border
              border-border
              px-4
              py-3
              outline-none
              focus:border-primary
            "
          >
            <option value="">Section</option>

            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>

          {errors.section && (
            <p className="text-red-500 ml-2 text-sm">
              {errors.section?.message}
            </p>
          )}
        </div>

        {/* Roll Number */}
        <input
          type="number"
          {...register("rollNumber", {
            required: "Enter the roll number",
          })}
          placeholder="Roll Number"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.rollNumber && (
          <p className="text-red-500 ml-2 text-sm">
            {errors.rollNumber?.message}
          </p>
        )}

        {/* Father Name */}
        <input
          type="text"
          {...register("fatherName", {
            required: "Enter the father's name",
          })}
          placeholder="Father Name"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.fatherName && (
          <p className="text-red-500 ml-2 text-sm">
            {errors.fatherName?.message}
          </p>
        )}

        {/* Mother Name */}
        <input
          type="text"
          {...register("motherName", {
            required: "Enter the mother's name",
          })}
          placeholder="Mother Name"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.motherName && (
          <p className="text-red-500 ml-2 text-sm">
            {errors.motherName?.message}
          </p>
        )}

        {/* Mobile */}
        <input
          type="tel"
          {...register("mobile", {
            required: "Enter the mobile number",
            maxLength: {
              value: 10,
              message: "Enter the correct mobile number",
            },
          })}
          placeholder="Mobile Number"
          className="
            w-full
            rounded-xl
            border
            border-border
            px-4
            py-3
            outline-none
            focus:border-primary
          "
        />
        {errors.mobile && (
          <p className="text-red-500 ml-2 text-sm">{errors.mobile?.message}</p>
        )}

        {/* Submit */}

        <Button className="w-full" disabled={submitting}>
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
