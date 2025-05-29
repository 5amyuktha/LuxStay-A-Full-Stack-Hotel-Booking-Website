import React, { useState, useContext } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/themeContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { register, isLoggedIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    // If already logged in, redirect to home
    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        const result = await register(username, email, password);

        if (result.success) {
            navigate('/login');
            alert('Registration successful! Please login.');
        } else {
            setError(result.message);
        }
    };

    const formStyle = {
        backgroundColor: theme.background,
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px',
        margin: '2rem auto',
        color: theme.text, // This will be the general text color inside the form, but labels will override this.
    };

    const inputStyle = {
        width: 'calc(100% - 20px)',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: `1px solid ${theme.primary === 'white' ? '#ddd' : theme.primary}`,
        backgroundColor: theme.accent,
        color: theme.primary, // Input text color
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        marginTop: '20px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: theme.primary,
        color: theme.text,
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const linkStyle = {
        color: theme.secondary,
        textDecoration: 'none',
        fontSize: '0.9rem',
        marginTop: '10px',
        display: 'block',
    };

    // Explicitly set label color to a dark color for readability
    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        color: '#333', // Changed to a dark gray for better contrast
        fontWeight: 'bold',
        fontSize: '1rem',
        opacity: 1,
        position: 'relative',
        zIndex: 1
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background }}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: theme.primary }}>Register</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div>
                    <label htmlFor="username" style={labelStyle}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="password" style={labelStyle}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" style={labelStyle}>Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
                >
                    Register
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <Link to="/login" style={linkStyle}>Already have an account? Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;