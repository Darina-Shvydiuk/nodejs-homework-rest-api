import { User } from "../schema/userModel.js";

export const registerUser = async (email, password, verificationToken) => {
    const user = await User.findOne({ email });

    if (user) {
        return false;
    }

    const newUser = new User({
        email,
        password: undefined,
        verificationToken
    });
    await newUser.setPassword(password);
    newUser.setAvatarUrl(email);
    return await User.create(newUser);
};

export const verifyUser = async (email, verificationToken) => {
    
    const user = await User.findOne({ email, verificationToken });

    if (!user) {
        return false;
    }

    return await User.findOneAndUpdate(
        { email },
        { verificationToken: null, verify: true },
        { new: true }
    );
};

export const loginUser = async (email, token) => {
    const user = await User.findOneAndUpdate(
        { email },
        { token },
        { new: true }
    );
    return user;
};

export const logOutUser = async id => {
    const user = await User.findById(id);

    if (!user) {
        return false;
    }
    return await User.findByIdAndUpdate(id, { token: null }, { new: true });
};

export const updateUser = async (id, subscription) => {
    return await User.findByIdAndUpdate(id, subscription, { new: true });
};

