const ApartmentModel = require('../models/ApartmentModel');

const apartmentController = {
  getAllApartments: async (req, res, next) => {
    try {
      // TODO: Implement pagination, filtering, and sorting
      const apartments = await ApartmentModel.findAll();
      res.json(apartments);
    } catch (error) {
      next(error);
    }
  },

  getApartmentById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const apartment = await ApartmentModel.findById(id);
      if (!apartment) {
        return res.status(404).json({ message: 'Apartment not found' });
      }
      res.json(apartment);
    } catch (error) {
      next(error);
    }
  },

  // Placeholder for createApartment - to be implemented later
  /*
  createApartment: async (req, res, next) => {
    try {
      // const apartmentData = req.body;
      // const newApartment = await ApartmentModel.create(apartmentData);
      // res.status(201).json(newApartment);
      res.status(501).json({ message: 'Create apartment not yet implemented' });
    } catch (error) {
      next(error);
    }
  },
  */

  // Placeholder for updateApartment - to be implemented later
  /*
  updateApartment: async (req, res, next) => {
    try {
      // const { id } = req.params;
      // const apartmentData = req.body;
      // const updatedApartment = await ApartmentModel.update(id, apartmentData);
      // if (!updatedApartment) {
      //   return res.status(404).json({ message: 'Apartment not found' });
      // }
      // res.json(updatedApartment);
      res.status(501).json({ message: 'Update apartment not yet implemented' });
    } catch (error) {
      next(error);
    }
  },
  */

  // Placeholder for deleteApartment - to be implemented later
  /*
  deleteApartment: async (req, res, next) => {
    try {
      // const { id } = req.params;
      // const deleted = await ApartmentModel.delete(id);
      // if (!deleted) {
      //   return res.status(404).json({ message: 'Apartment not found' });
      // }
      // res.status(204).send();
      res.status(501).json({ message: 'Delete apartment not yet implemented' });
    } catch (error) {
      next(error);
    }
  }
  */
};

module.exports = apartmentController;
