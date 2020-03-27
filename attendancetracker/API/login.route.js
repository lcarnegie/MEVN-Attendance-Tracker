const express = require('express');
const loginRoute = expressRouter();

let LInfo = require('./user.model');

postRoutes.route('/login').post(function (req, res) {
    console.log(req);
    var user = req.body.username;
    var pass = req.body.password;
      LInfo.findOne(
        {
            and: [{username: user}, {password: pass}]
        },
        function(err, user){
      if(err){
        res.json(err);
      }
      else {
        res.json(user);
      }
    });
  });