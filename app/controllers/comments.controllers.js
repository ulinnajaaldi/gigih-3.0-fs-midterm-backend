const Comments = require("../models/comments.model");

exports.submit = async (req, res) => {
  const { username, comment } = req.body;
  const videoId = req.params.id;

  try {
    const Comment = await Comments.create({
      username,
      comment,
      videoId,
    });

    res.status(201).json({
      message: "Success submitting new comment",
      data: {
        id: Comment.id,
        username: Comment.username,
        comment: Comment.comment,
        createdAt: Comment.createdAt,
      },
    });

    req.app.get("channel").publish("new comment", {
      id: Comment.id,
      username: Comment.username,
      comment: Comment.comment,
      createdAt: Comment.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const videoId = req.params.id;
    const Comment = await Comments.find({ videoId });

    res.status(200).json({
      message: "Success finding all comments",
      data: Comment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
