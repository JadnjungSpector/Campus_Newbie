import React, { useState } from 'react';
import './stlyes.css'; // Import the CSS file

const Login = ({ onRegisterClick }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.text();
            setMessage(data);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage('Login failed: ' + error.message);
        }
    };

    if (isLoggedIn) {
        return <h2>Welcome {username}!</h2>;
    }

    return (
        <div className="container">
            <div className="welcome-box">
                <h1>Welcome to <span className="highlight">Campus Newbie</span></h1>
                <p>Log in below and get hyped!</p>
            </div>
            <div className="login-box">
                <form onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
                <button onClick={onRegisterClick}>First time user? Create an account</button>
            </div>
        </div>
    );
};

export default Login;
