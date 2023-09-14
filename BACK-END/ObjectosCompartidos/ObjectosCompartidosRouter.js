import express from "express";
import {
  compartirFolderConOtrosUsuariosParaLecturaController,
  compartirArchivoConOtrosUsuariosParaLecturaController,
} from "./ObjectosCompartidosController.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import { ValidarPerteneceAlUsuarioParams } from "../Validadores/ValidarPerteneceAlUsuario.js";
import { ExisteElUsuarioCorreo } from "../Validadores/ExisteElUsuario.js";
import { NoEsElMismoUsuarioCorreo } from "../Validadores/NoEsElMismoUsuario.js";
import ArchivoExiste from "../Validadores/ArchivoExiste.js";
import ArchivoNoEliminado from "../Validadores/ArchivoNoEliminado.js";
import ArchivoPerteneceAlUsuario from "../Validadores/ArchivoPerteneceAlUsuario.js";

const router = express.Router();

router.post(
  "/folder/:IdObjetos",
  ValidarToken,
  ExisteElUsuarioCorreo,
  NoEsElMismoUsuarioCorreo,
  ValidarPerteneceAlUsuarioParams,
  compartirFolderConOtrosUsuariosParaLecturaController
);

router.post(
  "/archivo/:IdObjetos",
  ValidarToken,
  ExisteElUsuarioCorreo,
  NoEsElMismoUsuarioCorreo,
  ArchivoExiste,
  ArchivoNoEliminado,
  ArchivoPerteneceAlUsuario,
  compartirArchivoConOtrosUsuariosParaLecturaController
);

export default router;
