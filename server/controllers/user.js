import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModal.js";
import generateToekn from "../config/generateToekn.js";

export const signUp = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter the field" });
    }

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "User aleready exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      pic,
      password: hashedPassword,
    });
    res.status(201).json({
      result,
      token: generateToekn(result._id),
    });
  } catch (error) {
    res.status(401).json({ message: "Error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (!existing) return res.status(404).json({ message: "User don't exist" });

    const isPassword = await bcrypt.compare(password, existing.password);
    if (!isPassword)
      return res.status(404).json({ message: "Password is incorrect" });

    if (existing && isPassword)
      return res.status(200).json({
        result: existing,
        token: generateToekn(existing._id),
      });
  } catch (error) {
    res.status(401).json({ message: "Invalid email and token" });
  }
};
