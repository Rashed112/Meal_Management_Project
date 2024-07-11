import { Router } from 'express';
const router = Router();

import { getItems, createItem, deleteItem } from '../controllers/itemController.js';
import { authenticateUser, authorizePermissions } from '../middleware/authMiddleware.js';

router.route('/').get(getItems);
router.route('/admin/').post([authorizePermissions('admin')], createItem);
router.route('/admin/:id').delete([authorizePermissions('admin')], deleteItem);

export default router;
