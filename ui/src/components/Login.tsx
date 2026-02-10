import {useState} from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop">
                            <div className="box">
                                <h1 className="title has-text-centered">Login</h1>
                                <form>
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="email@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="********"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-primary is-fullwidth" type="submit">
                                                Sign In
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}