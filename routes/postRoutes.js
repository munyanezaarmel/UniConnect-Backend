const express = require("express");
const path = require("path");
const multer = require("multer");
const { requireSingIn } = require("../controllers/userController");
const postController = require("../controllers/postController");
const {
  createPostController,
  getAllPostsContoller,
  getUserPostsController,
  deletePostController,
  updatePostController,
  createComment,
  createLike
} = postController;

//router object
const router = express.Router();
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

// CREATE POST || POST
router.post(
  "/create-post",
  requireSingIn,
  createPostController
);
router.put(
  "/comment",
  requireSingIn,
  createComment
);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsContoller);

//GET USER POSTs
router.get("/get-user-post", requireSingIn, getUserPostsController);

//DELEET POST
router.delete("/delete-post/:id", requireSingIn, deletePostController);

//UPDATE POST
router.put("/update-post/:id", requireSingIn, updatePostController);
router.put("/like", requireSingIn, createLike);

//export
module.exports = router;
