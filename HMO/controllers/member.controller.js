const Member = require('../models/Member');
const moment = require('moment');

// Function to get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get a member by Id
exports.getMemberById = async (req, res) => {
  const memberId = req.params.id;
  try {
    const member = await Member.findById(memberId);
    if (!member)
      return res.status(404).json({ message: 'Member not Found' });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Function to add a new member
exports.addMember = async (req, res) => {
  const { name, IDNumber, dateOfBirth, phone, mobile, dateOfPositiveTest, recoveryDate } = req.body;

  // Create a new member instance
  const newMember = new Member({
    name,
    IDNumber,
    dateOfBirth,
    phone,
    mobile,
    dateOfPositiveTest,
    recoveryDate
  });

  try {
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get vaccinations by member id
exports.getVaccinationsByMemberId = async (req, res) => {
  let vaccinations = [];
  const memberId = req.params.id;
  try {
    const member = await Member.findById(memberId);
    if (!member)
       res.status(404).json({ message: 'Member not Found' });
    vaccinations = member.vaccinations;
    res.status(200).json(vaccinations);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
};

exports.countMembersWithNoVaccinations = async (req, res) => {
  try {
    const members = await Member.find({});
    let notVaccinated = 0;
    members.forEach(m => {
      if (m.vaccinations.length === 0) {
        notVaccinated++;
      }
    });

    res.status(200).json(notVaccinated);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}

exports.getMembersByDateRange = async (req, res) => {
  try {
    // Get the date of one month ago
    const startDate = moment().subtract(1, 'months').startOf('day').toDate();

    // Get the current date
    const endDate = moment().endOf('day').toDate();

    // Query to find members within the date range and matching the criteria
    const members = await Member.find({
      dateOfPositiveTest: { $lte: endDate },
      $or: [
        { recoveryDate: { $gt: endDate } },
        { recoveryDate: null }
      ]
    });
    // Initialize dictionary
    const membersByDay = {};

    // Iterate through each day in the past month
    for (let date = moment(startDate); date.isSameOrBefore(endDate); date.add(1, 'days')) {

      // Count members matching the criteria for each day
      const count = members.filter(member => moment(member.dateOfPositiveTest).isSameOrBefore(date) &&
        (moment(member.recoveryDate).isAfter(date) || !member.recoveryDate))

        .length;
      // Store count in dictionary with date as key
      membersByDay[date.format('YYYY-MM-DD')] = count;
      console.log(membersByDay[date.format('YYYY-MM-DD')]);

    }
    res.status(200).json(membersByDay);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
