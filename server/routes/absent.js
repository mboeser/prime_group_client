// get all students info by class date attendance_status === absent

// put update fields as needed

var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {

    app.get('/absent', isLoggedIn, function (req, res) {

        console.log('absent', req.query.date);

        var date = '2015-01-09';
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT students.id, students.firstname, " +
                "students.lastname, students.teacher_email, students.class_date, students.phone1, attendance.* " +
                "FROM students " +
                "JOIN attendance ON (students.id = attendance.id) " +
                "WHERE students.class_date = $1 AND attendance.attendance_status='absent'", [date]);

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
};
