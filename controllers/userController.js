import Signup from '../models/Signup.js';
import bcrypt from 'bcrypt';

export class UserController {
  static async userOne(req, res) {
    try {
      const { name, email, password } = req.body;
      const userEmail = await Signup.findOne({ email: req.body.email });
      if (userEmail) {
        return res.status(409).send('Email Already Exists');
      }
      const pasSalt = await bcrypt.genSalt(10);
      const pasHash = await bcrypt.hash(req.body.password, pasSalt);
      const user = new Signup({
        name,
        email,
        password: pasHash,
      });
      await user.save();
      return res.status(200).send({ User: user._id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async viewUsers(req, res) {
    try {
      const users = await Signup.find();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default UserController;
