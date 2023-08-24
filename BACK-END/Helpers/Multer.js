import { v4 } from "uuid";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(
        null,
        __dirname +
          `../../public/uploads${req.headers.padre.datos.UbicacionLogica}/`
      );
    },
    filename: (req, file, cb) => {
      // const extension = file.mimetype.split("/")[1];
      const ext = path.extname(file.originalname);
      cb(null, `${v4()}${ext}`);
    },
  }),
  fileFilter(req, file, cb) {
    const allowedMimes = [
      "application/x-sql",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/flac",
      "video/mp4",
      "video/webm",
      "video/mpeg",
      "video/quicktime",
      "video/x-msvideo",
      "application/zip",
      "application/x-rar-compressed",
      "application/x-7z-compressed",
      "application/x-tar",
      "text/plain",
      "application/json",
      "application/xml",
      "text/html",
      "application/octet-stream",
      "application/x-gzip",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Formato no valido"));
    }
  },
};

// const upload = multer(configuracionMulter).single("archivo");
const upload = multer(configuracionMulter).array("archivo");

const subirArchivos = (req, res, next) => {
  console.log(req.headers);
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error });
    }
    return next();
  });
};

export { subirArchivos };
