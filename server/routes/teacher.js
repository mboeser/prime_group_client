get // serve html


get // /classes dates per teacher email login

get // /prework lists all students for class date & teacher

// /student


var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {


    app.get('/teacher', isLoggedIn, function (req, res) {

        console.log('teacher', req.query.date);

        var date = '2015-01-09';
        var teacherEmail = 'hlutz@breakthroughtwincities.com';
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
