const express = require('express');
const attendanceRoute = express.Router();

let Att = require('./attendee.model');

  attendanceRoute.route('/add').post(function (req, res) {
    let post = new Att(req.body);
    //console.log(post);
    post.save()
      .then(() => {
        res.status(200).send("account created");
        //console.log("success");
      })
      .catch(() => {
        res.status(400).send("unable to save to database");
        //console.log("fail")
      });
  });


  attendanceRoute.route('/attendees').post(function (req, res) {
    let username = req.body.user;
    //console.log(username)
    Att.find({user: username}, function (err, posts){
        if(err) {
          res.json(err);
        }
        res.json(posts);
    });
  });


  attendanceRoute.route('/getById').post(function (req, res) {
    let username = req.body.user;
    //console.log(username)
    Att.find({user: username}, function (err, posts){
        if(err) {
          res.json(err);
        }
        res.json(posts);
    });
  });


  attendanceRoute.route('/getarr').post(function (req, res) {
    //console.log(req.body.number);
    var id = req.body.number;
    //console.log(id)
    Att.findById(id, function (err, arr){
        if(err) {
          res.json(err);
        }
        res.json(arr);
        //console.log(arr);
    });
  });

  attendanceRoute.route('/post').post(function (req, res) {
    let id = req.body.id;
    let presences = req.body.presences;
    let absenses = req.body.absenses;
    Att.findById(id, function(err, post) {
    if (!post)
      res.status(404).send("data is not found");
    else {
        //console.log(post);
        post.presences = presences;
        post.absenses = absenses;
        post.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

attendanceRoute.route('/delete').post(function (req, res) {
  //console.log(req.body.id);
  Att.findByIdAndRemove({_id: req.body.id}, function(err){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});


module.exports = attendanceRoute;