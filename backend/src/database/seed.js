const fs = require('fs');
const path = require('path');
const { pool, query } = require('../config/database');
const wwsService = require('../api/v1/services/wwsService');

const seedDataPath = path.join(__dirname, 'seedData.json');

async function seedDatabase() {
  try {
    console.log('Starting database seeding process...');

    // Read seed data from JSON file
    const seedDataRaw = fs.readFileSync(seedDataPath, 'utf-8');
    const apartmentsData = JSON.parse(seedDataRaw);

    if (!apartmentsData || apartmentsData.length === 0) {
      console.log('No seed data found. Exiting.');
      return;
    }

    console.log(`Found ${apartmentsData.length} apartments to seed.`);

    // Clear existing data from the apartments table
    console.log('Clearing existing data from apartments table...');
    await query('DELETE FROM apartments');
    // Reset sequence for primary key if it's a serial type
    // Ensure this sequence name matches your database schema exactly.
    await query('ALTER SEQUENCE apartments_id_seq RESTART WITH 1');
    console.log('Existing data cleared.');

    // Insert new data
    for (const apt of apartmentsData) {
      // Calculate WWS points and max rent
      const wwsResult = wwsService.calculateWWS({
        size_m2: apt.size_m2,
        num_rooms: apt.num_rooms,
        year_built: apt.year_built,
        energy_label: apt.energy_label,
        woz_value: apt.woz_value,
        kitchen_appliances_count: apt.kitchen_appliances_count,
        bathroom_fixtures_count: apt.bathroom_fixtures_count,
        outdoor_space_m2: apt.outdoor_space_m2,
        storage_space_m2: apt.storage_space_m2,
        heating_type: apt.heating_type,
        insulation_level: apt.insulation_level,
        is_monument: apt.is_monument,
        property_type: apt.property_type
      });

      const insertQuery = `
        INSERT INTO apartments (
          title, address, city, postal_code, 
          advertised_rent, size_m2, num_rooms, num_bedrooms, num_bathrooms, description, images, features, 
          year_built, property_type, energy_label, woz_value, 
          kitchen_appliances_count, bathroom_fixtures_count, 
          outdoor_space_m2, storage_space_m2, 
          heating_type, insulation_level, 
          is_monument, wws_points, wws_max_rent
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
          $17, $18, $19, $20, $21, $22, $23, $24, $25
        ) RETURNING id;
      `;

      const values = [
        apt.title, apt.address, apt.city, apt.postal_code,
        apt.advertised_rent, apt.size_m2, apt.num_rooms, apt.num_bedrooms, apt.num_bathrooms, apt.description, JSON.stringify(apt.images), JSON.stringify(apt.features),
        apt.year_built, apt.property_type, apt.energy_label, apt.woz_value,
        apt.kitchen_appliances_count,
        apt.bathroom_fixtures_count,
        apt.outdoor_space_m2,
        apt.storage_space_m2,
        apt.heating_type,
        apt.insulation_level,
        apt.is_monument, wwsResult.points, wwsResult.maxRent
      ];

      const result = await query(insertQuery, values);
      console.log(`Inserted apartment: ${apt.title} with ID: ${result.rows[0].id}`);
    }

    console.log('Database seeding completed successfully.');

  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exitCode = 1; // Indicate failure
  } finally {
    // Close the database connection pool
    if (pool) {
      await pool.end();
      console.log('Database pool closed.');
    }
  }
}

// Run the seeding function
seedDatabase();
