// src/App.js
import React, { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };

    const handleLoginClick = () => {
        setIsRegistering(false);
    };

    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <h2>Welcome {username}!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <>
                    {isRegistering ? (
                        <Register onLoginClick={handleLoginClick} />
                    ) : (
                        <Login onRegisterClick={handleRegisterClick} onLoginSuccess={handleLoginSuccess} />
                    )}
                </>
            )}
        </div>
    );
};

export default App;
