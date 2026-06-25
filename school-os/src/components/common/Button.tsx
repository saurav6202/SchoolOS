// ../../common/Button

import { type ReactNode } from "react";
import {twMerge} from "tailwind-merge";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, handleClick, className = "", disabled=false }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={twMerge(
        clsx(
        "flex px-6 py-3 font-medium text-white bg-primary rounded-xl transition-all justify-center items-center gap-2 hover:bg-primaryDark",
        className
      ))}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
