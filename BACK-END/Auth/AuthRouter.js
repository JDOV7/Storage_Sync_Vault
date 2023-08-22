import express from "express";
import {
  creandoUsuarioController,
  confirmarCuentaController,
  LoginController,
} from "./AuthController.js";
import {
  validandoCrearUsuario,
  validandoConfirmarCuenta,
  validandoLogin,
} from "./Validadores.js";

const router = express.Router();

router.post("/usuario", validandoCrearUsuario, creandoUsuarioController);

router.get(
  "/usuario-confirmar/:TokenAcceso",
  validandoConfirmarCuenta,
  confirmarCuentaController
);
router.post("/usuario/iniciar-sesion", validandoLogin, LoginController);

export default router;
