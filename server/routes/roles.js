var pg = require('pg');
var connectionString = require('../config/database.js');

module.exports = function (app, req, res, next) {

    // GET ALL

    app.get('/roles', isLoggedIn, function (req, res) {

        var results = [];

        //SQL Query > SELECT data from table
        pg.connect(connectionString.url, function (err, client, done) {
            var query = client.query("SELECT id, email, firstname, lastname, role FROM users ORDER BY lastname ASC");

            // Stream results back one row at a time, push into results array
            query.on('row', function (row) {
                results.push(row);
            });

            // After all data is returned, close connection and return results
            query.on('end', function () {
                client.end();
                return res.json(results);
            });

            // Handle Errors
            if (err) {
                console.log(err);
            }
        });


    });

    // NEW

    app.post('/roles', isLoggedIn, function (req, res) {

        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var role = req.body.role;

        //SQL Query > SELECT data from table
        pg.connect(connectionString.url, function (err, client, done) {
            client.query("INSERT INTO users (email, firstname, lastname, role) " +
                "VALUES ($1, $2, $3, $4)", [email, firstname, lastname, role],
                function (err, result) {
                    if (err) {
                        console.log("Error inserting data: ", err);
                        res.send(false);
                    }

                    res.send(true);
                });

        });
    });


    // UPDATE

    app.put('/roles', isLoggedIn, function (req, res) {
        var email = req.body.email;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var role = req.body.role;
        var id = req.body.id;

        //SQL Query > SELECT data from table
        pg.connect(connectionString.url, function (err, client, done) {
            if (err) {
                return res.status(500).json({success: false, data: err});
            }
            client.query("UPDATE users SET email=$1, firstname=$2, lastname=$3, role=$4 " +
                "WHERE id=$5", [email, firstname, lastname, role, id], function(err, response){
                    if (err) {
                        console.log ('error inserting to db', err);
                        return res.status(500).json({success: false, data: err});
                    }
                res.send(true);

            });
        });


    });

    // DELETE

    app.delete('/roles', function (req, res) {
        console.log(req);
        var email = req.query.deleteMe;
        pg.connect(connectionString.url, function (err, client, done) {

            if (err) {
                console.log(err);
                return res.status(500).json({success: false, data: err});
            }

            client.query("DELETE FROM users WHERE email=$1", [email], function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({success: false, data: err})
                }
                client.end();
                return res.send(true);
            });

        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
