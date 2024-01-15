const cloudinary =require( "cloudinary")
const dotenv =require("dotenv") ;
dotenv.config();
// cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARYNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
const UploadToCloud = async (file, res) => {
    try {
      const profilePicture = await cloudinary.uploader.upload(file.path, {
        folder: "image",
        use_filename: true,
      });
      return profilePicture;
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };

  module.exports = { UploadToCloud };