module.exports = (app) => {
  const videos = require("../controllers/videos.controller");
  const { authToken } = require("../middlewares/auth-jwt.js");
  const { validateVideo } = require("../middlewares/validator-input.js");
  const router = require("express").Router();

  router.post("/", validateVideo, authToken, videos.create);
  router.get("/:id", videos.getVideoDetails);
  router.get("/", videos.findAllVideos);
  router.put("/:id", authToken, videos.updateVideo);
  router.delete("/:id", authToken, videos.deleteVideo);

  app.use("/videos", router);
};
