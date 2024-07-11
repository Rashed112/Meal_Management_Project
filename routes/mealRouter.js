import { Router } from 'express';
const router = Router();
import {
  getMeals,
  createMeal,
  updateMeal,
  deleteMeal,
} from '../controllers/mealController.js';
import { authenticateUser, authorizePermissions } from '../middleware/authMiddleware.js';

router.route('/').get(getMeals);
router.route('/admin/').post([authorizePermissions('admin')], createMeal);
router
  .route('/admin/:id')
  .patch([authorizePermissions('admin')], updateMeal)
  .delete([authorizePermissions('admin')], deleteMeal);

export default router;
