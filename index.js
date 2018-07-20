var express = require('express');
var cors = require('cors');
var bodyParser = require('body-Parser');
var mongoose = require('mongoose');


mongoose.connect('mongodb://<userName>:<password>@<ip>:<port>/<dbname>')
    .then(() => {

        var app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(function(req, res, next) {
            res.header("Access-Control-Methods", "*");
            res.header("Access-Control-Origin", "*");
            res.header("Access-Control-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        })
        app.use('/tasks', require('./Routes/taskRoutes'));

        var port = 9010;
        app.listen(port, function() {
            console.log('Server listening at' + port);
        })
        console.log('conntecting db');
    })
    .catch(err => {
        console.error(err);
    });