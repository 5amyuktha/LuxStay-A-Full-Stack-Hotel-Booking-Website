import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/themeContext'; // adjust path if needed

function Rooms() {
  const { theme } = useContext(ThemeContext);  // Get theme from context
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rooms'); // adjust backend URL if needed
        if (!res.ok) throw new Error(`Failed to fetch rooms. Status: ${res.status}`);
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem', color: theme.text }}>Loading rooms...</p>;
  if (error) return <p style={{ textAlign: 'center', marginTop: '2rem', color: theme.accent }}>Error: {error}</p>;

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem',
        fontFamily: "'Georgia', serif",
        color: theme.text,
        backgroundColor: theme.background,
        padding: '1rem',
        borderRadius: '12px',
      }}
    >
      {rooms.map((room) => (
        <div
          key={room.id}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: `0 4px 15px ${theme.accent}33`, // slightly transparent accent shadow
            backgroundColor: theme.background,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <img
            src={room.image_url}
            alt={room.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '1rem', flexGrow: 1 }}>
            <h2 style={{ margin: '0 0 0.5rem', color: theme.primary, fontSize: '1.3rem' }}>{room.name}</h2>
            <p style={{ fontSize: '0.9rem', color: theme.accent, marginBottom: '0.8rem' }}>{room.description}</p>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: theme.text }}>
              ${Number(room.price).toFixed(2)} / night
            </p>
            <p style={{ color: theme.accent }}>⭐ {room.rating}/5.0</p>
          </div>
          <button
            onClick={() => navigate(`/booking/${room.id}`)}
            style={{
              backgroundColor: theme.primary,
              color: theme.text,
              border: 'none',
              padding: '12px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%',
              transition: 'background-color 0.3s ease',
              fontFamily: "'Georgia', serif",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = theme.accent)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = theme.primary)}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
