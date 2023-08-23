import express from "express";
import {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
} from "./ObjectosController.js";
import { subirArchivos } from "../Helpers/Multer.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import {
  ValidarPerteneceAlUsuario,
  ValidarPerteneceAlUsuarioM,
} from "../Validadores/ValidarPerteneceAlUsuario.js";

const router = express.Router();

router.post(
  "/subir-archivos",
  ValidarToken,
  ValidarPerteneceAlUsuarioM,
  subirArchivos,
  subiendoArchivosController
);

router.post(
  "/folder",
  ValidarToken,
  ValidarPerteneceAlUsuario,
  crearDirectorioController
);

router.get(
  "/folder/:IdObjetos",
  ValidarToken,
  obtenerElementosDirectorioController
);

export default router;
