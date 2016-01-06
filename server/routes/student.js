var pg = require('pg');
var connectionString = process.env.DATABASE_URL;

module.exports = function (app, req, res, next) {

    app.get('/student', isLoggedIn, function (req, res) {

        var studentId = req.query.student;
        var results = [];
        //console.log("This is req.query", req.query);

        pg.connect(connectionString, function (err, client, done) {

            var query = client.query("SELECT students.*, busses.*, attendance.* " +
                "FROM students " +
                "LEFT JOIN busses ON students.id = busses.id " +
                "INNER JOIN attendance ON students.id = attendance.id " +
                "WHERE students.id = $1;", [studentId]);

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

    app.put('/updateStudent/inline', isLoggedIn, function (req, res) {
        console.log("This is req.body", req.body);
        res.send(true);

        pg.connect(connectionString.url, function (err, client, done) {
            client.query("UPDATE attendance SET (*)=$1 WHERE id=$2", [value, id], function (err) {
                if (err) console.log(err);
                client.end();
            });
        });
    });

    app.put('/updateStudent', isLoggedIn, function (req, res) {
        console.log("This is req.body", req.body);
        var column = req.body['params']['column'];
        var value = req.body['params']['value'];
        var id = req.body['params']['id'];

        pg.connect(connectionString.url, function (err, client, done) {
            client.query("UPDATE attendance SET " + column + "=$1 WHERE id=$2", [value, id], function (err) {
                if (err) console.log(err);
                client.end();
                res.send(true);
            });
        });
    });

    app.put('/updateBus', isLoggedIn, function(req, res){
        var column = req.body['params']['column'];
        var value = req.body['params']['value'];
        var id = req.body['params']['id'];

        pg.connect(connectionString.url, function (err, client, done) {
            client.query("UPDATE busses SET " + column + "=$1 WHERE id=$2", [value, id], function (err) {
                if (err) console.log(err);
                client.end();
                res.send(true);
            });
        });
    });

    app.put('/updateStudentInfo', isLoggedIn, function(req, res){
        var column = req.body['params']['column'];
        var value = req.body['params']['value'];
        var id = req.body['params']['id'];

        pg.connect(connectionString.url, function (err, client, done) {
            client.query("UPDATE students SET " + column + "=$1 WHERE id=$2", [value, id], function (err) {
                if (err) console.log(err);
                client.end();
                res.send(true);
            });
        });
    });

};

// route middleware to ensure user is logged in
    function isLoggedIn(req, res, next) {
        console.log('prework loggin')
        if (req.isAuthenticated())
            return next();

        res.redirect('/');
    }
