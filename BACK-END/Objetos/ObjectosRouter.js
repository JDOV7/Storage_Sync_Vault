import express from "express";
import {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
  eliminarDirectorioController,
  recuperarDirectorioController,
  moverFolderController,
} from "./ObjectosController.js";
import { subirArchivos } from "../Helpers/Multer.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import {
  ValidarPerteneceAlUsuario,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
} from "../Validadores/ValidarPerteneceAlUsuario.js";

const router = express.Router();

router.post(
  "/folder",
  ValidarToken,
  ValidarPerteneceAlUsuario,
  crearDirectorioController
);

router.get(
  "/folder/:IdObjetos",
  ValidarToken,
  // ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuario,
  obtenerElementosDirectorioController
);

router.delete(
  "/folder/:IdObjetos",
  ValidarToken,
  ValidarPerteneceAlUsuario,
  eliminarDirectorioController
);

router.put(
  "/folder/recuperar/:IdObjetos",
  ValidarToken,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
  recuperarDirectorioController
);

router.post(
  "/folder/mover/:IdObjetos",
  ValidarToken,
  ValidarPerteneceAlUsuario,
  moverFolderController
);

router.post(
  "/archivos",
  ValidarToken,
  // ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuario,
  subirArchivos,
  subiendoArchivosController
);

export default router;
