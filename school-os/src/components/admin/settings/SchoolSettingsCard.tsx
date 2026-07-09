import { Loader, School, Upload } from "lucide-react";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../../api/api";
import { showError, showSuccess } from "../../../utils/toast";

type FormData = {
  schoolName: string;
  schoolCode: string;
  phone: string;
  email: string;
  website: string;
  address: string;
};
type Settings = {
  schoolName: string;
  schoolCode: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logo: string;
};

const SchoolSettingsCard = ({
  settings,
}: {
  settings: Settings | undefined;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!settings) return;

    reset({
      schoolName: settings.schoolName,
      schoolCode: settings.schoolCode,
      phone: settings.phone,
      email: settings.email,
      website: settings.website,
      address: settings.address,
    });

    setLogoPreview(settings.logo);
  }, [settings, reset]);
  const submitFnc: SubmitHandler<FormData> = async (data) => {
    try {
      setSubmitting(true);
      const formData = new FormData();

      formData.append("schoolName", data.schoolName);
      formData.append("schoolCode", data.schoolCode);

      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("website", data.website);
      formData.append("address", data.address);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await api.post("/api/school-settings", formData);
      console.log("response submit: ", res);
      showSuccess(res.data.message);
      reset(res.data.data);
      setLogoPreview(res.data.data.logo);
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
          <School size={22} className="text-primary" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">School Profile</h2>

          <p className="text-sm text-textSecondary">
            Configure basic school identity
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(submitFnc)}
        className=" mt-5 space-y-4
          sm:mt-6"
      >
        {/* LOGO */}
        <div>
          <label
            className="
      mb-2
      block
      text-sm
      font-medium
    "
          >
            School Logo
          </label>

          <div className="flex items-center gap-5">
            {/* PREVIEW */}
            <div
              className="
                h-24
                w-24
                overflow-hidden
                rounded-2xl
                border
                border-border
                bg-background
              "
            >
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="School Logo"
                  className="
            h-full
            w-full
            object-cover
          "
                />
              ) : (
                <div
                  className="
            flex
            h-full
            items-center
            justify-center
          "
                >
                  <School size={30} className="text-textSecondary" />
                </div>
              )}
            </div>

            {/* UPLOAD */}
            <label
              className="
                cursor-pointer
                rounded-xl
                border
                border-border
                px-4
                py-3
                text-sm
                font-medium
                transition-all
                hover:bg-background
              "
            >
              <div className="flex items-center gap-2">
                <Upload size={16} />
                Upload Logo
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>

          <p className="mt-2 text-xs text-textSecondary">
            Recommended size: 512×512 PNG
          </p>
        </div>
        {/* SCHOOL NAME */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >
            School Name
          </label>

          <input
            type="text"
            placeholder="D.P.S Public School"
            {...register("schoolName", {
              required: "School name is required",
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

          {errors.schoolName && (
            <p className="mt-1 ml-2 text-sm text-red-500">
              {errors.schoolName.message}
            </p>
          )}
        </div>

        {/* SCHOOL CODE */}
        <div>
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
            "
          >
            School Code
          </label>

          <input
            type="text"
            placeholder="DPS001"
            {...register("schoolCode")}
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
        </div>

        <div className="flex items-center gap-3 pt-5">
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
            <Phone size={22} className="text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Contact Information</h2>

            <p className="text-sm text-textSecondary">
              Configure school contact details
            </p>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Phone Number</label>

          <div className="relative">
            <Phone
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-textSecondary
              "
            />

            <input
              type="tel"
              placeholder="+91 9876543210"
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="
                w-full
                rounded-xl
                border
                border-border
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-primary
              "
            />
          </div>

          {errors.phone && (
            <p className="mt-1 ml-2 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-textSecondary
              "
            />

            <input
              type="email"
              placeholder="school@email.com"
              {...register("email", {
                required: "Email is required",
              })}
              className="
                w-full
                rounded-xl
                border
                border-border
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-primary
              "
            />
          </div>

          {errors.email && (
            <p className="mt-1 ml-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* WEBSITE */}
        <div>
          <label className="mb-2 block text-sm font-medium">Website</label>

          <div className="relative">
            <Globe
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-textSecondary
              "
            />

            <input
              type="url"
              placeholder="https://school.com"
              {...register("website")}
              className="
                w-full
                rounded-xl
                border
                border-border
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-primary
              "
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            School Address
          </label>

          <div className="relative">
            <MapPin
              size={18}
              className="
                absolute
                left-4
                top-4
                text-textSecondary
              "
            />

            <textarea
              rows={4}
              placeholder="Enter complete school address"
              {...register("address", {
                required: "Address is required",
              })}
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-border
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-primary
              "
            />
          </div>

          {errors.address && (
            <p className="mt-1 ml-2 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* SAVE BUTTON */}
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
            disabled:opacity-70
          "
        >
          {submitting ? (
            <>
              Saving... <Loader />
            </>
          ) : (
            "Save School Profile"
          )}
        </button>
      </form>
    </section>
  );
};

export default SchoolSettingsCard;
