import express from "express";
import {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
  eliminarDirectorioController,
  recuperarDirectorioController,
  moverFolderController,
  obtenerInformacionArchivoController,
  eliminarArchivoController,
} from "./ObjectosController.js";
import { subirArchivos } from "../Helpers/Multer.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import {
  ValidarPerteneceAlUsuario,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
  ValidarPerteneceAlUsuarioParams,
} from "../Validadores/ValidarPerteneceAlUsuario.js";
import ArchivoExiste from "../Validadores/ArchivoExiste.js";
import ArchivoPerteneceAlUsuario from "../Validadores/ArchivoPerteneceAlUsuario.js";
import ArchivoNoEliminado from "../Validadores/ArchivoNoEliminado.js";

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
  "/archivos",
  ValidarToken,
  // ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuario,
  subirArchivos,
  subiendoArchivosController
);

router.get(
  "/archivos/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  obtenerInformacionArchivoController
);

router.delete(
  "/archivos/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  eliminarArchivoController
);

export default router;
