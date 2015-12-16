// load all the things we need
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
//var User = require('../models/user');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    //// used to deserialize the user

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

            clientID: process.env.CLIENT_ID || configAuth.googleAuth.clientID,
            clientSecret: process.env.CLIENT_SECRET || configAuth.googleAuth.clientSecret,
            callbackURL: process.env.CALLBACK_URL || configAuth.googleAuth.callbackURL

        },

    function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            console.log(profile.emails[0].value);
            return done(null, profile);
        });
    }
    ));
};
