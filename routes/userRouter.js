import { Router } from 'express';
const router = Router();
import { authenticateUser, authorizePermissions } from '../middleware/authMiddleware.js';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

router.route('/admin/').get( [authorizePermissions('admin')], getUsers);
//router.route('/').post(authenticateUser, admin, createUser);
router
  .route('/admin/:id')
  .patch([authorizePermissions('admin')], updateUser)
  .delete([authorizePermissions('admin')], deleteUser);

export default router;
