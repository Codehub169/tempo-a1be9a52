/**
 * Woningwaarderingsstelsel (WWS) Service
 * Provides a simplified calculation for WWS points and maximum rent.
 * This is a placeholder/simplified version and NOT an official WWS calculation.
 */

const wwsService = {
  /**
   * Calculates WWS points and maximum legal rent based on apartment data.
   * @param {object} apartmentData - Object containing apartment characteristics.
   * @param {number} apartmentData.size_m2 - Surface area in square meters.
   * @param {number} apartmentData.num_rooms - Number of rooms (assumed heated).
   * @param {number} [apartmentData.woz_value] - WOZ (property tax valuation) value in EUR.
   * @param {string} [apartmentData.energy_label] - Energy label (A-G).
   * @param {number} [apartmentData.kitchen_appliances_count] - Number of quality kitchen appliances.
   * @param {number} [apartmentData.bathroom_fixtures_count] - Number of quality bathroom fixtures.
   * @param {number} [apartmentData.outdoor_space_m2] - Outdoor space (balcony/garden) in m2.
   * @param {number} [apartmentData.storage_space_m2] - Storage space in m2.
   * @param {string} [apartmentData.heating_type] - e.g., 'central', 'district'.
   * @param {string} [apartmentData.insulation_level] - e.g., 'double_glazing', 'full'.
   * @param {boolean} [apartmentData.is_monument] - If the property is a listed monument.
   * @returns {object} An object containing { points: number, maxRent: number }.
   */
  calculateWWS: (apartmentData) => {
    let points = 0;

    // Size (surface area)
    if (apartmentData.size_m2 > 0) {
      points += Math.floor(apartmentData.size_m2); // 1 point per m2
    }

    // Number of rooms (assuming heated)
    if (apartmentData.num_rooms > 0) {
      points += apartmentData.num_rooms * 5; // 5 points per room
    }

    // WOZ value
    if (apartmentData.woz_value > 0) {
      points += Math.floor(apartmentData.woz_value / 10000); // 1 point per 10k WOZ value
    }

    // Energy label
    const energyLabelPoints = {
      A: 20, B: 15, C: 10, D: 5, E: 0, F: -5, G: -10,
    };
    if (apartmentData.energy_label && energyLabelPoints[apartmentData.energy_label.toUpperCase()] !== undefined) {
      points += energyLabelPoints[apartmentData.energy_label.toUpperCase()];
    }

    // Kitchen quality (simplified: number of appliances)
    if (apartmentData.kitchen_appliances_count > 0) {
      points += apartmentData.kitchen_appliances_count * 3; // 3 points per appliance
    }

    // Bathroom quality (simplified: number of fixtures)
    if (apartmentData.bathroom_fixtures_count > 0) {
      points += apartmentData.bathroom_fixtures_count * 5; // 5 points per fixture
    }

    // Outdoor space
    if (apartmentData.outdoor_space_m2 > 0) {
      points += Math.floor(apartmentData.outdoor_space_m2 * 0.5); // 0.5 points per m2, capped at e.g. 50 points (100m2)
      points = Math.min(points, points - Math.floor(apartmentData.outdoor_space_m2 * 0.5) + Math.min(Math.floor(apartmentData.outdoor_space_m2 * 0.5), 50) );
    }

    // Storage space
    if (apartmentData.storage_space_m2 > 0) {
      points += Math.floor(apartmentData.storage_space_m2 * 0.75); // 0.75 points per m2, capped e.g. 20 points
      points = Math.min(points, points - Math.floor(apartmentData.storage_space_m2 * 0.75) + Math.min(Math.floor(apartmentData.storage_space_m2 * 0.75), 20) );
    }
    
    // Heating Type
    if (apartmentData.heating_type && (apartmentData.heating_type.toLowerCase() === 'central' || apartmentData.heating_type.toLowerCase() === 'district')) {
        points += 10;
    }

    // Insulation Level
    if (apartmentData.insulation_level) {
        if (apartmentData.insulation_level.toLowerCase() === 'full') points += 10;
        else if (apartmentData.insulation_level.toLowerCase() === 'double_glazing') points += 5;
    }

    // Monument status
    if (apartmentData.is_monument === true) {
        points += 15;
    }

    // Ensure points are not negative
    points = Math.max(0, points);

    // Simplified max rent calculation (e.g., 5.5 EUR per point - this is NOT official)
    const maxRent = parseFloat((points * 5.50).toFixed(2));

    return {
      points: Math.round(points),
      maxRent,
    };
  },
};

module.exports = wwsService;
