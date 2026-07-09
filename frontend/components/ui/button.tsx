import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "default", isLoading, children, disabled, ...props },
    ref
  ) => {
    const variants: Record<string, string> = {
      default:
        "bg-brand-600 text-white hover:bg-brand-700 shadow-sm focus-visible:ring-brand-500",
      outline:
        "border border-border bg-transparent hover:bg-slate-50 text-foreground focus-visible:ring-brand-500",
      ghost: "bg-transparent hover:bg-slate-100 text-foreground",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
          variants[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
