var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

module.exports = function (app, req, res, next) {

    app.get('/prework', isLoggedIn, function (req, res) {

        console.log('admin', req.query.date);

        var date = req.query.date;
        console.log("This is the date you requested", date);
        var results = [];

        pg.connect(connectionString, function (err, client, done) {

            var query = client.query("SELECT students.class_date, students.student_firstname, " +
                "students.student_lastname, students.phone1, students.teacher_email, attendance.*, users.firstname, users.lastname " +
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
    });

    app.put('/adminPrework', isLoggedIn, function (req, res) {

        console.log("req.body in adminPrework", req.body);
        var teachername = req.body.lastname;
        console.log(teachername);
        var studentID = req.body.id;
        var sfirstname = req.body.student_firstname;
        var slastname = req.body.student_lastname;
        var phone = req.body.phone1;
        var contact_status = req.body.contact_status;
        var admin_notes = req.body.admin_notes;
        var attend_notes = req.body.attendance_notes;

        pg.connect(connectionString.url, function (err, client) {
            //update the users table if firstname of teacher is changed
            client.query("UPDATE users " +
                "SET lastname='" + teachername +
                "' FROM students " +
                "WHERE students.id=$1 " +
                "AND users.email=students.teacher_email", [studentID],
                function (err) {
                    if (err) console.log(err);
                });

            //update the students table if student information is changed.
            client.query("UPDATE students " +
                "SET (student_firstname, student_lastname, phone1) = ($1, $2, $3) " +
                "WHERE id=$4;", [sfirstname, slastname, phone, studentID],
                function (err) {
                    if (err) console.log(err);
                });

            //update the attendance table.
            client.query("UPDATE attendance " +
                "SET (contact_status, admin_notes, attendance_notes) = ($1, $2, $3) " +
                "WHERE id=$4;", [contact_status, admin_notes, attend_notes, studentID],
                function (err) {
                    if (err) console.log(err);
                    client.end();
                });
        });
        res.send(true);
    });
};


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log('prework loggin')
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
