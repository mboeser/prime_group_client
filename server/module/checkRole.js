var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

module.exports = function (req, res, next) {

    var role = req.user.emails[0].value;
    var results = [];

    pg.connect(connectionString, function (err, client, done) {

        if (err) {
            console.log('db err', err);
        }

        var query = client.query("SELECT role FROM users WHERE email = $1;", [role]);

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            console.log(results);
            if (results.length > 0 && results[0].role === 'admin' || results.length > 0 && results[0].role === 'Admin') {
                res.redirect('/views/routes/admin/admin.html');
            } else if (results.length > 0 && results[0].role === 'teacher' || results.length > 0 && results[0].role ===  'Teacher') {
                res.redirect('/views/routes/teacher/teacher.html');
            } else {
                //req.flash('messages', {'err' : 'INVALID LOGIN'});
                res.redirect('/views/error.html');
            }
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
};
