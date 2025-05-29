-- Drop tables if they already exist
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS rooms;

-- Create the rooms table
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT
);

-- Create the bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    room_id INTEGER NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into rooms
INSERT INTO rooms (name, description, price, image_url) VALUES
('Single Deluxe', 'A cozy room for one person with deluxe amenities.', 80.00, 'https://via.placeholder.com/300x200?text=Single+Deluxe'),
('Double Suite', 'Spacious room for two with great views and comfort.', 120.00, 'https://via.placeholder.com/300x200?text=Double+Suite'),
('Luxury Suite', 'Top-class suite with premium facilities and large space.', 250.00, 'https://via.placeholder.com/300x200?text=Luxury+Suite'),
('Family Room', 'Perfect for family stays with multiple beds.', 150.00, 'https://via.placeholder.com/300x200?text=Family+Room');
