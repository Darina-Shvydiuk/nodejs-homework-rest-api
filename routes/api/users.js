import express from "express";
import {
    register,
    login,
    logOut,
    getCurrentUser,
    updateStatus,
} from "../../controller/users.js";

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { user, updateUserStatus } from '../../middleware/validationMiddleware.js';
import { asyncWrapper } from "../../helpers/apiHelpers.js";

const router = express.Router();

router.post('/register', user, asyncWrapper(register));
router.post('/login', user, asyncWrapper(login));

router.use(authMiddleware);
router.post('/logout', asyncWrapper(logOut));
router.get('/current', asyncWrapper(getCurrentUser));
router.patch('/', updateUserStatus,asyncWrapper(updateStatus));

export default router;