const passport = require('passport');
const axios = require('axios');
const mongoose = require('mongoose');

const Tech = mongoose.model('techs');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/auth/whd', passport.authenticate('whd'), (req, res) => {
    res.send(req.user);
  });

  app.get('/api/whd/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/whd/current_tech', async (req, res) => {
    res.send(req.user);
    // maybe not return the api key here?
  });

  app.post('/api/whd/enrol_tech', requireLogin, async (req, res) => {
    const { firstName, lastName, apiKey } = req.body;
    const existingTech = await Tech.findByIdAndUpdate(
      req.user.id,
      {
        $set: { firstName, lastName, apiKey }
      },
      { new: true }
    );
    res.send(existingTech);
  });
};
