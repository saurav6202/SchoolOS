import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  children,
  handleClick,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={twMerge(
        clsx(
          `
          inline-flex
          items-center
          justify-center
          gap-2

          min-h-11
          w-fit

          rounded-xl

          px-4
          py-2.5

          sm:px-5
          sm:py-3

          lg:px-6

          text-sm
          sm:text-base
          font-medium

          text-white
          bg-primary

          transition-all
          duration-200

          hover:bg-primaryDark
          active:scale-[0.98]

          disabled:cursor-not-allowed
          disabled:opacity-60
          disabled:hover:bg-primary

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary/30
        `,
          className
        )
      )}
    >
      {children}
    </button>
  );
};

export default Button;