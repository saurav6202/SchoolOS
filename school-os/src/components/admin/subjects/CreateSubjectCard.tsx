import { BookPlus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import Loader from "../../ui/Loader";

type FormData = {
  name: string;
  code: string;
  category: "core" | "optional";
};

const CreateSubjectCard = ({
  onSuccess,
}: {
  onSuccess: () => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category: "core",
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const selectedCategory = watch("category");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setSubmitting(true);
      const res = await api.post("/api/subjects", data);
      showSuccess(res.data.message);
      onSuccess();
      reset();
    } catch (error: any) {
      showError(error.response.data.message);
      console.error(error);
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
          <BookPlus
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
            Create Subject
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Add a new subject to the school
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
            mt-5 space-y-4
          sm:mt-6
        "
      >
        {/* SUBJECT NAME */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textPrimary
            "
          >
            Subject Name
          </label>

          <input
            type="text"
            placeholder="Mathematics"
            {...register("name", {
              required: "Subject name is required",
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
            <p
              className="
                mt-1
                text-sm text-error
              "
            >
              {errors.name.message}
            </p>
          )}
        </div>

        {/* SUBJECT CODE */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textPrimary
            "
          >
            Subject Code
          </label>
          <input
            type="text"
            placeholder="MATH"
            {...register("code", {
              required: "Subject code is required",
              setValueAs: (value) => value.trim().toUpperCase(),
            })}
            className="
    w-full
    px-4 py-3
    rounded-xl border border-border
    transition-all
    uppercase outline-none focus:border-primary
  "
          />

          {errors.code && (
            <p
              className="
                mt-1
                text-sm text-error
              "
            >
              {errors.code.message}
            </p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label
            className="
              block
              mb-3
              text-sm font-medium text-textPrimary
            "
          >
            Category
          </label>

          <div
            className="
              grid grid-cols-2
              gap-3
            "
          >
            <label
              className={`
                p-4
                text-center
                rounded-xl border
                cursor-pointer transition-all
                flex flex-col items-center justify-center
                ${
                  selectedCategory === "core"
                    ? "border-primary bg-primaryLight"
                    : "border-border"
                }
              `}
            >
              <input
                type="radio"
                value="core"
                {...register("category", {
                  required: "Please select a category",
                })}
                className="hidden"
              />

              <p
                className="
                  font-medium
                "
              >
                Core
              </p>

              <p
                className="
                  mt-1
                  text-xs text-textSecondary
                  hidden md:block
                "
              >
                Mandatory subject
              </p>
            </label>

            <label
              className={`
                p-4
                text-center
                rounded-xl border
                cursor-pointer transition-all
                flex flex-col items-center justify-center
                ${
                  selectedCategory === "optional"
                    ? "border-primary bg-primaryLight"
                    : "border-border"
                }
              `}
            >
              <input
                type="radio"
                value="optional"
                {...register("category", {
                  required: "Please select a category",
                })}
                className="hidden"
              />

              <p
                className="
                  font-medium
                  "
                  >
                Optional
              </p>

              <p
                className="
                  mt-1
                  text-xs text-textSecondary
                  hidden sm:block
                "
              >
                Elective subject
              </p>
            </label>
          </div>
        </div>

        {errors.category && (
          <p
            className="
      mt-2
      text-sm text-error
    "
          >
            {errors.category.message}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={submitting}
          className="
            w-full
            py-3
            font-medium text-white
            bg-primary
            rounded-xl
            transition-all
            hover:bg-primaryDark disabled:opacity-60
          "
        >
          {submitting ? (
            <>
              Creating... <Loader />
            </>
          ) : (
            "Create Subject"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateSubjectCard;
