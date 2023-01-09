import passport from 'passport';
import passExtractor from 'passport-jwt';
import passJWT from 'passport-jwt';
import Signup from '../models/Signup.js';
import dotenv from 'dotenv';
dotenv.config();

const extractJwt = passExtractor.ExtractJwt;
const strategy = passJWT.Strategy;

async function passGen() {
  passport.use(
    new strategy(
      {
        secretOrKey: process.env.SEC_TOKEN,
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      },
      (jwtPayload, done) => {
        return Signup.findOne({ _id: jwtPayload })
          .then((Signup) => {
            return done(null, Signup);
          })
          .catch((err) => done(err));
      }
    )
  );
}

export default passGen;
