import { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAuthStore((state) => state.role);

  const homePath = useMemo(() => {
    switch (role) {
      case "student":
        return "/student/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      case "admin":
        return "/admin/dashboard";
      default:
        return "/";
    }
  }, [role]);

  return (
    <main
      className="
        min-h-screen
        px-4 py-8
        bg-surface
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_35%)]
          absolute inset-0
        "
      />
      <div
        className="
          flex
          min-h-[calc(100vh-4rem)] max-w-5xl
          mx-auto
          items-center justify-center
        "
      >
        <section
          className="
            overflow-hidden
            w-full
            bg-card
            rounded-3xl border border-border
            shadow-card
          "
        >
          <div
            className="
              grid
              lg:grid-cols-[1.1fr_0.9fr]
            "
          >
            <div
              className="
                flex flex-col
                p-8
                justify-center gap-6
                sm:p-10
                lg:p-14
              "
            >
              <div
                className="
                  inline-flex
                  w-fit
                  px-4 py-2
                  text-sm font-medium text-amber-700
                  bg-amber-500/10
                  rounded-full border border-amber-500/20
                  items-center gap-2
                "
              >
                <AlertTriangle
                  className="
                    h-4 w-4
                  "
                />
                Page not found
              </div>

              <div
                className="
                  space-y-3
                "
              >
                <p
                  className="
                    text-sm font-medium tracking-[0.22em] text-textSecondary
                    uppercase
                  "
                >
                  Error 404
                </p>
                <h1
                  className="
                    text-4xl font-bold tracking-tight text-textPrimary
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  This page doesn’t exist.
                </h1>
                <p
                  className="
                    max-w-xl
                    text-base leading-7 text-textSecondary
                    sm:text-lg
                  "
                >
                  The link may be broken, moved, or you may have typed the wrong
                  address. Use the buttons below to get back to a safe place.
                </p>
              </div>

              <div
                className="
                  p-4
                  bg-surface/70
                  rounded-2xl border border-border
                "
              >
                <p
                  className="
                    mb-1
                    text-xs font-semibold tracking-[0.2em] text-textSecondary
                    uppercase
                  "
                >
                  Tried to open
                </p>
                <p
                  className="
                    break-all font-mono text-sm text-textPrimary
                  "
                >
                  {location.pathname}
                </p>
              </div>
            </div>

            <div
              className="
                flex overflow-hidden
                p-8
                bg-gradient-to-br from-primary/10 via-transparent to-secondary/10
                border-t border-border
                relative items-center justify-center
                lg:p-10 lg:border-l lg:border-t-0
              "
            >
              <div
                className="
                  bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_35%)]
                  absolute inset-0
                "
              />

              <div
                className="
                  flex flex-col
                  w-full max-w-sm
                  text-center
                  relative items-center
                "
              >
                <div
                  className="
                    flex
                    h-32 w-32
                    mb-6
                    bg-card
                    rounded-full border border-border
                    shadow-card
                    items-center justify-center
                    sm:h-[11.5rem] sm:w-[11.5rem]
                  "
                >
                  <div
                    className="
                      flex
                      h-24 w-24
                      bg-primary/10
                      rounded-full
                      items-center justify-center
                      sm:h-[8.5rem] sm:w-[8.5rem]
                    "
                  >
                    <span
                      className="
                        text-5xl font-black tracking-tight text-primary
                        sm:text-6xl
                      "
                    >
                      404
                    </span>
                  </div>
                </div>

                <h2
                  className="
                    text-xl font-semibold text-textPrimary
                    sm:text-2xl
                  "
                >
                  Lost, but not stuck.
                </h2>
                <p
                  className="
                    max-w-xs
                    mt-2
                    text-sm leading-6 text-textSecondary
                  "
                >
                  You can safely return home, go back one step, or head to the
                  login page.
                </p>

                <div
                  className="
                    grid grid-cols-1
                    w-full
                    mt-6
                    gap-3
                    sm:grid-cols-2
                  "
                >
                  <Link
                    to={homePath}
                    className="
                      inline-flex
                      px-5 py-3
                      text-sm font-semibold text-white
                      bg-gradient-to-r from-primary via-primary to-primary/80
                      rounded-2xl
                      transition-all shadow-md
                      items-center justify-center gap-2 duration-300 focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-primary active:scale-[0.95] hover:shadow-xl hover:brightness-110
                    "
                  >
                    Home
                  </Link>
                  <button
                    type="button"
                    className="
                      h-12 w-[11.5rem]
                      px-5
                      text-center text-textPrimary font-semibold
                      bg-white
                      rounded-2xl border border-border
                      transition-all shadow-sm
                      relative group
                      hover:ring-2 hover:ring-offset-1 hover:ring-primary

                    "
                  >
                    <div
                      className="
                        flex z-10
                        h-10 w-1/4
                        bg-gradient-to-r from-primary via-[#417af4] to-[#5a8dfb]
                        rounded-xl
                        items-center justify-center absolute left-1 top-[4px] group-hover:w-[11rem] duration-500
                      "
                      onClick={() => navigate(-1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="25px"
                        width="25px"
                      >
                        <path
                          d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                          fill="#fff"
                        />
                        <path
                          d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                          fill="#fff"
                        />
                      </svg>
                    </div>
                    <p
                      className="
                        text-sm
                        translate-x-2
                      "
                    >
                      Go Back
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
