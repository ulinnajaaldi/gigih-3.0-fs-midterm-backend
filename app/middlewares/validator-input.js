const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  check("fullname").notEmpty().withMessage("Fullname is required"),
  check("email").isEmail().withMessage("Email is not valid"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];

exports.validateLogin = [
  check("email").isEmail().withMessage("Email is not valid"),
  check("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];

exports.validateVideo = [
  check("title").notEmpty().withMessage("Title is required"),
  check("url").notEmpty().withMessage("Url is required"),
  check("thumbnailUrl").notEmpty().withMessage("Thumbnail is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];

exports.validateProduct = [
  check("title").notEmpty().withMessage("Title is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("link").notEmpty().withMessage("Link is required"),
  check("imageUrl").notEmpty().withMessage("Image is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
