import {Link, useNavigate} from 'react-router-dom'
import {type SubmitHandler, useForm, type FieldError} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginSchema, type LoginFormData} from "@/schemas/loginSchema.ts"
import {EmailInput, PasswordInput} from '@/components/inputs/'
import {useLoginMutation} from '@/store/authnApi'

const defaultValues: LoginFormData = {
    email: '',
    password: '',
}

export default function Login() {
    const navigate = useNavigate()
    const [login, {isLoading}] = useLoginMutation()
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues,
        mode: 'onTouched',
    })


    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            await login(data).unwrap()
            console.log('Login successful')
            navigate('/dashboard')
        } catch (error: unknown) {
            console.log(error)
            const err = error as { data?: { message?: string }; status?: number }
            setError('root', {
                type: 'manual',
                message: err.data?.message || 'An unexpected error occurred. Please try again.',
            })
        }
    }

    return (
        <main>
            <article>
                <header>
                    <hgroup>
                        <h1>Login</h1>
                        <h2>Sign in to your account</h2>
                    </hgroup>
                </header>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {errors.root && (
                        <p style={{color: 'red', marginBottom: '1rem'}}>
                            {errors.root.message}
                        </p>
                    )}
                    <EmailInput
                        label="Email"
                        placeholder="email@example.com"
                        error={errors.email as FieldError}
                        {...register('email')}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        error={errors.password as FieldError}
                        {...register('password')}
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
                <footer>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </footer>
            </article>
        </main>
    )
}
