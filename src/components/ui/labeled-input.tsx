import * as React from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";

type LabeledInputProps = InputProps & {
    label: React.ReactNode;
    id?: string;
    labelProps?: React.ComponentProps<"label">;
    description?: React.ReactNode;
    error?: React.ReactNode;
    hideLabel?: boolean;
};

export function LabeledInput({
    id,
    name,
    label,
    labelProps,
    description,
    error,
    hideLabel = false,
    required,
    type,
    ...props
}: LabeledInputProps) {
    const inputId = React.useMemo(
        () => id ?? name ?? `input-${Math.random().toString(36).slice(2)}`,
        [id, name]
    );

    const describedBy: string[] = [];
    if (description) describedBy.push(`${inputId}-desc`);
    if (error) describedBy.push(`${inputId}-err`);


    return (
        <div className="space-y-1.5">
            <Label
                htmlFor={inputId}
                className={hideLabel ? "sr-only" : undefined}
                {...labelProps}
            >
                {label}
                {required && (
                    <span aria-hidden="true" className="text-red-600">&nbsp;*</span>
                )}
            </Label>



            <Input
                id={inputId}
                name={name}
                type={type}
                required={required}
                aria-invalid={!!error || undefined}
                aria-describedby={describedBy.length ? describedBy.join(" ") : undefined}
                {...props}
            />

            {description && (
                <p id={`${inputId}-desc`} className="text-xs text-muted-foreground">
                    {description}
                </p>
            )}
            {error && (
                <p id={`${inputId}-err`} role="alert" className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
