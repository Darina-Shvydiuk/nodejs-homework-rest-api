
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/schema/userModel.js';
import {
  registerUser,
  loginUser,
  logOutUser,
  updateUser,
} from "../models/service/users.js";
import { createError } from '../helpers/createError.js';

export const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await registerUser(email, password);

        if (!user) {
            throw createError(409, 'Email in use');
        }
        res.status(201).json({
            user: { email: user.email, subscription: user.subscription },
        });
    } catch (e) {
        next(e);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }, 'password');

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
    } catch (e) {
        next(e);
    }
};

export const logOut = async (req, res, next) => {
    const { _id } = req.user;

    try {
        const user = await logOutUser(_id);

        if (!user) {
            throw createError(401, 'Not authorized');
        }
        res.status(204).json({
            message: 'success',
        });
    } catch (e) {
        next(e);
    }
};

export const getCurrentUser = async (req, res, next) => {
    res.json({
        user: {
            email: req.user.email,
            subscription: req.user.subscription,
        },
    });
};

export const updateStatus = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const user = await updateUser(_id, req.body);
        res.json({
            user: {
                email: user.email,
                subscription: user.subscription,
            },
        });
    } catch (e) {
        next(e);
    }
};

export const controller = {
    register,
    login,
    logOut,
    getCurrentUser,
    updateStatus,
};