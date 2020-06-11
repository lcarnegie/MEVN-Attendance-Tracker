const express = require('express');
const clubRoute = express.Router();

let CInfo = require('./club.model');

clubRoute.route('/clubs').post(function (req, res) {
    let username = req.body.user;
    //console.log(username)
    CInfo.find({user: username}, function (err, posts){
        if(err) {
          res.json(err);
        }
        res.json(posts);
    });
  });

  clubRoute.route('/add').post(function (req, res) {
    let post = new CInfo(req.body);
    console.log(req.body);
    post.save()
      .then(() => {
        res.status(200).send("account created");
        
      })
      .catch(() => {
        res.status(400).send("unable to save to database");
        
      });
  });

  clubRoute.route('/delete').post(function (req, res) {
    //console.log(req.body.id);
    CInfo.findByIdAndRemove({_id: req.body.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
  });

  clubRoute.route('/getone').post(function (req, res) {
    let username = req.body.user;
    console.log(username)
    CInfo.findOne({user: username}, function (err, posts){
        if(err) {
          res.json(err);
        }
        console.log(posts);
        res.json(posts);
    });
  });

  clubRoute.route('/getbyID').post(function (req, res) {
    //console.log(req.body.number);
    var id = req.body.number;
    //console.log(id)
    CInfo.findById(id, function (err, arr){
        if(err) {
          res.json(err);
        }
        res.json(arr);
        //console.log(arr);
    });
  });

  clubRoute.route('/getdates').post(function (req, res) {
    var username = req.body.user;
    console.log(username);
    CInfo.findOne({_id: username}, function (err, post){
        if(err) {
          res.json(err);
        }
        res.json(post);
    });
  });

  clubRoute.route('/update').post(function (req, res){

    var username = req.body.user;
    var dates = req.body.dates;

    CInfo.findOne({_id: username}, function(err, post) {
      if (!post)
        res.status(404).send("data is not found");
      else {
          //console.log(post);
          post.dates = dates;
          post.save().then(() => {
            res.json('Update complete');
        })
        .catch(() => {
              res.status(400).send("unable to update the database");
        });
      }
  });
});

module.exports = clubRoute;