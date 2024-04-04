require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const memberRoutes = require('./routes/members');
const vaccinationRoutes = require('./routes/vaccinations');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());

app.use('/members', memberRoutes);
app.use('/vaccinations', vaccinationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

