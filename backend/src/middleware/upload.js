import multer from "multer";

const storage = multer.memoryStorage();

export const requireFile = (fieldName) => {
  return (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        message: `${fieldName} file is required.`,
      });
    }
    next();
  };
};

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only images are allowed."), false);
  }
  cb(null, true);
};

export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});
