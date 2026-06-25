import { UserPlus } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../api/api";
import Select from "react-select";
import { useState } from "react";
import { showError, showSuccess } from "../../../utils/toast";
import Loader from "../../common/Loader";

interface FormProps {
  nonAssignedClasses: Array<{ name: number; section: string; _id: string }>;
  subjects: Array<{ name: string; code: string; _id: string }>;
  onSuccess: () => Promise<void>;
}

const AddTeacherForm = ({
  nonAssignedClasses,
  subjects,
  onSuccess,
}: FormProps) => {
  
  type FormDataType = {
    name: string;
    email: string;
    subjects: Array<string>;
    assignedClass: string;
    mobile: number;
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormDataType>();
  const [submitting, setSubmitting] = useState(false);

  const submitFnc: SubmitHandler<FormDataType> = async (data) => {
    try {
      setSubmitting(true);
      const res = await api.post("/api/teachers", data);
      showSuccess(res.data.message);
      onSuccess();
      reset();
    } catch (error: any) {
      showError(error.response.data.message);
    }finally{
      setSubmitting(false);
    }
  };

  const [isSubjectFocused, setIsSubjectFocused] = useState(false);

  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: `${subject.name} (${subject.code})`,
  }));

  const classOptions = [
    ...nonAssignedClasses.map((item) => ({
      value: item._id,
      label: `Class ${item.name}${item.section}`,
      section: item.section,
    })),
    {
      value: "",
      label: "Not Assigned (Subject Teacher Only)",
    },
  ];

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
      {/* HEADER */}
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
          <UserPlus size={22} className="text-success" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Add Teacher</h2>

          <p className="text-sm text-textSecondary">
            Create a new teacher account
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitFnc)} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Teacher Name"
          {...register("name", {
            required: "Please enter the name",
          })}
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

        <div>
          <Controller
            name="subjects"
            control={control}
            rules={{
              required: "Please select at least one subject",
            }}
            render={({ field }) => (
              <Select
                isMulti
                options={subjectOptions}
                placeholder="Select Subjects..."
                value={subjectOptions.filter((option) =>
                  field.value?.includes(option.value),
                )}
                onChange={(selectedOptions) =>
                  field.onChange(selectedOptions.map((option) => option.value))
                }
                styles={{
                  control: (base, state) => ({
                    ...base,
                    minHeight: "52px",
                    borderRadius: "12px",
                    borderColor: state.isFocused ? "#2563EB" : "#E2E8F0",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#E2E8F0",
                    },
                  }),

                  valueContainer: (base) => ({
                    ...base,
                    padding: "6px 12px",
                  }),

                  multiValue: (base) => ({
                    ...base,
                    borderRadius: "8px",
                  }),

                  multiValueLabel: (base) => ({
                    ...base,
                    fontWeight: 500,
                  }),

                  menu: (base) => ({
                    ...base,
                    borderRadius: "12px",
                    overflow: "hidden",
                    zIndex: 50,
                  }),

                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                      ? "#2563eb"
                      : state.isFocused
                        ? "#eff6ff"
                        : "white",
                    color: state.isSelected ? "white" : "#111827",
                    cursor: "pointer",
                  }),
                }}
                onFocus={() => setIsSubjectFocused(true)}
                onBlur={() => setIsSubjectFocused(false)}
              />
            )}
          />

          {errors.subjects && (
            <p
              className="
                mt-2 ml-2
                text-sm text-red-500
              "
            >
              {errors.subjects.message}
            </p>
          )}

          {isSubjectFocused && (
            <p className="mt-2 text-xs text-textSecondary">
              Select all subjects this teacher can teach.
            </p>
          )}
        </div>

        <Controller
          name="assignedClass"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Assign Class"
              options={classOptions}
              value={
                classOptions.find((option) => option.value === field.value) ||
                null
              }
              onChange={(option) => field.onChange(option?.value)}
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: "52px",
                  borderRadius: "12px",
                  borderColor: state.isFocused ? "#2563EB" : "#E2E8F0",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#E2E8F0",
                  },
                }),

                valueContainer: (base) => ({
                  ...base,
                  padding: "6px 12px",
                }),

                multiValue: (base) => ({
                  ...base,
                  borderRadius: "8px",
                }),

                multiValueLabel: (base) => ({
                  ...base,
                  fontWeight: 500,
                }),

                menu: (base) => ({
                  ...base,
                  borderRadius: "12px",
                  overflow: "hidden",
                  zIndex: 50,
                }),

                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? "#2563eb"
                    : state.isFocused
                      ? "#eff6ff"
                      : "white",
                  color: state.isSelected ? "white" : "#111827",
                  cursor: "pointer",
                }),
              }}
            />
          )}
        />
        {errors.assignedClass && (
          <p className="text-red-500 ml-2 text-sm">
            {errors.assignedClass?.message}
          </p>
        )}
        <input
          type="tel"
          placeholder="Mobile Number"
          {...register("mobile", {
            required: "Enter the mobile number",
            maxLength: {
              value: 10,
              message: "Enter the correct mobile number",
            },
          })}
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

        <input
          type="email"
          placeholder="Email Address"
          {...register("email", {
            required: "Please enter the email",
          })}
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
        {errors.email && (
          <p className="text-red-500 ml-2 text-sm">{errors.email?.message}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            rounded-xl
            bg-primary
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-primaryDark
          "
        >
          {submitting ? (
            <>
              Creating... <Loader />
            </>
          ) : (
            "Create Teacher Account"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddTeacherForm;
