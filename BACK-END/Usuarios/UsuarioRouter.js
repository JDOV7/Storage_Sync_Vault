import express from "express";

import { obtenerElementos } from "./UsuarioController.js";

const router = express.Router();

router.get("/elementos", obtenerElementos);

export default router;
