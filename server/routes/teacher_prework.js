var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

module.exports = function (app, req, res, next) {


    app.get('/teacher_prework', isLoggedIn,  function (req, res) {

        console.log('teacher prework',req.query.date);

        pg.connect(connectionString.url, function (err, client, done) {

            var date = req.query.date;
            var teacherEmail = req.user.emails[0]['value'];
            var results = [];

            var query = client.query("SELECT students.id, students.class_date, students.student_firstname, " +
                "students.student_lastname, students.phone1, students.teacher_email, attendance.* " +
                "FROM students " +
                "JOIN attendance ON (students.id=attendance.id) " +
                "JOIN users ON (students.teacher_email=users.email) " +
                "WHERE students.class_date = $1 AND students.teacher_email = $2;", [date, teacherEmail]);

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
    console.log('prework loggin');
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
