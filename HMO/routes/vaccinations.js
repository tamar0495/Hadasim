const express = require('express');
const {getAllVaccinations,addVaccination} = require('../controllers/vaccination.controller.js');
const router = express.Router();

router.get("/", getAllVaccinations);
router.post("/addVaccination", addVaccination);
module.exports = router;
