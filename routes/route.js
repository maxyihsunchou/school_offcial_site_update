var express = require('express');
var router = express.Router();

var mongoOp = require("../model/db");

/* Control Route */

router.route("/control/article/add")
    .get(function(req,res){
      res.render('control/article/articleAdd', { title: 'New Article'})
    })
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        // Add strict validation when you use this in Production.
        db.articleContent = req.body.content;
        db.articleDepartment = req.body.department;
        db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });
    /* Control Route END */

    /* Api Routes */
    router.route("/api/article")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

    router.route("/api/article/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    /* Api Routes End */

    /*Pages Routes */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    router.route("/article")
    .get(function(req,res){
        res.render('article/article', { title: 'Express' });
    });
    /*Pages Routes End */

module.exports = router;
