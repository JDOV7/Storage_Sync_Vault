import express from "express";
import {
  validarCodeGithubController,
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

const router = express.Router();

// https://github.com/login/oauth/authorize?client_id=6722f599ca781575b565&scope=user:email
router.get(
  "/github/sesion-iniciada",
  ValidarCodeGitHub,
  ObtenerDatosCuentaGitHub,
  (req, res) => {
    console.log(req.body);
    // console.log("Termiando /github/sesion-iniciada");
    return res.status(200).json({
      status: 200,
      message: "/github/sesion-iniciada",
    });
  }
);

router.post("/usuario", validandoCrearUsuario, creandoUsuarioController);

router.get(
  "/usuario-confirmar/:TokenAcceso",
  validandoConfirmarCuenta,
  confirmarCuentaController
);
router.post("/usuario/iniciar-sesion", validandoLogin, LoginController);

export default router;
