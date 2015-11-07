var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var randomNumber = require('../modules/randomNumber');
var getName = require('../modules/getName');
var getJobLevel = require('../modules/getJobLevel');

mongoose.connect('mongodb://localhost/group_challenge_week4');

mongoose.model('Employee', new Schema({"name": String, "gender":String, "salary":String, "yearsOfService":String,
    "jobLevel":String, "isFrozen":Boolean}, {collection:'employees'}));
var Employee = mongoose.model('Employee');

router.get('/data', function(req, res){
    Employee.find({}, function(err, data){
        if(err){
            console.log("ERROR: ", err);
        }
        res.send(data);
    });
});

router.post('/generate', function(req, res, next){
    console.log(req.body);

    var numberOfEmployees = req.body.numberOfEmployees;
    var gender = req.body.gender;
    var salaryRangeMin = parseInt(req.body.salaryRangeMin);
    var salaryRangeMax = parseInt(req.body.salaryRangeMax);
    var yearsOfServiceMin = parseInt(req.body.yearsOfServiceMin);
    var yearsOfServiceMax = parseInt(req.body.yearsOfServiceMax);

    for (var i = 0; i < numberOfEmployees; i++) {
        var nameObject = getName(gender);
        var name = nameObject.name;
        var genderAdd = nameObject.gender;
        var salary = randomNumber(salaryRangeMin, salaryRangeMax);
        var yearsOfService = randomNumber(yearsOfServiceMin, yearsOfServiceMax);
        var jobLevel = getJobLevel();
        //if (jobLevel = "President") presidentBoolean = true;

        var employee = new Employee({name: name, gender: genderAdd, salary: salary, yearsOfService: yearsOfService, jobLevel: jobLevel, isFrozen: false});
        employee.save(function (err) {
            if (err) console.log('Error %s', err);
                //res.send(employee.toJSON());
            next();
        });
    }
        res.send("Generated " + i + " employees.");

});

router.delete('/delete:id', function(req, res){
    console.log("deleting...", req.params.id);

    Employee.findById(req.params.id)
        .exec(function(err, entries) {
            // changed `if (err || !doc)` to `if (err || !entries)`
            if (err || !entries) {
                console.log("error or empty...");
                res.statusCode = 404;
                res.send({});
            } else {
                console.log("removing...", err, entries);
                entries.remove(function(err) {
                    if (err) {
                        res.statusCode = 403;
                        res.send(err);
                    } else {
                        res.send({});
                    }
                });
            }
        });
});

// toggles freeze boolean
router.put('/freeze', function(req, res){
    var newIsFrozen = false;

    // find the employee and get the isfrozen bool
    Employee.findById(req.body.id, function(err, data){
        if(err){
            console.log("ERROR: ", err);
        } else {
            // toggle frozen bool
            newIsFrozen = !data.isFrozen;
            // update the employee
            Employee.update({_id: req.body.id}, {isFrozen:newIsFrozen}, function(err,data){
                if (err) console.log(err);
            });
        }
        res.send(data);
    });

});

// serves up the index page and asset files
router.get("/*", function(req,res,next){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file))
});

// export router
module.exports = router;