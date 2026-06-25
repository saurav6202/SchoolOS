import { CalendarPlus } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import Loader from "../../common/Loader";

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
            bg-primary/10
          "
        >
          <CalendarPlus size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Create Session</h2>

          <p className="text-sm text-textSecondary">
            Create a new academic year
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(submitFnc)} className="mt-6 space-y-4">
        {/* SESSION NAME */}

        <div>
          <label
            className="
                mb-2
                block
                text-sm
                font-medium
                text-textSecondary
                "
          >
            Session Name
          </label>

          <input
            type="text"
            readOnly
            {...register("name")}
            className="
                w-full
                rounded-xl
                border
                border-border
                bg-background
                px-4
                py-3
                text-textPrimary
                outline-none
                cursor-not-allowed
                "
          />
        </div>

        {/* START DATE */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-textSecondary
            "
          >
            Start Date
          </label>

          <input
            type="date"
            {...register("startDate", {
              required: "Please select start date",
              onChange: (e) => generateSessionName(e.target.value),
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

          {errors.startDate && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* END DATE */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-textSecondary
            "
          >
            End Date
          </label>

          <input
            type="date"
            min={startDate}
            {...register("endDate", {
              required: "Please select end date",
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

          {errors.endDate && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* INFO */}
        <div
          className="
            rounded-xl
            bg-primary/5
            p-3
            text-sm
            text-textSecondary
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
            rounded-xl
            bg-primary
            py-3
            font-medium
            text-white
            transition-all
            hover:bg-primaryDark
            disabled:cursor-not-allowed
            disabled:opacity-70
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
