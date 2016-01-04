// both admin and teachers

// get students for class date & teacher & attendance status

// put update students record

var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {


    app.get('/attendance', isLoggedIn, function (req, res) {

        console.log('admin', req.query.date);

        var date = '2015-01-09';
        var teacherEmail = 'dsmith@breakthroughtwincities.org';
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT students.id, students.student_firstname, students.student_lastname, attendance.* FROM students " +
                "JOIN attendance ON (students.id = attendance.id) " +
                "WHERE students.teacher_email = $1 AND students.class_date = $2;", [teacherEmail, date]);

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
    });

    app.put('/attendance', isLoggedIn, function (req, res) {

        var attendanceQuery = "";
        for (var i = 0; i < req.body.length; i++) {
            attendanceQuery += "UPDATE attendance " +
                "SET attendance_status = '" + req.body[i].attendance_status + "' " +
                "WHERE id = '" + req.body[i].id + "'; ";
        }
        console.log(attendanceQuery);


        pg.connect(connectionString.url, function (err, client, done) {
                client.query(attendanceQuery, function (err) {

                    if (err) {
                        console.log('att err', err);
                        return res.send(false);
                    }else {
                        client.end();
                        return res.send(true);
                    }
                });
            })

        });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log('prework loggin');
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
