var pg = require('pg');
var connectionString = require('../config/database.js');

var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var type = upload.single('file');
var fs = require('fs');
var copyFrom = require('pg-copy-streams').from;


module.exports = function (app, path, req, res, next) {

    app.post('/upload', type, function (req, res, next) {
        console.log(req.file);
        //The file sent by the client is coming through on type. And being stored in the uploads folder on the root as specified in the required vars above.
        //tmp_path is finding the stored file. Multer is making it available on req.file. The full path to the file + file name is in req.file.path.
        var tmp_path = req.file.path;
        var target_path ='uploads/' + req.file.name;

        //file system reads and writes the uploaded file so server can use it.
        fs.readFile(tmp_path, function (err, data) {
            fs.writeFile('uploads/students.csv', data, function (err) {
                //pg.connect is in the callback of the write to make certain that all of the database calls occur after the
                //fs has written all of the files.
                pg.connect(connectionString.url, function(err, client, done) {
                    if (err) console.log(err);
                    //Drop new vals if it exists. Create a new newvals table.
                    client.query("DROP TABLE IF EXISTS newvals;" +
                        "CREATE TEMPORARY TABLE newvals(id varchar, firstname varchar, lastname varchar, phone1 varchar, phone2 varchar, email varchar, grade integer, street varchar, city varchar, state varchar, zip integer, class_date date, teacher_email varchar)",
                        function (err, result) {
                            if (err) console.log("This is a table creation error", err);

                            //use fs to create a filestream to feed the info in csv to newvals table. The FROM STDIN is saying this is a copy from client.
                            //CSV HEADER very important because lets system know it is a csv file with a comma delimiter, table columns in header.
                            var stream = client.query(copyFrom("COPY newvals FROM STDIN DELIMITER ',' CSV HEADER"));
                            var fileStream = fs.createReadStream('uploads/students.csv');
                            fileStream.on('error', done);
                            fileStream.pipe(stream)
                                .on('error', done)
                                .on('finish', function (err, result){
                                    //yet another callback. All other calls will be made after the filestream is done and values in csv fully copied to newvals table.
                                    if (err) console.log(err);
                                    client.query(
                                        //All current values that exist in both newvals and students updated to newvals values in students.
                                        "UPDATE students " +
                                        "SET firstname=newvals.firstname, lastname=newvals.lastname, phone1=newvals.phone1, phone2=newvals.phone2, email=newvals.email, grade=newvals.grade, street=newvals.street, city=newvals.city, state=newvals.state, zip=newvals.zip, class_date=newvals.class_date, teacher_email=newvals.teacher_email " +
                                        "FROM newvals " +
                                        "WHERE newvals.id = students.id;" +
                                            //All values not in newvals but on students are deleted from students.

                                        "DELETE FROM students " +
                                        "WHERE NOT EXISTS ( " +
                                        "SELECT * " +
                                        "FROM newvals " +
                                        "WHERE newvals.id=students.id " +
                                        "); " +
                                            //All values on newvals but not on students added to students.

                                        "INSERT INTO students " +
                                        "SELECT newvals.id, newvals.firstname, newvals.lastname, newvals.phone1, newvals.phone2, newvals.email, newvals.grade, newvals.street, newvals.city, newvals.state, newvals.zip, newvals.class_date, newvals.teacher_email " +
                                        "FROM newvals " +
                                        "LEFT OUTER JOIN students ON (students.id = newvals.id) " +
                                        "WHERE students.id IS NULL " +
                                        "RETURNING students.id; ",
                                        //Return added student ids so that they can be added to the bus table if MS.
                                        //Another callback function. Once students table is fully copied from newvals,
                                        //busses table and attendance tables can be updated.
                                        function (err, result) {
                                            if (err) console.log("This is err", err);
                                            var addedstudents = "";

                                            //for loop and following if statement place all of the returned student ids
                                            //into addedstudents.
                                            for(var i=0; i<result.rows.length; i++){
                                                addedstudents += "," + "'" + (result.rows[i].id) + "'";
                                            }
                                            if(addedstudents.charAt(0) === ',')
                                                addedstudents = addedstudents.slice(1);
                                            console.log("This is added students", addedstudents);

                                            //Begin updating busses table.
                                            //if there are no added students, do nothing to busses table.
                                            if(addedstudents == ""){
                                                console.log("no added students");
                                            }else{
                                                //If there are added students, put their ids in busses table if grade 8 or less.
                                                client.query("INSERT INTO busses (id) " +
                                                    "SELECT id FROM students " +
                                                    "WHERE id IN (" + addedstudents + ") " +
                                                    "AND grade < 9;"), function(err){
                                                    if (err) console.log(err)
                                                    client.end();
                                                };
                                            }

                                            //Begin updating attendance table. Take all ids from students, place in attendance.
                                            client.query("DELETE FROM attendance; " +
                                                "INSERT INTO attendance (id) " +
                                                "SELECT id FROM students;"), function(err){
                                                if (err) console.log(err);
                                                client.end();
                                            };

                                        });
                                });
                        });
                });
            });
        });

    });
};
