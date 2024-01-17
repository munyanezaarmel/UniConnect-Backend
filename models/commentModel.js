const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
    blogId: {
        type:  mongoose.Schema.ObjectId,
        ref: "Post",
      },
    createdBy: {
        type:  mongoose.Schema.ObjectId,
        ref: "User",
      },
    comment: {
      type: String,
      required: [true, "The comment field can  not be empty"],
      
    },
  });
  

  module.exports = mongoose.model("Comment", CommentSchema);