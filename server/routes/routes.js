module.exports = function(app, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        //console.log(res.socket); this will help determine user agent for mobile
        res.send('hello');
    });

    // PROFILE SECTION =========================
    //app.get('/profile', isLoggedIn, function(req, res) {
    //    res.render('profile.ejs', {
    //        user : req.user
    //    });
    //});

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // google ---------------------------------

    // send to google to do the authentication
//    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
//    // the callback after google has authenticated the user
//    app.get('/auth/google/callback',
//        passport.authenticate('google', {
//            successRedirect : '/profile',
//            failureRedirect : '/'
//        }));
//
//};

// route middleware to ensure user is logged in
//    function isLoggedIn(req, res, next) {
//        if (req.isAuthenticated())
//            return next();
//
//        res.redirect('/');
//    };
};
