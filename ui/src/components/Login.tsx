import {useState, useRef, useEffect} from "react"
import {useNavigate} from 'react-router-dom'
import {Fieldset, Legend} from '@headlessui/react'
import "../index.css"
import fireflyLogo from "../firefly-logo.svg"

interface FormData {
    email: string
    password: string
}

interface FormErrors {
    email?: string
    password?: string
}

export function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLoading, setIsLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastType, setToastType] = useState<'success' | 'error'>('success')

    const emailInputRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const loginTimeoutRef = useRef<number | null>(null)
    const toastTimeoutRef = useRef<number | null>(null)

    useEffect(() => {
        return () => {
            if (loginTimeoutRef.current) {
                clearTimeout(loginTimeoutRef.current)
                loginTimeoutRef.current = null
            }
            if (toastTimeoutRef.current) {
                clearTimeout(toastTimeoutRef.current)
                toastTimeoutRef.current = null
            }
        }
    }, [])


    const validateEmail = (email: string): string | undefined => {
        if (!email) return 'Email is required'
        if (!/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email format'
        return undefined
    }

    const validatePassword = (password: string): string | undefined => {
        if (!password) return 'Password is required'
        if (password.length < 6) return 'Password must be at least 6 characters'
        return undefined
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            email: validateEmail(formData.email),
            password: validatePassword(formData.password)
        }

        setErrors(newErrors)
        return !newErrors.email && !newErrors.password
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        console.log("Login attempt initiated")

        // Simulate API call
        loginTimeoutRef.current = window.setTimeout(() => {
            if (!loginTimeoutRef.current) return

            setIsLoading(false)
            setToastMessage(`Welcome to Luciole, ${formData.email}!`)
            setToastType('success')
            setShowToast(true)

            // Navigate to dashboard after successful login
            setTimeout(() => {
                navigate('/dashboard')
            }, 1500)

            // Hide toast after 3 seconds
            toastTimeoutRef.current = window.setTimeout(() => {
                if (!toastTimeoutRef.current) return
                setShowToast(false)
            }, 3000)
        }, 1000)
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({...prev, [field]: value}))

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: undefined}))
        }
    }

    useEffect(() => {
        // Focus first input when component mounts
        if (emailInputRef.current) {
            emailInputRef.current.focus()
        }
    }, [])

    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img src={fireflyLogo} alt="Luciole Logo" className="luciole-logo"/>
                        <h1>Luciole</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        <Fieldset
                            className="login-fieldset"
                            disabled={isLoading}
                        >
                            <Legend className="login-legend">
                                Sign In to Your Account
                            </Legend>

                            <div className="fieldset-content">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        ref={emailInputRef}
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        onBlur={() => setErrors(prev => ({
                                            ...prev,
                                            email: validateEmail(formData.email)
                                        }))}
                                        placeholder="Enter your email"
                                        className="form-input"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                        disabled={isLoading}
                                    />
                                    {errors.email && (
                                        <div id="email-error" className="error-message" role="alert">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        ref={passwordInputRef}
                                        type="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        onBlur={() => setErrors(prev => ({
                                            ...prev,
                                            password: validatePassword(formData.password)
                                        }))}
                                        placeholder="Enter your password"
                                        className="form-input"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                        disabled={isLoading}
                                    />
                                    {errors.password && (
                                        <div id="password-error" className="error-message" role="alert">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Fieldset>

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            New to the swarm?{" "}
                            <a href="/register" className="register-link">
                                Create an account
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div
                    className={`toast toast-${toastType}`}
                    role="alert"
                    aria-live="polite"
                >
                    {toastMessage}
                </div>
            )}
        </>
    )
}