import mongoose from "mongoose";
import bcrypt from 'bcrypt';

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
  token: String,
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

export const userSchema = mongoose.model("users", userSchema);