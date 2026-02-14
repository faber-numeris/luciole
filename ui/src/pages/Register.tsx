import {Link, useNavigate} from 'react-router-dom'
import * as React from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/registerSchema";
import TextInput from "../components/inputs/TextInput";
import EmailInput from "../components/inputs/EmailInput";
import PasswordInput from "../components/inputs/PasswordInput";
import { api } from "../api/api";


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
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            await api.post(import.meta.env.VITE_AUTH_API_URL, data);
            console.log('Registration successful');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration error:', error);
            setError('root', { 
                type: 'manual', 
                message: error.message || 'An unexpected error occurred. Please try again.' 
            });
        }
    };

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

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering…' : 'Register'}
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