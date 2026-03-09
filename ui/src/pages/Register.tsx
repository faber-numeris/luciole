import { Link, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notificationSlice';
import { registerSchema, type RegisterFormData } from '../schemas/registerSchema';
import { useRegisterMutation } from '../store/authApi';
import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';

const defaultValues: RegisterFormData = {
    email: '',
    password: '',
    confirmPassword: '',
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const {
        register: formRegister,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues,
        mode: 'onTouched',
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            await register(data).unwrap();
            dispatch(addNotification({
                id: Date.now().toString(),
                message: `A confirmation email was sent to ${data.email}.`,
                type: 'success'
            }));
            navigate('/login');
        } catch (error: unknown) {
            const err = error as { data?: { message?: string }; status?: number };
            setError('root', {
                type: 'manual',
                message: err.data?.message || 'An unexpected error occurred. Please try again.',
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

                    <EmailInput
                        label="Email"
                        placeholder="email@example.com"
                        error={errors.email}
                        {...formRegister('email')}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        error={errors.password}
                        {...formRegister('password')}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm password"
                        error={errors.confirmPassword}
                        {...formRegister('confirmPassword')}
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering…' : 'Register'}
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
