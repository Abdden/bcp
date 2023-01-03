import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import 'dotenv/config';
import blogRoute from './routes/blog.js';
import contactRoute from './routes/contact.js';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

try {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });

  app.use('/api', blogRoute);
  app.use('/api', contactRoute);
  app.use('/api', signupRoute);
  app.use('/api', loginRoute);

  app.use((req, res) => res.status(400).json({
  Error: 'No Such Request/Content',
  }));

  app.listen(port, () => {
    console.log('Server has started!');
  });
} catch (error) {
  console.log(error,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

export default app;
