import { Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../api/api";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import { capitalize } from "../utils/string";

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changing, setChanging] = useState(false);
  const [showRecomendation, setShowRecomendation] = useState(false);

  const userId = useAuthStore((state) => state.user?.userId);
  const user = useAuthStore((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    mode: "onChange",
    defaultValues: { currentPassword: user?.userId || "" },
  });

  useEffect(() => {
    if (user?.userId) {
      setValue("currentPassword", user.userId);
    }
  }, [user, setValue]);

  const newPassword = watch("newPassword");
  const navigate = useNavigate();
  const updateMustChangePassword = useAuthStore(
    (state) => state.updateMustChangePassword,
  );

  const password = watch("newPassword") || "";
  const confirmPassword = watch("confirmPassword") || "";

  const passwordChecks = {
    length: password.length >= 6,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
    upper: /[A-Z]/.test(password),
  };

  const passedChecks = Object.values(passwordChecks).filter(Boolean).length;

  const passwordStrength =
    passedChecks === 0
      ? {
          text: "",
          width: "0%",
          color: "",
        }   
      : passedChecks <= 2
        ? {
            text: "Weak",
            width: "33%",
            color: "bg-red-500",
          }
        : passedChecks <= 3
          ? {
              text: "Medium",
              width: "66%",
              color: "bg-yellow-500",
            }
          : {
              text: "Strong",
              width: "100%",
              color: "bg-green-500",
            };

  const handleFormSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    setChanging(true);
    try {
      console.log("change password hit");
      console.log(data, "userId: ", userId);
      const res = await api.post("/api/auth/change-password", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      console.log("res: ", res);

      if (res.status === 200) {
        updateMustChangePassword(false);

        showSuccess("Password updated successfully. Redirecting...");

        setTimeout(() => {
          navigate("/");
        }, 1200);
      } else {
        navigate("/change-password");
      }
    } catch (error) {
      showError("Incorrect current password")
      console.error(error);
    } finally {
      setChanging(false);
    }
  };

  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        py-10
        bg-gradient-to-br
        from-[#EFF6FF]
        via-white
        to-[#DBEAFE]
        relative
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[450px]
          h-[450px]
          bg-primary/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[450px]
          h-[450px]
          bg-blue-300/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
            relative
            z-10
            w-full
            max-w-7xl
            grid
            lg:grid-cols-2
            gap-8
            items-center
          bg-white/50
          rounded-[32px]
          overflow-hidden
          border
          border-border
          
          "
      >
        <div className="hidden lg:block">
          <div
            className="
              p-10
            "
          >
            <div className="flex gap-3 items-center p-4 py-2">
              <img
                src={logo}
                alt="D.P.S Public school Logo"
                className="h-20 "
              />

              <div>
                <h2 className="font-bold text-xl text-textPrimary">
                  DPS Public School
                </h2>
                <p className="text-textSecondary text-sm">
                  Secure Your Account
                </p>
              </div>
            </div>

            <h1
              className="
                mt-8
                text-4xl
                font-bold
                text-textPrimary
              "
            >
              Welcome,
              <br />
              {user?.name}
            </h1>

            <p
              className="
                  mt-4
                  text-lg
                  text-textSecondary
                  leading-relaxed
                "
            >
              This is your first login. Create a secure password to protect your
              account before accessing the school portal.
            </p>

            <div
              className="
                mt-8
                rounded-2xl
                bg-primary/5
                border
                border-primary/10
                p-5
              "
            >
              <h3 className="font-semibold">Account Information</h3>

              <div className="mt-4 space-y-2">
                <p>
                  <span className="text-textSecondary">
                    {capitalize(user?.role!)} Name:
                  </span>{" "}
                  {capitalize(user?.name!)}
                </p>

                <p>
                  <span className="text-textSecondary">ID:</span>{" "}
                  {user?.userId}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span>Password Strength</span>

                <span
                  className={
                    passwordStrength.text === "Strong"
                      ? "text-green-600"
                      : passwordStrength.text === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }
                >
                  {passwordStrength.text}
                </span>
              </div>

              <div className="h-3 bg-border rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                  style={{
                    width: passwordStrength.width,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="
          p-8
          bg-primaryLight/20
          md:p-10
        "
        >
          {/* Icon */}
          <div
            className="
            w-16
            h-16
            mx-auto
            rounded-2xl
            bg-primary
            flex
            items-center
            justify-center
          "
          >
            <ShieldCheck size={30} className="text-white" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2
              className="
                text-3xl
                font-bold
                text-textPrimary
              "
            >
              Secure Your Account
            </h2>

            <p
              className="
                mt-3
                text-textSecondary
              "
            >
              Create a strong password before continuing.
            </p>
          </div>
          {/* Form */}
          <form
            className="mt-8 space-y-5"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            {/* Current Password */}
            <div>
              <label
                className="
                text-sm
                font-medium
                text-textPrimary
              "
              >
                Current Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  {...register("currentPassword", {
                    required: "Current password field is required",
                  })}
                  className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-border
                  outline-none
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  transition-all
                "
                />

                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-textSecondary
                "
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label
                className="
                text-sm
                font-medium
                text-textPrimary
              "
              >
                New Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword", {
                    required: "Please enter your new password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  onFocus={() => setShowRecomendation(true)}
                  onBlur={() => setShowRecomendation(false)}
                  className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-border
                  outline-none
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  transition-all
                "
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-textSecondary
                "
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}

              <div
                className={`
                  rounded-2xl
                  space-y-2
                  text-sm
                  transition-all
                  duration-300
                  ease-out
                  mt-1
                  ml-2
                  ${showRecomendation ? "h-28" : "h-0 overflow-hidden p-0"}
            `}
              >
                <p
                  className={
                    passwordChecks.length
                      ? "text-green-600"
                      : "text-textSecondary"
                  }
                >
                  ✓ Minimum 6 characters
                </p>

                <p
                  className={
                    passwordChecks.letter
                      ? "text-green-600"
                      : "text-textSecondary"
                  }
                >
                  ✓ Contains letters
                </p>

                <p
                  className={
                    passwordChecks.number
                      ? "text-green-600"
                      : "text-textSecondary"
                  }
                >
                  ✓ Contains numbers
                </p>

                <p
                  className={
                    passwordChecks.upper
                      ? "text-green-600"
                      : "text-textSecondary"
                  }
                >
                  ✓ One uppercase letter
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="
                text-sm
                font-medium
                text-textPrimary
              "
              >
                Confirm Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Password do not match",
                  })}
                  className="
                  w-full
                  px-5
                  py-4
                  rounded-2xl
                  border
                  border-border
                  outline-none
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                  transition-all
                "
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-textSecondary
                "
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {confirmPassword && (
                <p
                  className={`text-sm mt-2 ${
                    confirmPassword === password
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {confirmPassword === password
                    ? "✓ Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={changing}
              className="
              group
              w-full
              py-4
              rounded-2xl
              bg-primary
              text-white
              font-medium
              transition-all
              duration-300
              hover:shadow-xl
              hover:scale-[1.01]
              cursor-pointer
            "
            >
              {changing ? (
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="
                      h-5
                      w-5
                      rounded-full
                      border-2
                      border-white
                      border-t-transparent
                      animate-spin
                    "
                  />
                  Updating Password...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Update Password
                  <ArrowRight size={18} />
                </div>
              )}
            </button>
          </form>

          <div
            className="
        mt-6
        text-center
        text-xs
        text-textSecondary
        "
          >
            After changing your password, you'll be redirected to your
            dashboard.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
