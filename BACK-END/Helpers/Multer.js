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
        __dirname + `../../public/uploads${req.headers.padre.UbicacionLogica}/`
      );
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${new Date().getTime()}.${extension}`);
    },
  }),
  // fileFilter(req, file, cb) {
  //   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Formato no valido"));
  //   }
  // },
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
