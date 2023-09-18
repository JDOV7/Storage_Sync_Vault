import express from "express";
import {
  // validarCodeGithubController,
  crearOIniciarCuentaGithubController,
  creandoUsuarioController,
  confirmarCuentaController,
  LoginController,
} from "./AuthController.js";
import {
  validandoCrearUsuario,
  validandoConfirmarCuenta,
  validandoLogin,
} from "./Validadores.js";
import ValidarCodeGitHub from "../Validadores/ValidarCodeGitHub.js";
import ObtenerDatosCuentaGitHub from "../Validadores/ObtenerDatosCuentaGitHub.js";
import ExisteCuentaRegistradaGitHub from "../Validadores/ExisteCuentaRegistradaGitHub.js";

const router = express.Router();

// https://github.com/login/oauth/authorize?client_id=6722f599ca781575b565&scope=user:email
router.get(
  "/github/crear-iniciar-sesion",
  ValidarCodeGitHub,
  ObtenerDatosCuentaGitHub,
  ExisteCuentaRegistradaGitHub,
  crearOIniciarCuentaGithubController
);

router.post("/usuario", validandoCrearUsuario, creandoUsuarioController);

router.get(
  "/usuario-confirmar/:TokenAcceso",
  validandoConfirmarCuenta,
  confirmarCuentaController
);
router.post("/usuario/iniciar-sesion", validandoLogin, LoginController);

export default router;
