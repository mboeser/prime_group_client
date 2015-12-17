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

    require('./absent.js', isLoggedIn)(app);

    require('./administration.js', isLoggedIn)(app);

    require('./roles.js', isLoggedIn)(app);

    require('./attendance.js', isLoggedIn)(app);

    require('./admin_attendance.js', isLoggedIn)(app);




    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    require('./upload.js', isLoggedIn)(app);

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    app.get('/user', isLoggedIn, function(req, res){
       res.send(req.user);
    });

    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google',
        {prompt: ['select_account'], scope: ['profile', 'email'], login_hint: 'email address'}));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }), checkRole
    );



// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
        return next();
        res.redirect('/');
    }
};


