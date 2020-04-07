const express = require('express');
const loginRoute = express.Router();

let LInfo = require('./user.model');

loginRoute.route('/add').post(function (req, res) {
  console.log(req.body);
  var username = req.body.user;
  LInfo.findOne({user: username},
    function(err, user){
      console.log(user);
  if(user == null){
    let post = new LInfo(req.body);  
    post.dates = [];
    console.log(post);
    post.save()
    .then(() => {
      res.status(200).send("Account added successfully");
    })
    .catch(() => {
      res.status(400).send("Unable to save to database");
    });
  }
  else {
    res.json(user);
    console.log("user");
  }
});
});

loginRoute.route('/post').post(function (req, res) {
    //console.log(req);
    //console.log(res);
    var username = req.body.user;
    var password = req.body.pass;
    console.log(username);
    console.log(password);
      LInfo.findOne({user: username, pass: password},
        function(err, user){
          console.log(user);
      if(!user){
        res.json(null);
        console.log("err");
      }
      else {
        res.json(user);
        console.log("user");
      }
    });
  });


  loginRoute.route('/getdates').post(function (req, res) {
    var username = req.body.user;
    LInfo.findOne({user: username}, function (err, post){
        if(err) {
          res.json(err);
        }
        res.json(post);
    });
  });

  loginRoute.route('/update').post(function (req, res){

    var username = req.body.user;
    var dates = req.body.dates;

    Att.findOne({user: username}, function(err, post) {
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
module.exports = loginRoute;