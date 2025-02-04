
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/schema/userModel.js';
import  {emailSender}  from '../helpers/emailSender.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as url from 'url';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';

import {
  registerUser,
  loginUser,
  logOutUser,
  updateUser,
  verifyUser,
} from "../models/service/users.js";

import { createError } from '../helpers/createError.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

let verificationToken = '';

export const register = async (req, res, next) => {

    verificationToken = nanoid();

    const { email, password } = req.body;

   
        const user = await registerUser(email, password, verificationToken);
        

        if (!user) {
            throw createError(409, 'Email in use');
        }

        await emailSender(email, verificationToken);

        res.status(201).json({
            user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL, },
        });
   
};

export const verification = async (req, res, next) => {
    const { email } = req.body;
    const { verificationToken } = req.params;

   
        const user = await verifyUser(email, verificationToken);

        if (!user) {
            throw createError(404, 'User not found');
        }
        res.json({
            message: 'Verification successful',
        });
   
};

export const verificationRepeatController = async (req, res, next) => {

    const { email } = req.body;

   
        const user = await User.findOne({ email, verify: true });

        if (user) {
            throw createError(400, 'Verification has already been passed');
        }

        await emailSender(email, verificationToken);

        res.json({
            message: 'Verification email sent',
        });
    
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

   
        const user = await User.findOne({ email ,verify: true}, 'password');

        if (!user) {
            throw createError(404, 'User not found');
        }

        const isValidPassword = await user.checkPassword(password);

        if (!isValidPassword) {
            throw createError(401, 'Email or password is wrong');
        }

        const payload = {
            _id: user._id,
        };
        const SECRET = process.env.JWT_SECRET;
        const token = jwt.sign(payload, SECRET);

        const loginedUser = await loginUser(email, token);

        res.json({
            token: token,
            user: {
                email: loginedUser.email,
                subscription: loginedUser.subscription,
            },
        });
   
};

export const logOut = async (req, res, next) => {
    const { _id } = req.user;

    
        const user = await logOutUser(_id);

        if (!user) {
            throw createError(401, 'Not authorized');
        }
        res.status(204).json({
            message: 'success',
        });
   
};

export const getCurrentUser = async (req, res, next) => {
    res.json({
        user: {
            email: req.user.email,
            subscription: req.user.subscription,
            avatarURL: req.user.avatarURL,
        },
    });
};

export const updateStatus = async (req, res, next) => {
    const { _id } = req.user;
   
        const user = await updateUser(_id, req.body);
        res.json({
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
   
};

export const updateUserAvatar = async (req, res, next) => {
    const userId = req.user._id;
    const { originalname, path: tempPath } = req.file;
    const newName = `${userId + '-' + originalname}`;
    const newPath = path.join(__dirname, '../public/avatars', newName);
    const avatarURL = `http://localhost:${process.env.PORT}/api/avatars/${newName}`;

    try {
        const img = await Jimp.read(tempPath);
        img.resize(250, 250);
        img.write(tempPath);

        await fs.rename(tempPath, newPath);

        await User.findOneAndUpdate({ email: req.user.email }, { avatarURL });

        res.json({
            avatarURL: avatarURL,
        });
    } catch (e) {
        await fs.unlink(tempPath);
        next(e);
    }
};

