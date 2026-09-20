import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import AdminSignup from "../models/Admin.js";
import Contact from "../models/Contact.js";
import Signup from "../models/Signup.js";

let mongoServer;

const seedTestData = async () => {
  const passwordHash = await bcrypt.hash("Test123#", 10);
  const adminUser = await Signup.create({
    name: "Spirit Admin",
    email: "spirit@gmail.net",
    password: passwordHash,
  });
  await AdminSignup.create({
    name: "Spirit Admin",
    email: "spirit@gmail.net",
    password: passwordHash,
  });
  await Signup.create({
    name: "CrazyScammer",
    email: "scammer@gmail.com",
    password: passwordHash,
  });
  await Contact.create({
    names: "Existing Query",
    email: "query@gmail.com",
    subject: "DUMMY SUBJECT",
    message: "This Is a Dummy Message For The Tests...",
  });

  const adminToken = jwt.sign(
    {
      _id: adminUser._id,
      email: adminUser.email,
      name: adminUser.name,
    },
    process.env.SEC_TOKEN
  );
  process.env.AUTHKEY = `Bearer ${adminToken}`;
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongoServer.getUri();
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  await seedTestData();
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});
