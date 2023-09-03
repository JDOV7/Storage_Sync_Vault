import express from "express";
import {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
  eliminarDirectorioController,
  recuperarDirectorioController,
  moverFolderController,
  compartirFolderConOtrosUsuariosParaLecturaController,
} from "./ObjectosController.js";
import { subirArchivos } from "../Helpers/Multer.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import {
  ValidarPerteneceAlUsuario,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
  ValidarPerteneceAlUsuarioParams,
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
  ValidarPerteneceAlUsuarioParams,
  ValidarPerteneceAlUsuario,
  moverFolderController
);

router.post(
  "/folder/compartir/:IdObjetos",
  ValidarToken,
  ValidarPerteneceAlUsuarioParams,
  compartirFolderConOtrosUsuariosParaLecturaController
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
