import express from "express";
import { creandoUsuarioController } from "./AuthController.js";
import { validandoCrearUsuario } from "./Validadores.js";

const router = express.Router();

router.post("/usuario", validandoCrearUsuario, creandoUsuarioController);

export default router;
