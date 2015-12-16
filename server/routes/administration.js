var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {



    app.get('/prework', function (req, res) {

        console.log('admin',req.query.date);

        var date = '2015-01-09';
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT students.class_date, students.firstname, " +
                "students.lastname, students.phone1, students.teacher_email, attendance.*, users.firstname " +
                "FROM students " +
                "JOIN attendance ON (students.id=attendance.id) " +
                "JOIN users ON (students.teacher_email=users.email) " +
                "WHERE students.class_date = $1;", [date]);

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
