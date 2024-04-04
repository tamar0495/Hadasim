const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
    date: {type : Date},
    manufacturer : {type : String}
  });

  const Vaccination = mongoose.model('Vaccination', vaccinationSchema);
module.exports = Vaccination;