const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/key')
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
                // we have already a record with the given ID
                done(null, existingUser);
            }
            else {
                // we don't have record with this ID, create one
                new User({
                    googleId: profile.id,
                    name: profile.displayName,
                }).save().then(user => {
                    done(null, user);
                })
            }
        })

        // console.log('accessToken : ' ,accessToken);
        // console.log('refreshToken : ', refreshToken);
        console.log('profile : ', profile);
    }
));

// my ip
// 146.196.34.26