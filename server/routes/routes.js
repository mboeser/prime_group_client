// load all the things we need
var checkRole = require('../module/checkRole.js');

module.exports = function (app, path, passport) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        //console.log(res.socket); this will help determine user agent for mobile
        res.sendFile(path.join(__dirname, "../public/views/index.html"));
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
    app.get('/auth/google', passport.authenticate('google',
        {prompt: ['select_account'], scope: ['profile', 'email'], login_hint: 'email address'}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }), checkRole
        //function (req, res) {
        //    console.log(req.user.emails[0].value);
        //    if (req.user.emails[0].value === 'prime1@breakthroughtwincities.org') {
        //        res.redirect('/views/routes/admin/admin.html');
        //    } else if (req.user.role === 'teacher') {
        //        res.redirect('/views/routes/student/student.html');
        //    } else {
        //        res.redirect('/');
        //    }
        //}

    );


// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
};
