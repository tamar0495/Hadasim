const Vaccination = require('../models/Vaccination');

exports.getAllVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({});
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
exports.addVaccination = async (req, res) => {
    const { date } = req.body;
    const {manufacturer} = req.body;

  const newVaccine = new Vaccination({
    date,
    manufacturer
  });
  try {
    const savedVaccination = await newVaccine.save();
    res.status(201).json(savedVaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
