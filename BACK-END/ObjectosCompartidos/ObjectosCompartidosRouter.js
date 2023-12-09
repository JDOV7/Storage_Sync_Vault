import express from "express";
import {
  compartirFolderConOtrosUsuariosParaLecturaController,
  compartirArchivoConOtrosUsuariosParaLecturaController,
  obtenerCuentasAutorizadasController,
  eliminarAccesoArchivo,
  obtenerCuentasAutorizadasFolderController,
  eliminarAccesoFolder,
  objetosCompartidosUsuario,
  descargarArchivoCompartido,
} from "./ObjectosCompartidosController.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import {
  ValidarPerteneceAlUsuario,
  ValidarPerteneceAlUsuarioParams,
} from "../Validadores/ValidarPerteneceAlUsuario.js";
import { ExisteElUsuarioCorreo } from "../Validadores/ExisteElUsuario.js";
import { NoEsElMismoUsuarioCorreo } from "../Validadores/NoEsElMismoUsuario.js";
import ArchivoExiste from "../Validadores/ArchivoExiste.js";
import ArchivoNoEliminado from "../Validadores/ArchivoNoEliminado.js";
import ArchivoPerteneceAlUsuario from "../Validadores/ArchivoPerteneceAlUsuario.js";
import { validarFolderParamPerteneceAlUsuarioETH } from "../Validadores/ETH/ValidarFolderPerteneceAlUsuarioETH.js";
import { validarArchivoPerteneceAlUsuarioETH } from "../Validadores/ETH/ValidarArchivoPerteneceAlUsuarioETH.js";
import { ValidarExistenCuentasAutorizadasETH } from "../Validadores/ETH/ValidarExistenCuentasAutorizadasETH.js";

const router = express.Router();

router.post(
  "/folder/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  ExisteElUsuarioCorreo,
  NoEsElMismoUsuarioCorreo,
  ValidarPerteneceAlUsuarioParams,
  compartirFolderConOtrosUsuariosParaLecturaController
);

router.get(
  "/folder/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  ValidarPerteneceAlUsuario,
  ValidarExistenCuentasAutorizadasETH,
  obtenerCuentasAutorizadasFolderController
);

router.delete(
  "/folder/:IdObjetos",
  ValidarToken,
  validarFolderParamPerteneceAlUsuarioETH,
  ValidarPerteneceAlUsuario,
  ValidarExistenCuentasAutorizadasETH,
  eliminarAccesoFolder
);

router.post(
  "/archivo/:IdObjetos",
  ValidarToken,
  ExisteElUsuarioCorreo,
  NoEsElMismoUsuarioCorreo,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  compartirArchivoConOtrosUsuariosParaLecturaController
);

router.get(
  "/archivo/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  ValidarExistenCuentasAutorizadasETH,
  obtenerCuentasAutorizadasController
);

router.delete(
  "/archivo/:IdObjetos",
  ValidarToken,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  validarArchivoPerteneceAlUsuarioETH,
  ValidarExistenCuentasAutorizadasETH,
  eliminarAccesoArchivo
);

router.get("/objetos/compartidos", ValidarToken, objetosCompartidosUsuario);

router.get(
  "/archivo/descargar/:IdObjetos",
  ValidarToken,
  descargarArchivoCompartido
);

export default router;
