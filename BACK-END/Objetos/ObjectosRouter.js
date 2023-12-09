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
  moverArchivoController,
  obtenerArchivoController,
  obtenerObjectosEliminados,
  arbolDeCarpetasController,
  descargarCarpeta,
} from "./ObjectosController.js";

import { recuperarArchivoController } from "../ObjectosEliminados/ObjectosEliminadosController.js";

// import { subirArchivos } from "../Helpers/Multer.js";
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
import ArchivoEliminado from "../Validadores/ArchivoEliminado.js";
import PadreFolderExiste from "../Validadores/PadreFolderExiste.js";
import PadreFolderNoEliminado from "../Validadores/PadreFolderNoEliminado.js";
import PadreFolderPerteneceAlUsuario from "../Validadores/PadreFolderPerteneceAlUsuario.js";
import subirArchivos from "../Helpers/Multer.js";
import {
  validarFolderPadrePerteneceAlUsuarioETH,
  validarFolderParamPerteneceAlUsuarioETH,
  validarFolderHeaderPadrePerteneceAlUsuarioETH,
} from "../Validadores/ETH/ValidarFolderPerteneceAlUsuarioETH.js";
import { validarArchivoPerteneceAlUsuarioETH } from "../Validadores/ETH/ValidarArchivoPerteneceAlUsuarioETH.js";

const router = express.Router();

router.post(
  "/folder",
  ValidarToken,
  validarFolderPadrePerteneceAlUsuarioETH,
  ValidarPerteneceAlUsuario,
  crearDirectorioController
);

router.get(
  "/folder/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  // ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuario,
  obtenerElementosDirectorioController
);

router.delete(
  "/folder/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  ValidarPerteneceAlUsuario,
  eliminarDirectorioController
);

router.put(
  "/folder/recuperar/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
  recuperarDirectorioController
);

router.post(
  "/folder/mover/:IdObjetos",
  ValidarToken,
  validarFolderPadrePerteneceAlUsuarioETH,
  validarFolderParamPerteneceAlUsuarioETH,
  ValidarPerteneceAlUsuarioParams,
  ValidarPerteneceAlUsuario,
  moverFolderController
);

router.post(
  "/archivos",
  ValidarToken,
  validarFolderHeaderPadrePerteneceAlUsuarioETH,
  // ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuario,
  // subirArchivos,
  subirArchivos,
  subiendoArchivosController
);

router.get(
  "/archivos/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  obtenerInformacionArchivoController
);

router.delete(
  "/archivos/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  eliminarArchivoController
);

router.put(
  "/archivos/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  recuperarArchivoController
);

router.post(
  "/archivos/:IdObjetos",
  ValidarToken,
  validarFolderPadrePerteneceAlUsuarioETH,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  PadreFolderExiste,
  PadreFolderNoEliminado,
  PadreFolderPerteneceAlUsuario,
  moverArchivoController
);

router.get(
  "/archivo/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  obtenerArchivoController
);

router.get("/archivos-eliminados", ValidarToken, obtenerObjectosEliminados);

router.get("/arbol-carpetas", ValidarToken, arbolDeCarpetasController);

router.get("/descargar/carpeta/:IdObjetos", ValidarToken, descargarCarpeta);

export default router;
