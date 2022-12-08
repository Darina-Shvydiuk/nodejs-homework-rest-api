import { User } from "../schema/userModel.js";

export const registerUser = async (email, password) => {
    const user = await User.findOne({ email });

    if (user) {
        return false;
    }

    const newUser = new User({
        email,
        password: undefined,
    });
    await newUser.setPassword(password);

    return await User.create(newUser);
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
