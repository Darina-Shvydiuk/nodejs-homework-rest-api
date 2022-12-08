import jwt from 'jsonwebtoken';
import {User} from '../models/schema/userModel.js';

export const authMiddleware = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({
            message: 'Please, provide token',
        });
    }

    const [_, token] = req.headers['authorization'].split(' ');

    if (!token) {
        return res.status(401).json({
            message: 'Please, provide token',
        });
    }

    try {
        const SECRET = process.env.JWT_SECRET;
        const checkUser = jwt.verify(token, SECRET);

        if (!checkUser) {
            return res.status(401).json({
                message: 'Not authorized',
            });
        }

        const user = await User.findById(checkUser._id);
        const isSameToken = token === user.token;

        if (!user || !isSameToken) {
            return res.status(401).json({
                message: 'Not authorized',
            });
        }

        req.token = token;
        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};