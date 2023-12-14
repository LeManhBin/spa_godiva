import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  },
});

export const uploadImage = multer({ storage: imageStorage });
