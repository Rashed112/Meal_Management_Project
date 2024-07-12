import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// routers
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import itemRouter from './routes/itemRouter.js';
import mealRouter from './routes/mealRouter.js';
import mealScheduleRouter from './routes/mealScheduleRouter.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/items', authenticateUser, itemRouter);
app.use('/api/v1/meals', authenticateUser, mealRouter);
app.use('/api/v1/mealschedules', authenticateUser, mealScheduleRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'hola!! not found' });
});

app.use(errorHandlerMiddleware);

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
