const mongoose = require('mongoose');
const Tech = mongoose.model('techs');

module.exports = {
  authenticateUser: (req, res) => {
    res.send(req.user);
  },

  logoutUser: (req, res) => {
    req.logout();
    res.redirect('/');
  },

  currentUser: (req, res) => {
    res.send(req.user);
    // maybe not return the api key here?
  },

  enrolUser: async (req, res) => {
    const { firstName, lastName, apiKey } = req.body;
    const existingTech = await Tech.findByIdAndUpdate(
      req.user.id,
      {
        $set: { firstName, lastName, apiKey }
      },
      { new: true }
    );
    res.send(existingTech);
  }
};
