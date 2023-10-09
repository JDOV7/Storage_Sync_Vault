import express from "express";
import {
  // validarCodeGithubController,
  crearOIniciarCuentaGithubController,
  crearOIniciarCuentaFacebookController,
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
import ValidarCodeFacebook from "../Validadores/ValidarCodeFacebook.js";
import ObtenerDatosCuentaFacebook from "../Validadores/ObtenerDatosCuentaFacebook.js";
import ExisteCuentaRegistradaFacebook from "../Validadores/ExisteCuentaRegistradaFacebook.js";

const router = express.Router();

// https://github.com/login/oauth/authorize?client_id=6722f599ca781575b565&scope=user:email
router.get(
  "/github/crear-iniciar-sesion",
  ValidarCodeGitHub,
  ObtenerDatosCuentaGitHub,
  ExisteCuentaRegistradaGitHub,
  crearOIniciarCuentaGithubController
);

//https://www.facebook.com/v18.0/dialog/oauth?client_id=1101541470821727&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Ffacebook%2Fcrear-iniciar-sesion&auth_type=rerequest&scope=email

router.get(
  "/facebook/crear-iniciar-sesion",
  ValidarCodeFacebook,
  ObtenerDatosCuentaFacebook,
  ExisteCuentaRegistradaFacebook,
  crearOIniciarCuentaFacebookController,
  (req, res) => {
    console.log(req.query);
    // return res.json({ message: "legamos" });
    return res.json({ code: req.query.code });
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
