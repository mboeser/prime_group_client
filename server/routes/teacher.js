var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {


    app.get('/teacher', isLoggedIn, function (req, res) {

        console.log('teacher', req.query.date);
        console.log("This is req.user", req.user.emails[0]['value']);

        var teacherEmail = req.user.emails[0]['value'];
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT DISTINCT class_date FROM students " +
                "WHERE teacher_email = $1;", [teacherEmail]);

            // Stream results back one row at a time, push into results array
            query.on('row', function (row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function () {
                client.end();
                console.log(results);
                return res.json(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }
        })
    })
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

