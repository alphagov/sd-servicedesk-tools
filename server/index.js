const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');

const keys = require('./config/keys');

require('./models/tech');
require('./services/passport');

const clientRoutes = require('./routes/clientRoutes');
const assetRoutes = require('./routes/assetRoutes');

// connect to the database
const connDb = mongoose.connect(keys.mongoURI).then(
  () => {
    console.log('Database connection successful');
  },
  err => {
    console.log(err);
  }
);

const app = express();

// app middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'sdtools',
    maxAge: 3 * 60 * 60 * 1000, // 3 hours temp while in dev
    keys: [keys.cookieKey]
  })
);

// passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

// import routes
require('./routes/authRoutes')(app);
app.use('/api/whd/clients', clientRoutes);
app.use('/api/whd/assets', assetRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5050;

app.listen(PORT);
