import express from "express";
import multer from 'multer';
import {
    register,
    login,
    logOut,
    getCurrentUser,
    updateStatus,
    updateUserAvatar
} from "../../controller/users.js";

import { authMiddleware } from '../../middleware/authMiddleware.js';
import { user, updateUserStatus } from '../../middleware/validationMiddleware.js';
import { asyncWrapper } from "../../helpers/apiHelpers.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/register', user, asyncWrapper(register));
router.post('/login', user, asyncWrapper(login));

router.use(authMiddleware);
router.post('/logout', asyncWrapper(logOut));
router.get('/current', asyncWrapper(getCurrentUser));
router.patch('/', updateUserStatus, asyncWrapper(updateStatus));
router.patch('/avatars', upload.single('avatar'), asyncWrapper(updateUserAvatar));

export default router;