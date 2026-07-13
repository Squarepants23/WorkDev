import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      {...props}
      className={`
        inline-flex items-center justify-center
        rounded-xl
        px-5 py-3
        font-semibold
        transition-all
        duration-300
        hover:-translate-y-0.5
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}