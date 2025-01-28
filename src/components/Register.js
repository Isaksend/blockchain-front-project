import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== retypePassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setSuccess('Registration successful! You can now sign in.');
            navigate("/signin");
        } catch (err) {
            setError(err.message);
        }
    };
    return(
        <div>
            <div className="signin-container">
                <div className="signin-box">
                    <h2 className="signin-title">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Aitu email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="retypePassword"
                                className="form-input"
                                placeholder="Retype your password"
                                value={retypePassword}
                                onChange={(e) => setRetypePassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <div className="btnBlock">
                            <button type="submit" className="signin-button">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;