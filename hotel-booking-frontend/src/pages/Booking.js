import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext';
import { AuthContext } from '../context/AuthContext'; // Still needed for the token

const roomData = {
    1: { name: 'Single Deluxe', price: 80 },
    2: { name: 'Double Suite', price: 120 },
    3: { name: 'Luxury Suite', price: 250 },
    4: { name: 'Family Room', price: 150 },
};

function Booking() {
    const { theme } = useContext(ThemeContext);
    const { authToken } = useContext(AuthContext); // Only need authToken for the header
    const { roomId } = useParams();
    const room = roomData[roomId];

    const [name, setName] = useState(''); // Re-introduced
    const [email, setEmail] = useState(''); // Re-introduced
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [message, setMessage] = useState('');

    if (!room) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', fontFamily: "'Georgia', serif", color: theme.text }}>
                <h1 style={{ color: theme.primary }}>Room Not Found</h1>
            </div>
        );
    }

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!name || !email || !checkIn || !checkOut || !guests) {
            setMessage('❌ Please fill in all required fields.');
            return;
        }

        const bookingData = {
            room_id: parseInt(roomId),
            name, // Included again
            email, // Included again
            check_in: checkIn,
            check_out: checkOut,
            guests: parseInt(guests),
        };

        try {
            const response = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`, // Still send token for protected route
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Booking failed. Unknown error.');
            }

            setMessage(`✅ Booking confirmed for ${room.name} from ${checkIn} to ${checkOut} for ${guests} guest(s).`);

            setName('');
            setEmail('');
            setCheckIn('');
            setCheckOut('');
            setGuests(1);
        } catch (err) {
            console.error('Booking error:', err);
            setMessage(`❌ Booking failed. ${err.message}`);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        border: `1px solid ${theme.accent}`,
        marginBottom: '1rem',
        fontFamily: "'Georgia', serif",
        color: theme.primary, // Input text color
        backgroundColor: theme.inputBackground || '#fff',
    };

    const labelStyle = {
        color: '#333', // Hardcoded dark color for readability
        fontWeight: '600',
        display: 'block',
        marginBottom: '0.4rem',
        fontFamily: "'Georgia', serif",
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: theme.primary,
        color: theme.buttonText || '#fff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontFamily: "'Georgia', serif",
        transition: 'background-color 0.3s ease',
    };

    return (
        <div
            style={{
                maxWidth: '550px',
                margin: '3rem auto',
                padding: '2rem',
                background: theme.background,
                borderRadius: '12px',
                boxShadow: `0 0 15px ${theme.accent}`,
                fontFamily: "'Georgia', serif",
                color: theme.text,
            }}
        >
            <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: theme.primary }}>
                Book: {room.name}
            </h1>
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: theme.accent }}>
                Price per night: <strong>${room.price}</strong>
            </p>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.6rem',
                    marginBottom: '1.5rem',
                    color: theme.accent,
                    fontSize: '0.95rem',
                }}
            >
                {[
                    { icon: '🛏️', label: 'Comfortable Beds' },
                    { icon: '📶', label: 'Free Wi-Fi' },
                    { icon: '🛁', label: 'En-suite Bathroom' },
                    { icon: '☕', label: 'Coffee Maker' },
                    { icon: '📺', label: 'Flat Screen TV' },
                ].map((feature, idx) => (
                    <span
                        key={idx}
                        title={feature.label}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.3rem 0.8rem',
                            backgroundColor: theme.inputBackground || '#f6e7d7',
                            borderRadius: '20px',
                            userSelect: 'none',
                        }}
                    >
                        <span>{feature.icon}</span> {feature.label}
                    </span>
                ))}
            </div>

            <form onSubmit={handleBooking}>
                <label style={labelStyle}>Name:</label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={inputStyle}
                    autoComplete="name"
                />
                <label style={labelStyle}>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    autoComplete="email"
                />
                <label style={labelStyle}>Check-In Date:</label>
                <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Check-Out Date:</label>
                <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                    style={inputStyle}
                />
                <label style={labelStyle}>Guests:</label>
                <input
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                    style={inputStyle}
                />

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.secondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
                >
                    Confirm Booking
                </button>
            </form>

            {message && (
                <div
                    style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        backgroundColor: message.startsWith('✅') ? '#e6ffed' : '#ffe6e6',
                        color: message.startsWith('✅') ? '#2e7d32' : '#c62828',
                        borderRadius: '6px',
                        fontFamily: "'Georgia', serif",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}

export default Booking;