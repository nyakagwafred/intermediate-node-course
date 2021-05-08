import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	getUsers,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router.route('/').post(registerUser).get(getUsers);

export default router;
