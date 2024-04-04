const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const Vaccination = require('../models/Vaccination');
const {getAllMembers,addMember, getMembersByDateRange, countMembersWithNoVaccinations, getMemberById, getVaccinationsByMemberId} = require('../controllers/member.controller.js');

router.get("/", getAllMembers);
router.post("/addMember", addMember);
router.get("/getMembersByDateRange", getMembersByDateRange);
router.get("/countMembersWithNoVaccinations", countMembersWithNoVaccinations);
router.get("/getMemberById/:id", getMemberById);
router.get("/getVaccinationsByMemberId/:id", getVaccinationsByMemberId)
module.exports = router;
