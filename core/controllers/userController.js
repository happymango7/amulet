import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { db } from '../db'

exports.register = (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save().then(() => {
      res.json({ success: true, message: 'Successfully created new user.' });
    })
    .catch(err => {
      // return next(err);
      res.status(401).json({success: false, message: err.message, err: err});
    });
  }
}


exports.signin = (req, res) => {
  const user = db.get('users').find({email: req.body.email}).value();
  if (!user) {
    res.send({ success: false, message: 'Authentication failed. User not found.' });
  } else {
    // Check if password matches
    new User(user).comparePassword(req.body.password, function(err, isMatch) {
      if (isMatch && !err) {
        // Create token if the password matched and no error was thrown
        const token = jwt.sign(user, config.secret, {
          expiresIn: 172800
        });
        res.json({ success: true, token:  token });
      } else {
        res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
      }
    });
  }
}


exports.verify = (req, res) => {
  // verify the existing token
  const profile = jwt.verify(req.body.token, config.secret);

  // check if the user still exists or if authorization hasn't been revoked
  if (!profile || !profile.id) {
    return res.send({
      success: false,
      path: '/admin/login'
    });
  }

  // if more than 1 days old, force login
  // iat == issued at
  if (profile.iat - new Date() > 1) {
    return res.send({
      success: false,
      path: '/admin/login'
    });
  }

  //sucsess
  res.send({
    success: true
  });
};

