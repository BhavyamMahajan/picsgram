const { GridFsStorage } = require("multer-gridfs-storage");

const url = process.env.MONGO_URI;

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    //If it is an image, save to photos bucket
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      };
    }
  },
});

module.exports = storage;
