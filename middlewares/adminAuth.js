import AdminSignup from "../models/Admin.js";
import jwt from "jsonwebtoken";

const authenticateAdmin = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    if (!authToken) {
      res.status(401).json({ Message: "You are Not Authorized" });
    } else {
      const token = authToken.split(" ")[1];
      const authenticate = jwt.verify(token, process.env.SEC_TOKEN);
      const emailUser = authenticate.email;
      const nameUser = authenticate.name;
      const exists = await AdminSignup.findOne({ email: emailUser, name: nameUser });
      if (!exists) {
        res.status(401).json({ Message: "You are Not authorized" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
export default authenticateAdmin;
