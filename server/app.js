/**
 * Created by paigewalters on 11/6/15.
 */
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/messageboard';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.get('/data', function(req,res){
    var results = [];

    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT * FROM submission ORDER BY id ASC");

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

app.post('/data', function(req,res){
    console.log(req);

    var addedMessage = {
        "name" : req.body.name,
        "comment" : req.body.comment
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO submission (name, comment) VALUES ($1, $2) RETURNING id",
            [addedMessage.name, addedMessage.comment],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });

    });

});

app.delete('/data:id', function(req, res){

    pg.connect(connectionString, function (err, client) {
        client.query("DELETE FROM submission WHERE id = ($1)", [req.params.id], function(err, result){
            if (err) {
                console.log("Error deleting data! ", err);
                res.send(false);
            }

            res.send(true);
        });
    });
});

app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
