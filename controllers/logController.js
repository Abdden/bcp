import Login from '../models/Login.js';
import Signup from '../models/Signup.js';
import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class LogController {
  static async logOne(req, res) {
    const user = await Signup.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Email Is Wrong');
    }
    const userPass = await bcrypt.compare(req.body.password, user.password);
    if (!userPass) {
      return res.status(400).send('Password Is Wrong');
    }

    const token = Jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.SEC_TOKEN);
    const returnedUser = {
      username: user.name,
      useremail: user.email,
      // usertoken: token,
    };
    res.header('auth-token', token).send(returnedUser);

    // try {
    //   const { email, password } = req.body;
    //   const log = new Login({
    //     email,
    //     password,
    //   });

    //   await log.save();
    //   res.status(200);
    // } catch (error) {
    //   return res.status(500).json({ error: 'Internal Server Error' });
    // }
  }

  static async viewUsers(req, res) {
    try {
      const logs = await Login.find();
      return res.status(200).json({ logs });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default LogController;
