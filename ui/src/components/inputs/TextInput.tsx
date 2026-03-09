import * as React from "react";
import type { FieldError } from "react-hook-form";

// TODO: Consider refactoring EmailInput, PasswordInput, and TextInput into a generic BaseInput component to reduce duplication.
interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <label>
                {label}
                <input
                    type="text"
                    ref={ref}
                    aria-invalid={error ? 'true' : 'false'}
                    {...props}
                />
                {error && <small role="alert">{error.message}</small>}
            </label>
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;
