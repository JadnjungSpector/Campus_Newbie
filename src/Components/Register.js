import React, { useState } from 'react';
import './stlyes.css';

const Register = ({ onLoginClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // const data = await response.text();
            setMessage('Account created successfully!'); // Success message
        } catch (error) {
            console.error('Error creating account:', error);
            setMessage('Registration failed: ' + error.message); // Error message
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Create Your Campus Newbie Account</h2>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="register-button">Create Account</button>
            </form>
            {message && <p className="register-message">{message}</p>} {/* Success or error message */}
            <button onClick={onLoginClick} className="switch-button">Already have an account? Log in</button>
        </div>
    );
};

export default Register;
