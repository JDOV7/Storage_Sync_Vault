import express from "express";
import { compartirFolderConOtrosUsuariosParaLecturaController } from "./ObjectosCompartidosController.js";
import ValidarToken from "../Helpers/ValidarToken.js";
import { ValidarPerteneceAlUsuarioParams } from "../Validadores/ValidarPerteneceAlUsuario.js";
import { ExisteElUsuarioCorreo } from "../Validadores/ExisteElUsuario.js";
import { NoEsElMismoUsuarioCorreo } from "../Validadores/NoEsElMismoUsuario.js";

const router = express.Router();

router.post(
  "/folder/:IdObjetos",
  ValidarToken,
  ExisteElUsuarioCorreo,
  NoEsElMismoUsuarioCorreo,
  ValidarPerteneceAlUsuarioParams,
  compartirFolderConOtrosUsuariosParaLecturaController
);

export default router;
