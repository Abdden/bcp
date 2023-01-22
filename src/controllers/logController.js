import Login from '../models/Login.js';
import Signup from '../models/Signup.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class LogController {
  static async logOne(req, res) {
    try {
      const user = await Signup.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send('Email Or Password Is Wrong');
      }
      const userPass = await bcrypt.compare(req.body.password, user.password);
      if (!userPass) {
        return res.status(404).send('Email Or Password Is Wrong');
      }
  
      const token = Jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.SEC_TOKEN);
      const returnedUser = {
        username: user.name,
        useremail: user.email,
        usertoken: token,
      };
      return res.status(200).send(returnedUser);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default LogController;
