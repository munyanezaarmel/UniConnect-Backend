// const multer =require( 'multer');
const postModel = require("../models/postModel");
const commentModel = require("../models/commentModel");
const { UploadToCloud } = require("../helpers/cloud");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(`./uploads/`));
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });
// const upload = multer({ storage: storage });

// create post
const createPostController = async (req, res) => {
  try {
    const result = await UploadToCloud(req.file, res);
    const { description } = req.body;
    // if (!req.file) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Please provide an image file",
    //   });
    // }

    // if (!description) {
    //   return res.status(500).send({
    //     success: false,
    //     message: "Please Provide All Fields",
    //   });
    // }
    console.log(req.body);
    const post = await postModel({
      description,
      image: result.secure_url,
      postedBy: req.auth._id,
    }).save();
    return res.status(201).json({
      success: true,
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "Error in Create Post APi",
      error,
    });
  }
};

// GET ALL POSTS
const getAllPostsContoller = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In GETALLPOSTS API",
      error,
    });
  }
};

// get user posts
const getUserPostsController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    return res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};

// delete post
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    return res.status(200).send({
      success: true,
      message: "Your Post been deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};

//UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const { description } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post  description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        description: description || post?.description,
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Post Updated Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Errro in update post api",
      error,
    });
  }
};
const createComment = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        status: "failed",
        message: "comment added the id not",
      });
    }
    const comment = new commentModel({
      blogId: req.params.blogId,
      createdBy: req.auth.name,
      comment: req.body.comment,
    });
    post.comments.push(comment);
    await post.save();
    return res.status(201).json({
      status: "success",
      message: "comment created successfully",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      status: "success",
      error: error,
    });
  }
};

const createLike = async (req, res) => {
  try {
    const result = await postModel.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.auth._id },
      },
      {
        new: true,
      }
    );
    res.json(result);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
  
};

module.exports = {
  createPostController,
  getAllPostsContoller,
  getUserPostsController,
  deletePostController,
  updatePostController,
  createComment,
  createLike,
};
