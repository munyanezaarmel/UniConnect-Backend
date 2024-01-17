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
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
