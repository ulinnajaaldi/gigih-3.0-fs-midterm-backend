const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videos",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CommentsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("Comments", CommentsSchema);
