const Users = require("../models/users.model");
const Videos = require("../models/videos.model");
const Products = require("../models/products.model");

exports.create = async (req, res) => {
  const { title, url, thumbnailUrl } = req.body;

  try {
    const userId = await Users.findById(req.user.id);
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const exitingVideos = await Videos.findOne({ title });
    if (exitingVideos) {
      return res.status(409).json({
        message: "Title video already exists, please use another title!",
      });
    }

    const videos = await Videos.create({
      title,
      url,
      thumbnailUrl,
      userId,
    });

    res.status(201).json({
      message: "Success creating new video",
      data: {
        id: videos.id,
        title: videos.title,
        url: videos.url,
        thumbnailUrl: videos.thumbnailUrl,
        createdAt: videos.createdAt,
        updatedAt: videos.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAllVideos = async (_, res) => {
  try {
    const videos = await Videos.find();

    if (videos.length === 0) {
      return res.status(404).json({ message: "No videos found" });
    }

    const users = await Users.find();
    const userMap = {};
    users.forEach((user) => {
      userMap[user.id] = user.fullname;
    });

    res.status(200).json({
      message: "Success finding all videos",
      data: videos.map((item) => ({
        id: item.id,
        userName: userMap[item.userId],
        title: item.title,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVideoDetails = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Videos.findById(videoId).populate("products");
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({
      message: "Get video details success",
      data: {
        id: video.id,
        title: video.title,
        url: video.url,
        thumbnailUrl: video.thumbnailUrl,
        products: video.products.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          link: item.link,
          imageUrl: item.imageUrl,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVideo = async (req, res) => {
  const { title, url, thumbnailUrl } = req.body;

  try {
    const video = await Videos.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (title) video.title = title;
    if (url) video.url = url;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;

    await video.save();

    res.status(200).json({
      message: "Success updating video",
      data: {
        id: video.id,
        title: video.title,
        url: video.url,
        thumbnailUrl: video.thumbnailUrl,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const video = await Videos.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Delete video success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
