import { cn } from "@/lib/utils";
import * as React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? 'text' : type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />

        {type === 'password' && (
          <button
            onClick={() => { setShowPassword(!showPassword) }}
            type="button"
            className="absolute top-0 right-0 bottom-0 w-10 flex items-center justify-center">
            {showPassword
              ? <BsEyeSlashFill size={20} className="text-gray-700" />
              : <BsEyeFill size={20} className="text-gray-700" />}

          </button>

        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
