import { v4 } from "uuid";
import { create } from "ipfs-http-client";
import multer from "multer";
import { config } from "dotenv";
import registrarObjectoEnETH from "./ETH/RegistrarObjectoEnETH.js";
config();
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const configuracionMulter = {
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(
//         null,
//         __dirname +
//           `../../public/uploads${req.headers.padre.datos.UbicacionLogica}/`
//       );
//     },
//     filename: (req, file, cb) => {
//       // const extension = file.mimetype.split("/")[1];
//       const ext = path.extname(file.originalname);
//       cb(null, `${v4()}${ext}`);
//     },
//   }),
//   fileFilter(req, file, cb) {
//     const allowedMimes = [
//       "application/x-sql",
//       "application/pdf",
//       "text/plain",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "application/vnd.ms-powerpoint",
//       "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       "image/jpeg",
//       "image/png",
//       "image/gif",
//       "image/bmp",
//       "image/webp",
//       "audio/mpeg",
//       "audio/wav",
//       "audio/ogg",
//       "audio/flac",
//       "video/mp4",
//       "video/webm",
//       "video/mpeg",
//       "video/quicktime",
//       "video/x-msvideo",
//       "application/zip",
//       "application/x-rar-compressed",
//       "application/x-7z-compressed",
//       "application/x-tar",
//       "text/plain",
//       "application/json",
//       "application/xml",
//       "text/html",
//       "application/octet-stream",
//       "application/x-gzip",
//     ];
//     if (allowedMimes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Formato no valido"));
//     }
//   },
// };

// const upload = multer(configuracionMulter).single("archivo");
// const upload = multer(configuracionMulter).array("archivo");

// const subirArchivos = (req, res, next) => {
//   console.log(req.headers);
//   upload(req, res, function (error) {
//     if (error) {
//       res.json({ mensaje: error });
//     }
//     return next();
//   });
// };

// export { subirArchivos };

const storage = multer.memoryStorage();
const configuracionMulter = {
  storage,
  // fileFilter(req, file, cb) {
  //   const allowedMimes = [
  //     "application/x-sql",
  //     "application/pdf",
  //     "text/plain",
  //     "application/msword",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //     "application/vnd.ms-powerpoint",
  //     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  //     "application/vnd.ms-excel",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //     "image/jpeg",
  //     "image/png",
  //     "image/gif",
  //     "image/bmp",
  //     "image/webp",
  //     "audio/mpeg",
  //     "audio/wav",
  //     "audio/ogg",
  //     "audio/flac",
  //     "video/mp4",
  //     "video/webm",
  //     "video/mpeg",
  //     "video/quicktime",
  //     "video/x-msvideo",
  //     "application/zip",
  //     "application/x-rar-compressed",
  //     "application/x-7z-compressed",
  //     "application/x-tar",
  //     "text/plain",
  //     "application/json",
  //     "application/xml",
  //     "text/html",
  //     "application/octet-stream",
  //     "application/x-gzip",
  //   ];
  //   if (allowedMimes.includes(file.mimetype)) {
  //     cb(null, true);
  //   } else {
  //     cb(new Error("Formato no valido"));
  //   }
  // },
};

const upload = multer(configuracionMulter).array("archivo");

const subirArchivos = async (req, res, next) => {
  console.log(req.headers);
  console.log(req.file);
  console.log(req.files);
  console.log(req.body);
  try {
    upload(req, res, async function (error) {
      if (error) {
        res.json({ mensaje: error });
      }

      const ipfs = create(process.env.RED_IPFS);
      for await (const file of req.files) {
        const archivoBuffer = file.buffer;
        const { cid } = await ipfs.add(archivoBuffer);
        console.log(
          `Archivo subido a IPFS. CID: ${cid}  - user: ${req.usuario.IdUsuarios}`
        );
        file.cid = cid.toString();
        const registrarETH = await registrarObjectoEnETH(
          req.usuario.IdUsuarios,
          file.cid
        );

        if (!registrarETH) {
          throw new Error("No se pudo subir el archivo");
        }
      }
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "No se pudo subir el contenido",
      data: {},
    });
  }
};

export default subirArchivos;
