import AdminSignup from "../models/Admin.js";
import bcrypt from 'bcrypt';

export class AdminController {
  static async userOne(req, res) {
    try {
      const { name, email, password } = req.body;
      const userEmail = await AdminSignup.findOne({ email: req.body.email });
      if (userEmail) {
        return res.status(409).send('Email Already Exists');
      }
      const pasSalt = await bcrypt.genSalt(10);
      const pasHash = await bcrypt.hash(req.body.password, pasSalt);
      const user = new AdminSignup({
        name,
        email,
        password: pasHash,
      });
      await user.save();
      res.status(200).send({ User: user._id });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AdminController;
