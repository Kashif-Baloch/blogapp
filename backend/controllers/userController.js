import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import Blog from "../models/BlogModel.js";

const getUsers = (req, res) => {};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user });
    const blogs = await Blog.find({ "author.email": req.user }).sort({
      _id: -1,
    });

    return user
      ? res.json({ msg: "user is existed", user, blogs })
      : res.status(500).json({ msg: "internal server error" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const signUser = async (req, res) => {
  try {
    const { name, email, password, role, isAdmin } = req.body;

    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.status(500).json({ msg: "user already exist" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      password: hashPassword,
      email,
      role,
      image: req.file.filename,
      isAdmin: isAdmin == "true" ? true : false,
    });

    const data = {
      name,
      email,
      isAdmin: newUser.isAdmin,
    };

    const token =
      name || email || isAdmin
        ? jwt.sign(data, process.env.TOKEN_SECRET_KEY)
        : null;

    return token
      ? res.json({ msg: "user created successfully", token })
      : res.status(500).json({ msg: "internal server error" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({ msg: "password is incorrect" });
    }
    const data = {
      name: user.name,
      email,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY);
    return res.json({ msg: "user logged in successfully", token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

const deleteUsers = async (req, res) => {
  // console.log(req.body.fileName); // file which is going to delete
  await User.deleteMany();
  try {
    const directoryPath = "uploads/userImages";
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err.message);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted:", filePath);
          }
        });
      });
    });
    return res.json({ msg: "all files deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const controllers = {
  getUsers,
  getUser,
  loginUser,
  signUser,
  updateUser,
  deleteUser,
  deleteUsers,
};

export default controllers;
