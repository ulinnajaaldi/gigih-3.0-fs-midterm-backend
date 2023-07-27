const Users = require("../models/users.model");
const Videos = require("../models/videos.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const exitingUser = await Users.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await Users.create({
      fullname,
      email,
      password,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login success", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Get user success",
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const videos = await Videos.find({ userId });

    res.status(200).json({
      message: "Get user details success",
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        videos: videos.map((item) => ({
          id: item.id,
          title: item.title,
          url: item.url,
          thumbnailUrl: item.thumbnailUrl,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Delete user success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({
      message: "Update user success",
      data: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
