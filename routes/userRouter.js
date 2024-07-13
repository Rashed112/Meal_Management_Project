import { Router } from 'express';
const router = Router();
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authMiddleware.js';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserCount,
  getCurrentUser,
} from '../controllers/userController.js';

router.route('/current-user').get(getCurrentUser);
router
  .route('/')
  .get([authorizePermissions('admin')], getUsers)
  .post([authorizePermissions('admin')], createUser);
router
  .route('/:id')
  .patch([authorizePermissions('admin')], updateUser)
  .delete([authorizePermissions('admin')], deleteUser);

router.route('/count').get([authorizePermissions('admin')], getUserCount);

export default router;
