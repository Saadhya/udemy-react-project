const express = require('express');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const keys = require('./config/key');
const passport = require('passport');
require('./models/users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// const authRoutes = require('./routes/authRoutes')
// authRoutes(app);
const app = express();

// enabling cookies
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
// (row)=>row._id

const PORT = process.env.PORT || 5000;
app.listen(PORT)

// app.get('/', (req, res)=>{
//     console.log('Welcome heorku ');
//     res.send({bye : 'bro'})
// });
