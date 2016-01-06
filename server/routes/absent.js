// get all students info by class date attendance_status === absent

// put update fields as needed

var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {

    app.get('/absent', isLoggedIn, function (req, res) {

        console.log('absent', req.query.date);

        var date = req.query.date;
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT students.id, students.student_firstname, " +
                "students.student_lastname, students.teacher_email, students.class_date, students.phone1, users.lastname, attendance.* " +
                "FROM students " +
                "JOIN attendance ON (students.id = attendance.id) " +
                "JOIN users ON (students.teacher_email = users.email) " +
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
    });

    app.put('/updateAbsent', isLoggedIn, function(req, res){

        console.log("req.body in adminPrework", req.body);
        var teachername = req.body.lastname;
        var studentID = req.body.id;
        var sfirstname = req.body.student_firstname;
        var slastname = req.body.student_lastname;
        var phone = req.body.phone1;
        var contact_status = req.body.contact_status;
        var attendance_notes = req.body.attendance_notes;
        var excused = req.body.excused;
        var homework = req.body.homework_sent;


        pg.connect(connectionString.url, function(err, client){
            //update the users table if firstname of teacher is changed
            if(teachername != undefined) {
                client.query("UPDATE users " +
                    "SET lastname='" + teachername +
                    "' FROM students " +
                    "WHERE students.id=$1 " +
                    "AND users.email=students.teacher_email", [studentID],
                    function (err) {
                        if (err) console.log(err);
                    });
            }


            //update the students table if student information is changed.
            client.query("UPDATE students " +
                "SET (student_firstname, student_lastname, phone1) = ($1, $2, $3) " +
                "WHERE id=$4;", [sfirstname, slastname, phone, studentID],
                function(err){
                    if (err) console.log(err);
                });

            //update the attendance table.
            client.query("UPDATE attendance " +
                "SET (contact_status, homework_sent, excused, attendance_notes) = ($1, $2, $3, $4) " +
                "WHERE id=$5;", [contact_status, homework, excused, attendance_notes, studentID],
                function(err){
                    if (err) console.log(err);
                    client.end();
                });
        });
        res.send(true);
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
