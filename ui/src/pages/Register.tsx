import {Link, useNavigate} from 'react-router-dom'
import * as React from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerSchema, type RegisterFormData } from "../schemas/registerSchema";
import TextInput from "../components/inputs/TextInput";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";

const defaultValues: RegisterFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};


const Register: React.FC = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    });

    const mutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            const response = await fetch(import.meta.env.VITE_AUTH_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            return response.json();
        },
        onSuccess: () => {
            console.log('Registration successful');
            navigate('/login');
        },
        onError: (error: any) => {
            console.error('Registration error:', error);
            setError('root', { 
                type: 'manual', 
                message: error.message || 'An unexpected error occurred. Please try again.' 
            });
        },
    });

    const onSubmit: SubmitHandler<RegisterFormData>
        = (data) => mutation.mutate(data);


    return (
        <main>
            <article>
                <header>
                    <hgroup>
                        <h1>Register</h1>
                        <h2>Create a new account</h2>
                    </hgroup>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {errors.root && (
                        <p style={{ color: 'red', marginBottom: '1rem' }}>
                            {errors.root.message}
                        </p>
                    )}
                    <TextInput
                        label="Username"
                        placeholder="Username"
                        error={errors.username}
                        {...register('username')}
                    />

                    <EmailInput
                        label="Email"
                        placeholder="email@example.com"
                        error={errors.email}
                        {...register('email')}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        error={errors.password}
                        {...register('password')}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm password"
                        error={errors.confirmPassword}
                        {...register('confirmPassword')}
                    />

                    <button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Registering…' : 'Register'}
                    </button>
                </form>

                <footer>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </footer>
            </article>
        </main>
    );
};

export default Register;