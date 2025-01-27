import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./lib/utils"; // Ensure you have a utility for classNames

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = "default", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "px-4 py-2 rounded text-white font-semibold transition",
          variant === "outline" ? "border border-white bg-transparent" : "bg-blue-500 hover:bg-blue-600",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
