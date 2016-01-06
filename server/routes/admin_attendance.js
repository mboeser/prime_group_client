var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

module.exports = function (app, req, res, next) {


    app.get('/admin_attendance', isLoggedIn, function (req, res) {

        console.log('admin', req.query.date);

        var date = req.query.date;
        var results = [];

        pg.connect(connectionString.url, function (err, client, done) {

            var query = client.query("SELECT DISTINCT students.class_date, students.teacher_email, users.firstname FROM students " +
                "JOIN users ON (students.teacher_email=users.email) " +
                "WHERE students.class_date = $1", [date]);

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
