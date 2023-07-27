module.exports = (app) => {
  const comments = require("../controllers/comments.controllers.js");
  const { validateComment } = require("../middlewares/validator-input.js");
  const router = require("express").Router();

  router.post("/:id", validateComment, comments.submit);
  router.get("/:id", comments.findAll);

  app.use("/comments", router);
};
