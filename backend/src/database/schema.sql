-- Database schema for TransparentRent application

-- Drop table if it exists to start fresh (for development)
DROP TABLE IF EXISTS apartments CASCADE;

-- Create ENUM types for specific fields if desired, or use VARCHAR
-- Example: CREATE TYPE property_type_enum AS ENUM ('Apartment', 'Studio', 'House', 'Room');
-- Example: CREATE TYPE energy_label_enum AS ENUM ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'A+', 'A++', 'A+++', 'A++++');

CREATE TABLE apartments (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    
    advertised_rent DECIMAL(10, 2) NOT NULL, -- Rent price listed by the landlord
    
    description TEXT,
    size_m2 DECIMAL(8, 2) NOT NULL, -- Surface area in square meters
    num_rooms INTEGER NOT NULL, -- Total number of rooms
    num_bedrooms INTEGER,
    num_bathrooms INTEGER,
    
    property_type VARCHAR(50), -- e.g., 'Apartment', 'Studio', 'House'
    year_built INTEGER,
    energy_label VARCHAR(10), -- e.g., 'A', 'B', 'C++'
    availability_date DATE,
    
    images JSONB, -- Array of image URLs, e.g., ['url1.jpg', 'url2.png']
    features JSONB, -- Array of text features, e.g., ['Balcony', 'Furnished', 'Pet-friendly']

    -- Fields used as input for WWS calculation
    woz_value DECIMAL(12, 2), -- WOZ-waarde
    kitchen_quality VARCHAR(50), -- Simplified: e.g., 'basic', 'standard', 'luxury' / or use kitchen_appliances_count
    kitchen_appliances_count INTEGER DEFAULT 0, -- Number of distinct appliances like oven, dishwasher etc.
    bathroom_quality VARCHAR(50), -- Simplified: e.g., 'basic', 'standard', 'luxury' / or use bathroom_fixtures_count
    bathroom_fixtures_count INTEGER DEFAULT 0, -- Number of distinct fixtures like bath, separate shower, second toilet
    outdoor_space_type VARCHAR(50), -- e.g., 'balcony', 'garden', 'rooftop_terrace', 'none'
    outdoor_space_m2 DECIMAL(8, 2) DEFAULT 0,
    storage_space_type VARCHAR(50), -- e.g., 'internal_shed', 'external_storage', 'attic', 'none'
    storage_space_m2 DECIMAL(8, 2) DEFAULT 0,
    heating_type VARCHAR(50), -- e.g., 'central_heating', 'district_heating', 'gas_heater'
    insulation_level VARCHAR(100), -- e.g., 'double_glazing', 'roof_insulation', 'wall_insulation', 'fully_insulated'
    is_monument BOOLEAN DEFAULT FALSE, -- Is the property a national or municipal monument?

    -- Calculated WWS values (to be stored)
    wws_points INTEGER, 
    wws_max_rent DECIMAL(10, 2),

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Create a trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_apartments
BEFORE UPDATE ON apartments
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Indexes for frequently queried columns
CREATE INDEX idx_apartments_city ON apartments(city);
CREATE INDEX idx_apartments_advertised_rent ON apartments(advertised_rent);
CREATE INDEX idx_apartments_size_m2 ON apartments(size_m2);
CREATE INDEX idx_apartments_wws_points ON apartments(wws_points);

COMMENT ON COLUMN apartments.advertised_rent IS 'Rent price listed by the landlord/agent.';
COMMENT ON COLUMN apartments.wws_points IS 'Calculated points based on Woningwaarderingsstelsel.';
COMMENT ON COLUMN apartments.wws_max_rent IS 'Calculated maximum legal rent based on WWS points.';
COMMENT ON COLUMN apartments.woz_value IS 'WOZ-waarde (Valuation for Property Tax).';
COMMENT ON COLUMN apartments.images IS 'JSON array of image URLs.';
COMMENT ON COLUMN apartments.features IS 'JSON array of textual features or amenities.';

-- Example of how to insert data with JSONB for images and features:
/*
INSERT INTO apartments (title, address, city, postal_code, advertised_rent, size_m2, num_rooms, images, features, woz_value, kitchen_appliances_count, wws_points, wws_max_rent)
VALUES 
('Spacious City Center Apartment', '123 Main St, Apt 4B', 'Amsterdam', '1011AB', 1800.00, 75.5, 3, 
 '["https://example.com/image1.jpg", "https://example.com/image2.jpg"]',
 '["Balcony", "Elevator", "City View" ]',
 350000, 3, 145, 797.50);
*/
