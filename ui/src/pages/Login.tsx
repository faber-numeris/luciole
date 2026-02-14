import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate('/dashboard')
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
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="email@example.com" required/>
                    </label>
                    <label>
                        Password
                        <input type="password" name="password" placeholder="Password" required/>
                    </label>
                    <button type="submit">Sign in</button>
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
