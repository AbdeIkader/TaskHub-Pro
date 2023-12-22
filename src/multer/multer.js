import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const uploadSingleFile = (fieldName, folderName) => {
  const storage = multer.diskStorage({});

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new AppError("Images Only!", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });

  return upload.single(fieldName, folderName);
};
