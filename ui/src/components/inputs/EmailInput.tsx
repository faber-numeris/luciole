import * as React from "react";
import type { FieldError } from "react-hook-form";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <label>
                {label}
                <input
                    type="email"
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    {...props}
                />
                {error && <small role="alert">{error.message}</small>}
            </label>
        );
    }
);

EmailInput.displayName = "EmailInput";

export default EmailInput;
