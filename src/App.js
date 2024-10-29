import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css'; // Import a CSS file for styling

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <div className="app-container">
                {isLoggedIn ? (
                    <div className="home-container">
                        <div className="welcome-section">
                            <h1>Welcome to UW, {username}!</h1>
                        </div>
                        <div className="events-section">
                            <h2>Current Events</h2>
                        </div>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    <Routes>
                        <Route 
                            path="/login" 
                            element={<Login onRegisterClick={() => Navigate('/register')} onLoginSuccess={handleLoginSuccess} />} 
                        />
                        <Route 
                            path="/register" 
                            element={<Register onLoginClick={() => Navigate('/login')} />} 
                        />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;