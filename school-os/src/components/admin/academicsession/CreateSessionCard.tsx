import { CalendarPlus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import Loader from "../../ui/Loader";

type FormData = {
  name: string;
  startDate: string;
  endDate: string;
};

const CreateSessionCard = ({
  onSuccess,
}: {
  onSuccess: () => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const startDate = watch("startDate");
  const [submitting, setSubmitting] = useState(false);

  const generateSessionName = (date: string) => {
    if (!date) {
      setValue("name", "");
      return;
    }

    const startYear = new Date(date).getFullYear();

    const endYear = String(startYear + 1).slice(-2);

    setValue("name", `${startYear}-${endYear}`, {
      shouldValidate: true,
    });
  };

  const submitFnc: SubmitHandler<FormData> = async (data) => {
    try {
      setSubmitting(true);
      const res = await api.post("/api/academic-sessions", data);
      onSuccess();
      showSuccess(res.data.message);
      reset();
    } catch (error: any) {
      showError(error.response.data.message);
      console.log(error);
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
            bg-primary/10
            rounded-xl
            items-center justify-center
          "
        >
          <CalendarPlus
            size={22}
            className="
              text-primary
            "
          />
        </div>

        <div>
          <h2
            className="
              text-lg font-semibold
            "
          >
            Create Session
          </h2>

          <p
            className="
              text-sm text-textSecondary
            "
          >
            Create a new academic year
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(submitFnc)}
        className="
          mt-5 space-y-4
          sm:mt-6
        "
      >
        {/* SESSION NAME */}

        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textSecondary
            "
          >
            Session Name
          </label>

          <input
            type="text"
            readOnly
            {...register("name", {
              required: "Session name is required",
            })}
            className="
                w-full
                px-4 py-3
                text-textPrimary
                bg-background
                rounded-xl border border-border
                cursor-not-allowed
                outline-none
              "
          />

          {errors.name && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* START DATE */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textSecondary
            "
          >
            Start Date
          </label>

          <input
            type="date"
            {...register("startDate", {
              required: "Start date is required",
              onChange: (e) => generateSessionName(e.target.value),
            })}
            className="
            w-full
            px-4 py-3
            rounded-xl border border-border
            outline-none focus:border-primary
             "
          />

          {errors.startDate && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.startDate.message}
            </p>
          )}

          {errors.startDate && (
            <p
              className="
                ml-2 mt-1
                text-sm text-red-500
              "
            >
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* END DATE */}
        <div>
          <label
            className="
              block
              mb-2
              text-sm font-medium text-textSecondary
            "
          >
            End Date
          </label>
          <input
            type="date"
            min={startDate}
            {...register("endDate", {
              required: "End date is required",
              validate: (value) =>
                !startDate ||
                value >= startDate ||
                "End date must be after start date",
            })}
            className="
              w-full
              px-4 py-3
              rounded-xl border border-border
              outline-none focus:border-primary
            "
          />

          {errors.endDate && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.endDate.message}
            </p>
          )}
          {errors.endDate && (
            <p
              className="
                ml-2 mt-1
                text-sm text-red-500
              "
            >
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* INFO */}
        <div
          className="
            p-3
            text-sm text-textSecondary
            bg-primary/5
            rounded-xl
          "
        >
          Only one session can remain active at a time.
        </div>

        {/* SUBMIT */}
        <button
          disabled={submitting}
          type="submit"
          className="
            w-full
            py-3
            font-medium text-white
            bg-primary
            rounded-xl
            transition-all
            hover:bg-primaryDark disabled:cursor-not-allowed disabled:opacity-70
          "
        >
          {submitting ? (
            <>
              Creating... <Loader />
            </>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreateSessionCard;
