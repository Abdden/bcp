import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import swaggerUiExpress from 'swagger-ui-express';
import swaggerDoc from "../swagger_output.json" assert { type: "json" };
import 'dotenv/config';
import blogRoute from './routes/blog';
import contactRoute from './routes/contact.js';
import signupRoute from './routes/signup.js';
import loginRoute from './routes/login.js';
import cors from 'cors'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan('dev'))
app.use(cors({
  origin: '*'
}))
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDoc));
              
const port = process.env.PORT || 5000;

try {
  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  }).then(() =>{
    console.log('DB Is Connected');
    app.listen(port, () => {
    console.log('Server Has Started!');
  });
  }).catch((error) => console.log(error));

  app.use('/', blogRoute);
  app.use('/', contactRoute);
  app.use('/', signupRoute);
  app.use('/', loginRoute);

  app.use((req, res) => res.status(400).json({
  Error: 'No Such Request/Content',
  }));
} catch (error) {
  console.log(error);
}

export default app;
