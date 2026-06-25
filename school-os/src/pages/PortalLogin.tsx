import {
  GraduationCap,
  Eye,
  EyeOff,
  ShieldCheck,
  User,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import api from "../api/api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { showError, showSuccess } from "../utils/toast";

type FormValues = {
  userId: string;
  password: string | number;
};

const PortalLogin = () => {
  const [role, setRole] = useState<string>("student");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const submitFnc: SubmitHandler<FormValues> = async (data) => {
    setSubmitting(true);
    const userData = {
      ...data,
      role,
    };

    try {
      const response = await api.post("/api/auth/login", userData);
      showSuccess(response.data.message);
      const { id, role } = response.data.user;
      const user = response.data.user;

      login(role, id, response.data.token, user);

      if (user.mustChangePassword) {
        navigate("/change-password");
        return;
      }

      switch (role) {
        case "student":
          navigate("/student/dashboard");
          break;

        case "teacher":
          navigate("/teacher/dashboard");
          break;

        case "admin":
          navigate("/admin/dashboard");
          break;
      }
    } catch (error: any) {
      console.log(error);

      showError(error.response.data.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <section
      className="
        flex overflow-hidden
        min-h-screen
        px-6 py-10
        bg-gradient-to-br from-[#EFF6FF] via-white to-[#DBEAFE]
        items-center justify-center relative
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          w-[500px] h-[500px]
          bg-primary/10
          rounded-full
          absolute top-0 left-0 blur-3xl
        "
      />

      <div
        className="
          w-[500px] h-[500px]
          bg-blue-300/20
          rounded-full
          absolute bottom-0 right-0 blur-3xl
        "
      />

      {/* MAIN CONTAINER */}
      <div
        className="
          z-10 overflow-hidden grid grid-cols-1
          w-full max-w-6xl
          bg-white/70
          rounded-[40px] border border-white/20
          shadow-[0_25px_80px_rgba(0,0,0,0.12)]
          relative backdrop-blur-2xl
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div
          className="
            hidden flex-col overflow-hidden
            p-12
            bg-primary
            relative justify-between
            lg:flex
          "
        >
          {/* GLOW */}
          <div
            className="
              w-96 h-96
              bg-white/10
              rounded-full
              absolute top-0 right-0 blur-3xl
            "
          />

          {/* TOP */}
          <div
            className="
              z-10
              relative
            "
          >
            <div
              className="
                flex
                w-16 h-16
                bg-white/10
                rounded-2xl
                backdrop-blur-xl items-center justify-center
              "
            >
              <GraduationCap
                size={34}
                className="
                  text-white
                "
              />
            </div>

            <h1
              className="
                mt-10
                text-5xl font-bold text-white leading-tight font-heading
              "
            >
              Welcome to D.P.S Public School
            </h1>

            <p
              className="
                max-w-md
                mt-6
                text-white/80 text-lg leading-relaxed
              "
            >
              Access your academic dashboard, assignments, attendance, notices,
              and school resources securely.
            </p>
          </div>

          {/* BOTTOM TRUST */}
          <div
            className="
              z-10 grid grid-cols-2
              relative gap-4
            "
          >
            <div
              className="
                p-5
                bg-white/10
                rounded-3xl border border-white/10
                backdrop-blur-xl
              "
            >
              <ShieldCheck
                className="
                  text-white
                "
              />

              <h3
                className="
                  mt-4
                  text-2xl font-bold text-white
                "
              >
                Secure
              </h3>

              <p
                className="
                  mt-2
                  text-white/70 text-sm
                "
              >
                Protected student and teacher portal
              </p>
            </div>

            <div
              className="
                p-5
                bg-white/10
                rounded-3xl border border-white/10
                backdrop-blur-xl
              "
            >
              <BookOpen
                className="
                  text-white
                "
              />

              <h3
                className="
                  mt-4
                  text-2xl font-bold text-white
                "
              >
                Smart
              </h3>

              <p
                className="
                  mt-2
                  text-white/70 text-sm
                "
              >
                Modern academic management system
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            p-8
            items-center justify-center
            lg:p-14
          "
        >
          <div
            className="
              w-full max-w-md
            "
          >
            {/* MOBILE LOGO */}
            <div
              className="
                flex
                mb-8
                justify-center
                lg:hidden
              "
            >
              <div
                className="
                  flex
                  w-16 h-16
                  bg-primary
                  rounded-2xl
                  items-center justify-center
                "
              >
                <GraduationCap
                  size={34}
                  className="
                    text-white
                  "
                />
              </div>
            </div>

            {/* TITLE */}
            <h2
              className="
                text-4xl font-bold text-textPrimary font-heading text-center
              "
            >
              Portal Login
            </h2>

            <p
              className="
                mt-4
                text-center text-textSecondary leading-relaxed
              "
            >
              Login to access your personalized academic dashboard.
            </p>

            {/* ROLE SELECTOR */}
            <div
              className="
                grid grid-cols-2
                mt-10 p-2
                bg-background
                rounded-2xl
              "
            >
              <button
                onClick={() => setRole("student")}
                className={`
                  flex
                  py-3
                  font-medium
                  rounded-xl
                  transition-all
                  items-center justify-center gap-2 duration-300
                  ${
                    role === "student"
                      ? "bg-primary text-white shadow-lg"
                      : "text-textSecondary"
                  }
                `}
              >
                <User size={18} />
                Student
              </button>

              <button
                onClick={() => setRole("teacher")}
                className={`
                  flex
                  py-3
                  font-medium
                  rounded-xl
                  transition-all
                  items-center justify-center gap-2 duration-300
                  ${
                    role === "teacher"
                      ? "bg-primary text-white shadow-lg"
                      : "text-textSecondary"
                  }
                `}
              >
                <BookOpen size={18} />
                Teacher
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(submitFnc)}
              className="
                mt-10 space-y-6
              "
            >
              {/* ID */}
              <div>
                <label
                  className="
                    text-sm font-medium text-textPrimary
                  "
                >
                  {role === "student" ? "Student ID" : "Teacher ID"}
                </label>

                <input
                  type="text"
                  {...register("userId", {
                    required: "User Id is Required*",
                    onChange: (e) =>
                      (e.target.value = e.target.value.toUpperCase()),
                  })}
                  placeholder={
                    role === "student"
                      ? "Enter your student ID"
                      : "Enter your teacher ID"
                  }
                  className="
                    w-full
                    mt-2 px-5 py-4
                    bg-white
                    rounded-2xl border border-border
                    transition-all
                    outline-none duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10
                  "
                />
                {errors.userId && (
                  <p className="text-red-500 ml-2 text-sm">
                    {errors.userId?.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  className="
                    text-sm font-medium text-textPrimary
                  "
                >
                  Password
                </label>

                <div
                  className="
                    mt-2
                    relative
                  "
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is Required*",
                    })}
                    className="
                      w-full
                      px-5 py-4
                      bg-white
                      rounded-2xl border border-border
                      transition-all
                      outline-none duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10
                    "
                  />
                  {errors.password && (
                    <p className="text-red-500 ml-2 text-sm">
                      {errors.password?.message}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      text-textSecondary
                      absolute top-1/2 right-5 -translate-y-1/2
                    "
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div
                className="
                  flex
                  text-sm
                  items-center justify-between
                "
              >
                <label
                  className="
                    flex
                    text-textSecondary
                    items-center gap-2
                  "
                >
                  <input type="checkbox" />
                  Remember me
                </label>

                <button
                  type="button"
                  className="
                    text-primary font-medium
                  "
                >
                  Forgot Password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                className="
                  w-full
                  py-4
                  text-white font-semibold
                  bg-primary
                  rounded-2xl
                  transition-all
                  group duration-300 hover:shadow-xl hover:scale-[1.01]
                "
              >
                {submitting ? (
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
                    Login...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Login
                    <ArrowRight size={18} />
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalLogin;
