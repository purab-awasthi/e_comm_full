-- PostgreSQL compatible data initialization
-- Note: PostgreSQL doesn't have FOREIGN_KEY_CHECKS like MySQL

-- Clear existing data (be careful in production!)
DELETE FROM order_items;
DELETE FROM cart_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM users;

-- Insert Default Admin User
-- Password is 'password' (bcrypt hashed)
INSERT INTO users (name, email, password, role, created_at)
VALUES ('Admin', 'admin@shop.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', CURRENT_TIMESTAMP)
ON CONFLICT (email) DO NOTHING;

-- Insert Default Products (Fixed to use real curated high-quality Unsplash image photography)
INSERT INTO products (name, description, price, image_url, stock, category, created_at, updated_at) VALUES
('MacBook Pro 16', 'Apple M2 Max chip with 12-core CPU and 38-core GPU', 2499.00, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', 10, 'Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sony WH-1000XM5', 'Industry Leading Noise Canceling Wireless Headphones', 398.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 50, 'Audio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Smart Coffee Maker', 'Wi-Fi enabled coffee maker with voice control', 149.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80', 25, 'Home Appliances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPhone 15 Pro', 'Titanium design with A17 Pro chip and advanced camera system', 1199.00, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80', 30, 'Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Samsung Galaxy S24 Ultra', 'AI-powered smartphone with S Pen and 200MP camera', 1299.00, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', 25, 'Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dell XPS 13', 'Ultra-thin laptop with Intel Core i7 and OLED display', 1299.00, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80', 15, 'Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AirPods Pro (2nd Gen)', 'Active noise cancellation and adaptive transparency', 249.00, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 40, 'Audio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bose QuietComfort 45', 'Premium wireless headphones with superior comfort', 329.00, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 35, 'Audio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sony A7R V', 'Full-frame mirrorless camera with 61MP sensor', 3899.00, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 8, 'Photography', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Canon EOS R6 Mark II', 'Professional mirrorless camera with 4K video', 2499.00, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 12, 'Photography', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Nintendo Switch OLED', 'Handheld gaming console with vibrant OLED screen', 349.00, 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=800&q=80', 20, 'Gaming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('PlayStation 5', 'Next-generation gaming console with ultra-high speed SSD', 499.00, 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=800&q=80', 15, 'Gaming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Dyson V15 Detect', 'Cordless vacuum with laser dust detection', 749.00, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', 18, 'Home Appliances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Instant Pot Duo 7-in-1', 'Electric pressure cooker, slow cooker, rice cooker, steamer', 89.99, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', 45, 'Home Appliances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Apple Watch Series 9', 'Advanced health and fitness features with GPS', 429.00, 'https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?auto=format&fit=crop&w=800&q=80', 28, 'Wearables', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Fitbit Charge 6', 'Advanced fitness tracker with built-in GPS', 179.99, 'https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?auto=format&fit=crop&w=800&q=80', 32, 'Wearables', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kindle Paperwhite', 'Waterproof e-reader with adjustable warm light', 139.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 50, 'Books & E-readers', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('iPad Pro 12.9"', 'Liquid Retina XDR display with M2 chip', 1099.00, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 22, 'Tablets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Samsung Galaxy Tab S9', 'Premium Android tablet with S Pen included', 799.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 18, 'Tablets', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Logitech MX Master 3S', 'Advanced wireless mouse with customizable buttons', 99.99, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80', 60, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mechanical Gaming Keyboard', 'RGB backlit mechanical keyboard with blue switches', 149.99, 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80', 40, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('4K Monitor 27"', 'Ultra HD monitor with 144Hz refresh rate', 449.99, 'https://images.unsplash.com/photo-1527443224154-c6a6f4460f4c?auto=format&fit=crop&w=800&q=80', 25, 'Monitors', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Wireless Charging Pad', 'Fast wireless charger compatible with all Qi devices', 29.99, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80', 80, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Bluetooth Speaker', 'Portable waterproof speaker with 360° sound', 79.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80', 55, 'Audio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Smart Home Hub', 'Voice-controlled smart home assistant with built-in display', 249.99, 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80', 30, 'Smart Home', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Robot Vacuum', 'AI-powered robotic vacuum with mapping technology', 399.99, 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80', 20, 'Home Appliances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gaming Headset', 'Surround sound gaming headset with noise-canceling mic', 129.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 45, 'Gaming', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Wireless Router', 'Wi-Fi 6 mesh router with 8 Gigabit ports', 299.99, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', 35, 'Networking', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('External SSD 1TB', 'Ultra-fast portable SSD with USB-C connection', 149.99, 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80', 40, 'Storage', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Smart Thermostat', 'Wi-Fi enabled thermostat with energy-saving features', 199.99, 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80', 25, 'Smart Home', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Fitness Tracker Band', 'Waterproof fitness band with heart rate monitoring', 49.99, 'https://images.unsplash.com/photo-1434493789847-2f02b0c4e20b?auto=format&fit=crop&w=800&q=80', 70, 'Wearables', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Digital Drawing Tablet', 'Professional drawing tablet with pressure sensitivity', 299.99, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 15, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Streaming Webcam', '4K webcam with auto-focus and low-light correction', 199.99, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', 30, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Portable Power Bank', '20,000mAh power bank with fast charging support', 59.99, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?auto=format&fit=crop&w=800&q=80', 65, 'Accessories', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;