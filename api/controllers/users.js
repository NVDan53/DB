const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

module.exports = {
  create: function (req, res, next) {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }, function (err, result) {
      if (err) {
        console.log(err)
        next(err);
      } else
        res.json({
          status: "Success",
          message: "User added successfully",
          data: result
        });
    });
  },
  authenticate: function (req, res, next) {
    userModel.findOne({ email:req.body.email }, function (err, userInfo) {
      if (err) {
        console.log(err)
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '24h' });
          res.json({
            status:"Success",
            message: "User found",
            data: {
              user: userInfo,
              token: token
            }
          });
        } else {
          res.json({
            status:"Error",
            message: "Invalid email/password",
            data:null
          });
        }
      }
    });
  }
}
