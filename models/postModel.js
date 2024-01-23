const mongoose = require("mongoose");

//schema
const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "please add post description"],
    },
    image: {
      type: String,
      required: false,
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
