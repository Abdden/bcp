import jwt from "jsonwebtoken";
// import dotenv from "dotenv"
import SignedupUser from "../models/Signup.js";
// dotenv.config();

const ComLikeMidWare = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization");
    if (!authToken) {
      res.status(401).json({ Message: "You Need To Login" });
    } else {
      const token = authToken.split(" ")[1];
      const authenticate = jwt.verify(token, process.env.SEC_TOKEN);
      const emailUser = authenticate.email;
      const nameUser = authenticate.name;
      const fromDb = await SignedupUser.findOne({ email: emailUser });
      if (!fromDb) {
        res.status(401).json({ message: "You Need To Login" });
      } else {
        res.locals.email = emailUser;
        res.locals.name = nameUser;
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};
export default ComLikeMidWare;