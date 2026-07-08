import { useEffect, useState } from "react";
import { UserCog, Save } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";

import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import { useTeachersStore } from "../../../store/teachersStore";
import Loader from "../../ui/Loader";

type Teacher = {
  _id: string;
  name: string;
};

type Class = {
  _id: string;
  name: string;
  section: string;
  studentCount?: number;
  classTeacher?: Teacher;
  subjects: Subject[];
};

type Subject = { name: string; code: string; _id: string };

type EditClassModalProps = {
  isOpen: boolean;
  onClose: () => void;
  classData: Class | null;
  teachers: Teacher[];
};

type FormDataType = {
  name: string;
  email: string;
  subjects: Array<string>;
  classTeacher: string;
  mobile: number;
};

const EditClassModal = ({
  isOpen,
  onClose,
  classData,
  teachers,
}: EditClassModalProps) => {
  if (!classData) return;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: "onChange",
  });

  const classTeacher = classData.classTeacher?._id ?? "";
  const [submitting, setSubmitting] = useState(false);

  const selectedSubjects =
    classData?.subjects.map((subject) => subject._id) ?? [];

  useEffect(() => {
    setValue("subjects", selectedSubjects);
    setValue("classTeacher", classTeacher);
  }, [selectedSubjects, classTeacher, setValue]);

  const teachersOptions = [
    {
      value: "",
      label: "Not Assigned (Without Class Teacher)",
    },

    ...(classData?.classTeacher
      ? [
          {
            value: classData.classTeacher._id,
            label: classData.classTeacher.name,
          },
        ]
      : []),

    ...teachers.map((item) => ({
      value: item._id,
      label: item.name,
    })),
  ];

  const { subjects } = useTeachersStore();

  const subjectOptions = subjects.map((subject) => ({
    value: subject._id,
    label: `${subject.name} (${subject.code})`,
  }));

  const handleSubmitForm: SubmitHandler<FormDataType> = async (data) => {
    try {
      setSubmitting(true);
      const res = await api.post(`/api/classes/edit/${classData._id}`, {
        classId: classData._id,
        classTeacherId: data.classTeacher,
        subjects: data.subjects,
      });
      showSuccess(res.data.message);
      onClose();
    } catch (error: any) {
      showError(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Class">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="
          space-y-5
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
            type="text"
            value={classData.name}
            disabled
            className="
              w-full
              px-4 py-3
              text-textSecondary
              bg-background
              rounded-xl border border-border
            "
          />
        </div>

        {/* SECTION */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textPrimary
            "
          >
            Section
          </label>

          <input
            type="text"
            value={classData.section}
            disabled
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              outline-none focus:border-primary
            "
          />
        </div>

        {/* SUBJECTS */}
        <div>
          <label
            className="
              flex
              mb-2
              text-sm font-medium text-textPrimary
              items-center gap-2
            "
          >
            <UserCog size={16} />
            Subjects
          </label>

          <div
            className="
              z-20
            "
          >
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
                    field.onChange(
                      selectedOptions.map((option) => option.value),
                    )
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
              <p
                className="
                  mt-2 ml-2
                  text-sm text-red-500
                "
              >
                {errors.subjects.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            className="
              flex
              mb-2
              text-sm font-medium text-textPrimary
              items-center gap-2
            "
          >
            <UserCog size={16} />
            Teacher
          </label>

          <div
            className="
              z-20
            "
          >
            <Controller
              name="classTeacher"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Assign Class Teacher"
                  options={teachersOptions}
                  value={
                    teachersOptions.find(
                      (option) => option.value === field.value,
                    ) || teachersOptions[0]
                  }
                  onChange={(option) => {
                    field.onChange(option?.value);
                  }}
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
          </div>
        </div>

        {/* ACTIONS */}
        <div
          className="
            flex
            pt-4
            justify-end gap-3
          "
        >
          <Button
            handleClick={onClose}
            className="
              bg-slate-500
              hover:bg-slate-600
            "
          >
            Cancel
          </Button>

          <Button>
            <Save size={18} />
            {submitting ? (
              <>
                Saving... <Loader />
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditClassModal;

// set defalt value to the Select
