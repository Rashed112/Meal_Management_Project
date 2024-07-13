import { Router } from 'express';
const router = Router();
import {
  getMealSchedules,
  createMealSchedule,
  updateMealSchedule,
  deleteMealSchedule,
  getTodayMealSchedules,
} from '../controllers/mealScheduleController.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getMealSchedules)
  .post(createMealSchedule);
router
  .route('/:id')
  .patch(updateMealSchedule)
  .delete(deleteMealSchedule);
router
  .route('/today')
  .get([authorizePermissions('admin')], getTodayMealSchedules);

export default router;
