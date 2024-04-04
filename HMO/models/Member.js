const mongoose = require('mongoose');
const Vaccination = require('./Vaccination');

const memberSchema = new mongoose.Schema({
  name: { type: String, required : [true, 'Name is required']},
  IDNumber: { type: String, required: [true, 'ID Number is required'] },
  dateOfBirth: { type: Date, required: [true, 'Date of Birth is required'] },
  phone: { type: String },
  mobile: { type: String, required: [true, 'Mobile number is required'], 
  validate: [{
      validator: function(value) {
          return value.length === 10;
      },
      message: 'Mobile number must be 10 digits long'
  }]},
  dateOfPositiveTest: { type: Date },
  recoveryDate:  { type: Date},
  imageUrl: {type:String},
  vaccinations: [Vaccination.schema]

});


const Member = mongoose.model('Member', memberSchema);
module.exports = Member;