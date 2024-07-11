import { Router } from 'express';
const router = Router();
import {
  getMealSchedules,
  createMealSchedule,
  updateMealSchedule,
  deleteMealSchedule,
} from '../controllers/mealScheduleController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getMealSchedules)
  .post(createMealSchedule);
router
  .route('/:id')
  .patch(updateMealSchedule)
  .delete(deleteMealSchedule);

export default router;
