var express = require('express');
var router = express.Router();
var task = require('../Model/taskModel');

router.post('/addTask', (request, response) => {
    try {
        var data = request.body;
        if (data) {
            var newTask = new task(data);
            newTask.addedOn = new Date();
            newTask.save((error, result) => {
                if (error) {
                    console.log("error");
                    response.status(400).send({ "message": error });
                } else {
                    console.log(JSON.stringify(result));
                    response.status(200).send({ "message": "Task Added Successfully", "data": result });
                }
            });
        } else {
            console.log("No data found");
            response.status(409).send({ "message": "Invalid request params" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ "message": "Internal server error" });
    }
});

router.get('/fetchTask', (request, response) => {
    try {
        task.find((error, result) => {
            if (error) {
                console.log("error");
                response.status(409).send({ "message": error });
            } else {
                console.log(JSON.stringify(result));
                response.status(200).send({ "message": "Task Added Successfully", "data": result });
            }
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ "message": "Internal server error" });
    }
});


router.put('/changeStatus', (request, response) => {
    try {
        var data = request.body;
        var _id = data._id;
        if (data) {
            var query = { '_id': _id };
            var update = { $currentDate: { closedOn: true }, $set: data };
            var options = { new: true };
            task.findOneAndUpdate(query, update, options, (error, result) => {
                if (error) {
                    console.log("error");
                    response.status(400).send({ "message": error });
                } else {
                    console.log(JSON.stringify(result));
                    response.status(200).send({ "message": "Task Added Successfully", "data": result });
                }
            });
        } else {
            console.log("No data found");
            response.status(409).send({ "message": "Invalid request params" });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ "message": "Internal server error" });
    }
});


module.exports = router;