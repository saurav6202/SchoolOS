import { GraduationCap, PlusCircle } from "lucide-react";
import Button from "../../common/Button";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";

type Teacher = {
  _id: string;
  name: string;
};

type FormDataType = {
  name: number;
  section: string;
  academicYear: string;
  classTeacherId?: string;
  subjects: Array<string>;
};

type AcademicSession = { _id: string; name: string; isActive: boolean };

const AddClassForm = ({
  nonClassTeachers,
  academicSessions,
  subjects,
  onSuccess,
}: {
  nonClassTeachers: Teacher[];
  academicSessions: AcademicSession[];
  subjects: Array<{ name: string; code: string; _id: string }>;
  onSuccess: () => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>();

  const academicYears = academicSessions.map((a) => ({
    id: a._id,
    year: a.name,
    isActive: a.isActive,
  }));

  const teachersOptions = [
    ...nonClassTeachers.map((item) => ({
      value: item._id,
      label: item.name,
    })),
    {
      value: "",
      label: "Not Assigned (Without Class Teacher)",
    },
  ];

  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: `${subject.name} (${subject.code})`,
  }));
  const [submitting, setSubmitting] = useState(false);

  const activeAcademicYear = academicSessions.find(
    (session) => session.isActive,
  );

  useEffect(() => {
    if (activeAcademicYear) {
      setValue("academicYear", activeAcademicYear._id);
    }
  }, [activeAcademicYear, setValue]);

  const submitFnc: SubmitHandler<FormDataType> = async (data) => {
    try {
      setSubmitting(true);
      const res = await api.post("/api/classes", data);
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
        p-6
        bg-surface
        rounded-2xl border border-border
        shadow-card
      "
    >
      {/* HEADER */}
      <div
        className="
          flex
          items-center gap-3
        "
      >
        <div
          className="
            flex
            h-12 w-12
            bg-primaryLight
            rounded-xl
            items-center justify-center
          "
        >
          <GraduationCap
            size={22}
            className="
              text-primary
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold text-textPrimary
            "
          >
            Create Class
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Add a new class and assign a class teacher
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(submitFnc)}
        className="
          mt-6 space-y-5
        "
      >
        {/* CLASS NAME */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textPrimary
            "
          >
            Class Name
          </label>

          <input
            type="number"
            placeholder="e.g. 8"
            {...register("name", {
              required: "Class Name is required",
            })}
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              transition-all
              outline-none focus:border-primary
            "
          />
          {errors.name && (
            <p className="text-red-500 ml-2 text-sm">{errors.name?.message}</p>
          )}
        </div>

        {/* SECTION */}
        <div>
          <label
            className="
              flex
              mb-2
              text-sm font-medium text-textPrimary
              items-center gap-2
            "
          >
            Section
          </label>

          <select
            {...register("section", {
              validate: (value) => value !== "" || "Please select a section",
            })}
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              transition-all
              outline-none focus:border-primary
            "
          >
            <option value="" disabled>
              Select Section
            </option>

            {["A", "B", "C", "D"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {errors.section && (
            <p className="text-red-500 ml-2 text-sm">
              {errors.section?.message}
            </p>
          )}
        </div>

        {/* ACADEMIC YEAR */}
        <div>
          <label
            className="
      flex
      mb-2
      text-sm font-medium text-textPrimary
      items-center gap-2
    "
          >
            Academic Year
          </label>

          <select
            {...register("academicYear", {
              required: "Academic year is required",
            })}
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              transition-all
              outline-none focus:border-primary
            "
          >
            <option value="">Select Academic Year</option>

            {academicYears.map((academicYear) => (
              <option key={academicYear.id} value={academicYear.id}>
                {academicYear.year}
              </option>
            ))}
          </select>

          {errors.academicYear && (
            <p className="text-red-500 ml-2 text-sm">
              {errors.academicYear.message}
            </p>
          )}
        </div>

        {/* CLASS TEACHER */}

        <div>
          <Controller
            name="classTeacherId"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Assign Class Teacher"
                options={teachersOptions}
                value={
                  teachersOptions.find(
                    (option) => option.value === field.value,
                  ) || null
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
          <p
            className="
              mt-2
              text-xs text-textSecondary
            "
          >
            Only unassigned teachers should appear here.
          </p>
        </div>

        <div>
          <label
            className="
                block
                mb-2
                text-sm font-medium text-textPrimary
              "
          >
            Subjects
          </label>

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
                  }),

                  valueContainer: (base) => ({
                    ...base,
                    padding: "6px 12px",
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
                  }),
                }}
              />
            )}
          />

          {errors.subjects && (
            <p className="mt-2 ml-2 text-sm text-red-500">
              {errors.subjects.message}
            </p>
          )}

          <p className="mt-2 text-xs text-textSecondary">
            Select subjects taught in this class.
          </p>
        </div>

        {/* PREVIEW */}
        {/* {watchedName && watchedSection && (
          <div
            className="
            mt-2
            p-5
            rounded-2xl
            border border-primary/20
            bg-gradient-to-br from-primaryLight/40 to-surface
            shadow-sm
            transition-all
          "
          >
            <div className="flex items-center justify-between">
              <p className="text-xs text-textSecondary uppercase tracking-wide">
                Class Preview
              </p>

              <span
                className="
                px-3 py-1
                text-xs font-semibold
                rounded-full
                bg-primary/10 text-primary
                border border-primary/20
              "
              >
                Live
              </span>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-textPrimary leading-none">
                Class: {watchedName}
                {watchedSection}
              </h3>
              <h3 className="text-xl font-bold text-textPrimary leading-none">
                Class Teacher: {selectedTeacher?.name ?? "Not Assigned" }
              </h3>

              <div className="flex gap-3 items-center justify-between text-sm text-textPrimary max-w-fit font-medium">
                <span>Academic Year:</span>
                <span className="font-normal text-textPrimary">
                  {watch("academicYear")}
                </span>
              </div>
            </div>

          </div>
        )} */}

        {/* SUBMIT */}
        <Button
          className="
            w-full
          "
        >
          <PlusCircle size={18} />
          {submitting ? (
            <>
              Creating... <Loader />
            </>
          ) : (
            "Create Class"
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddClassForm;
