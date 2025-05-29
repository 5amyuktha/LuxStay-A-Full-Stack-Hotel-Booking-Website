import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { ThemeContext } from '../context/themeContext';
import './Home.css'; // We'll add a CSS file for the animation

// Hero images for the sliding background - updated for wider, rectangular look
const heroImages = [
    'https://plus.unsplash.com/premium_photo-1673014202228-65e0e9064a34?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8V2lkZSUyMGx1eHVyeSUyMGJlZHJvb218ZW58MHx8MHx8fDA%3D', // Wide luxury bedroom
    'https://images.unsplash.com/photo-1675494051231-8b210c6069d2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TW9kZXJuJTIwaG90ZWwlMjByb29tJTIwd2l0aCUyMHZpZXd8ZW58MHx8MHx8fDA%3D', // Modern hotel room with view
    'https://images.unsplash.com/photo-1626868449668-fb47a048d9cb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q2xhc3NpYyUyMGhvdGVsJTIwc3VpdGV8ZW58MHx8MHx8fDA%3D', // Classic hotel suite
    'https://images.unsplash.com/photo-1672130515395-32583062f72b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8U3R5bGlzaCUyMGJlZHJvb20lMjB3aXRoJTIwYXJ0fGVufDB8fDB8fHww', // Stylish bedroom with art
    'https://images.unsplash.com/photo-1612366268272-325e246c2843?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNwYWNpb3VzJTIwbGl2aW5nJTIwYXJlYSUyMGluJTIwc3VpdGV8ZW58MHx8MHx8fDA%3D', // Spacious living area in suite
];

// Room data - URLs adjusted to remove w=3000 as it's not needed with object-fit
const rooms = [
    {
        id: 1,
        name: 'Royal Suite',
        image: 'https://plus.unsplash.com/premium_photo-1675615667752-2ccda7042e7e?fm=jpg&q=60',
    },
    {
        id: 2,
        name: 'Modern Deluxe',
        image: 'https://images.unsplash.com/photo-1619110457577-316b0a7457e5?fm=jpg&q=60',
    },
    {
        id: 3,
        name: 'Cozy Bedroom',
        image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?fm=jpg&q=60',
    },
    {
        id: 4,
        name: 'Elegant Suite',
        image: 'https://images.unsplash.com/photo-1577975142952-221c53e51a10?fm=jpg&q=60',
    },
    {
        id: 5,
        name: 'Classic Room',
        image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?fm=jpg&q=60',
    },
];

const Home = () => {
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % heroImages.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const bookRoom = (id) => {
        navigate(`/booking/${id}`);
    };

    return (
        <div
            style={{
                fontFamily: "'Georgia', serif",
                backgroundColor: theme.background,
                color: theme.text,
                minHeight: '100vh',
            }}
        >
            {/* NEW: Heading above the image slider */}
            <div style={{ textAlign: 'center', padding: '3rem 1.5rem 1rem', position: 'relative', zIndex: 3 }}>
                <h1
                    className="hero-heading-animation" // Apply the animation class
                    style={{
                        fontSize: '3.8rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        color: theme.primary, // Use theme.primary for consistency with your existing theme
                        textShadow: '2px 2px 8px rgba(0,0,0,0.3)', // Soft shadow
                    }}
                >
                    Welcome to The Grand Royale
                </h1>
                <p
                    style={{
                        fontSize: '1.4rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        // The color and font-weight for this paragraph are now controlled by Home.css
                        // to allow for more complex animations if needed.
                        // For black bold, we'll ensure this in Home.css with !important if inline styles override.
                        // However, since we're using a class, CSS should take precedence.
                        textShadow: '1px 1px 4px rgba(0,0,0,0.3)', // Soft shadow
                    }}
                >
                    Experience timeless elegance and a luxury stay crafted just for you.
                </p>
            </div>

            {/* Hero Section with sliding images */}
            <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
                <div
                    style={{
                        display: 'flex',
                        width: `${heroImages.length * 100}vw`,
                        transform: `translateX(-${currentImageIndex * 100}vw)`,
                        transition: 'transform 1s ease-in-out',
                        height: '100%',
                    }}
                >
                    {heroImages.map((src, index) => (
                        <div
                            key={index}
                            style={{
                                flex: '0 0 100vw',
                                height: '100%',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={src}
                                alt={`Luxury Hotel Suite ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* About Section */}
            <section
                style={{
                    padding: '4rem 1.5rem',
                    maxWidth: '900px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: '2.6rem',
                        marginBottom: '1rem',
                        color: theme.primary,
                        fontWeight: 'bold',
                    }}
                >
                    Classic Luxury, Modern Comfort
                </h2>
                <p
                    style={{
                        fontSize: '1.15rem',
                        lineHeight: '1.7',
                        color: 'black', // Set to black directly here for consistency
                        fontWeight: '700', // Set to bold directly here
                        maxWidth: '700px',
                        margin: '0 auto',
                    }}
                >
                    Our hotel perfectly blends classic architectural charm with world-class modern amenities.
                    Plush suites, exquisite dining, and unparalleled hospitality await your arrival.
                </p>
            </section>

            {/* Rooms Section */}
            <section
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    padding: '0 1.5rem 4rem',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}
            >
                {rooms.map(({ id, name, image }) => (
                    <div
                        key={id}
                        style={{
                            width: '280px',
                            borderRadius: '12px',
                            boxShadow: '0 6px 18px rgba(0,0,0,0.22)',
                            backgroundColor: theme.background,
                            textAlign: 'center',
                            padding: '1rem',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer',
                            color: theme.text,
                        }}
                        onClick={() => bookRoom(id)}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        aria-label={`Book ${name}`}
                    >
                        <img
                            src={image}
                            alt={name}
                            style={{
                                width: '100%',
                                height: '180px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                marginBottom: '0.75rem',
                                userSelect: 'none',
                            }}
                            draggable={false}
                        />
                        <h3
                            style={{
                                color: theme.primary,
                                marginBottom: '0.5rem',
                                fontWeight: '700',
                                fontSize: '1.25rem',
                            }}
                        >
                            {name}
                        </h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                bookRoom(id);
                            }}
                            style={{
                                backgroundColor: theme.primary,
                                color: theme.text,
                                border: 'none',
                                padding: '0.55rem 1.1rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '1rem',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = theme.accent)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.primary)}
                            aria-label={`Book Now: ${name}`}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    );
};

export default Home;