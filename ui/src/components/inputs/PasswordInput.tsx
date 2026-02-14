import * as React from "react";
import type { FieldError } from "react-hook-form";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <label>
                {label}
                <input
                    type="password"
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    {...props}
                />
                {error && <small role="alert">{error.message}</small>}
            </label>
        );
    }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
