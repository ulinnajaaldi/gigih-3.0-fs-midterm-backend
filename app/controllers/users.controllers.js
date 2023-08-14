const Users = require("../models/users.model");
const Videos = require("../models/videos.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const exitingUser = await Users.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await Users.create({
      fullname,
      email,
      password,
    });

    res.status(201).json({ message: "User successfully registered" });
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

    const access_token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const refresh_token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: "Login success", access_token, refresh_token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  try {
    const decoded = jwt.verify(refresh_token, JWT_SECRET);
    const access_token = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: "20s",
    });

    res.status(200).json({ message: "Refresh token success", access_token });
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

    const videos = await Videos.find({ userId }).sort({ createdAt: -1 });

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
          totalProducts: item.products.length,
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

    const videos = await Videos.find({ userId: req.user.id });
    if (videos.length > 0) {
      await Videos.deleteMany({ userId: req.user.id });
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
