var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (req, res, next) {
    console.log('module LOG', req.user.emails[0].value);

    var role = req.user.emails[0].value;
    var results = [];

    pg.connect(connectionString.url, function (err, client, done) {
        var query = client.query("SELECT role FROM users WHERE email = $1;", [role]);

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
    });
};