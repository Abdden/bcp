// // Registration middleware
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const UserModel = require('../model/model');

// passport.use(
//   'login',
//   new localStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password'
//     },
//     async (email, password, done) => {
//       try {
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//           return done(null, false, { message: 'User not found' });
//         }

//         const validate = await user.isValidPassword(password);

//         if (!validate) {
//           return done(null, false, { message: 'Wrong Password' });
//         }

//         return done(null, user, { message: 'Logged in Successfully' });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// const JWTstrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

// passport.use(
//   new JWTstrategy(
//     {
//       secretOrKey: 'TOP_SECRET',
//       jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// //Signup endpoint
// const express = require('express');
// const passport = require('passport');
// const jwt = require('jsonwebtoken');

// const router = express.Router();

// router.post('/signup', passport.authenticate('signup', { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: 'Signup successful',
//       user: req.user,
//     });
//   }
// );

// router.post('/login', async (req, res, next) => {
//   passport.authenticate('login', async (err, user, info) => {
//     try {
//       if (err || !user) {
//         const error = new Error('An error occurred.');

//         return next(error);
//       }

//       req.login(user, { session: false }, async (error) => {
//         if (error) return next(error);

//         const body = { _id: user._id, email: user.email };
//         const token = jwt.sign({ user: body }, 'TOP_SECRET');

//         return res.json({ token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// });

import Jwt from 'jsonwebtoken';

export function authentication(req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = Jwt.verify(token, process.env.SEC_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Credentials');
  }
}

export default authentication;
