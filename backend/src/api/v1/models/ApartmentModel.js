const { query } = require('../../../config/database');
// const wwsService = require('../services/wwsService'); // To be used for create/update

const ApartmentModel = {
  async findAll() {
    const text = 'SELECT * FROM apartments ORDER BY created_at DESC';
    try {
      const { rows } = await query(text);
      return rows;
    } catch (err) {
      console.error('Error fetching all apartments:', err.stack);
      throw err;
    }
  },

  async findById(id) {
    const text = 'SELECT * FROM apartments WHERE id = $1';
    const values = [id];
    try {
      const { rows } = await query(text, values);
      return rows[0]; // Returns the apartment or undefined if not found
    } catch (err) {
      console.error(`Error fetching apartment with id ${id}:`, err.stack);
      throw err;
    }
  },

  // --- Placeholder methods for CUD operations ---
  // These would typically involve calling wwsService before saving

  /*
  async create(apartmentData) {
    // 1. Calculate WWS points and max rent
    // const { points, maxRent } = wwsService.calculateWWS(apartmentData);

    // 2. Construct insert query
    const { 
      title, address, city, postal_code, latitude, longitude, advertised_rent,
      description, size_m2, num_rooms, num_bedrooms, num_bathrooms, property_type,
      year_built, energy_label, availability_date, images, features, woz_value,
      kitchen_quality, bathroom_quality, outdoor_space_type, outdoor_space_m2,
      storage_space_type, storage_space_m2, heating_type, insulation_level, is_monument
    } = apartmentData;

    const text = `
      INSERT INTO apartments (
        title, address, city, postal_code, latitude, longitude, advertised_rent,
        description, size_m2, num_rooms, num_bedrooms, num_bathrooms, property_type,
        year_built, energy_label, availability_date, images, features, woz_value,
        kitchen_quality, bathroom_quality, outdoor_space_type, outdoor_space_m2,
        storage_space_type, storage_space_m2, heating_type, insulation_level, is_monument,
        wws_points, wws_max_rent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) 
      RETURNING *;
    `;
    const values = [
      title, address, city, postal_code, latitude, longitude, advertised_rent,
      description, size_m2, num_rooms, num_bedrooms, num_bathrooms, property_type,
      year_built, energy_label, availability_date, images, features, woz_value,
      kitchen_quality, bathroom_quality, outdoor_space_type, outdoor_space_m2,
      storage_space_type, storage_space_m2, heating_type, insulation_level, is_monument,
      points, // calculated wws_points
      maxRent // calculated wws_max_rent
    ];

    try {
      const { rows } = await query(text, values);
      return rows[0];
    } catch (err) {
      console.error('Error creating apartment:', err.stack);
      throw err;
    }
  },

  async update(id, apartmentData) {
    // Similar to create, calculate WWS then build dynamic SET clause
    // For simplicity, this placeholder doesn't show full dynamic query building
    // const { points, maxRent } = wwsService.calculateWWS(apartmentData);
    // ... construct SET clause and values ...
    // const text = 'UPDATE apartments SET title = $1, ..., wws_points = $N, wws_max_rent = $M, updated_at = CURRENT_TIMESTAMP WHERE id = $L RETURNING *';
    try {
      // const { rows } = await query(text, values);
      // return rows[0];
      throw new Error('Update not yet implemented');
    } catch (err) {
      console.error(`Error updating apartment with id ${id}:`, err.stack);
      throw err;
    }
  },

  async delete(id) {
    const text = 'DELETE FROM apartments WHERE id = $1 RETURNING *';
    const values = [id];
    try {
      const { rows } = await query(text, values);
      return rows[0]; // Returns the deleted apartment or undefined if not found
    } catch (err) {
      console.error(`Error deleting apartment with id ${id}:`, err.stack);
      throw err;
    }
  }
  */
};

module.exports = ApartmentModel;
