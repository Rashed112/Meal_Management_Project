import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';

// routers
import authRouter from './routes/authRouter.js';

// middleware
import { authenticateUser } from './middleware/authMiddleware.js';

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}