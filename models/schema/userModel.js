import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import gravatar from 'gravatar';

const user = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  avatarURL: {
    type: String,
  },
  token: {
    type: String,
    default:null,
  }
  
});

user.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT)
  );
};

user.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
user.methods.setAvatarUrl = function (email) {
  this.avatarURL = gravatar.url(email, { protocol: "http" });
};

export const User = mongoose.model("users", user);
