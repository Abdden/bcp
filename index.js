import express from 'express';
import mongoose from 'mongoose';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDoc from "./swagger_output.json" assert { type: "json" };
import morgan from 'morgan';
import 'dotenv/config';
import blogRoute from './routes/blog.js';
import contactRoute from './routes/contact.js';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';

// http.createServer(app).listen(3000)
// console.log("Listening at:// port:%s (HTTP)", 3000)

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));
              
const port = process.env.PORT || 5000;

try {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  }).then(() => console.log('DB Connected')).catch((error) => console.log(error));

  app.use('/', blogRoute);
  app.use('/', contactRoute);
  app.use('/', signupRoute);
  app.use('/', loginRoute);

  app.use((req, res) => res.status(400).json({
  Error: 'No Such Request/Content',
  }));

  app.listen(port, () => {
    console.log('Server has started!');
  });
} catch (error) {
  console.log(error);
}

export default app;
