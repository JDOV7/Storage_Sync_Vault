import express from "express";
import {
  respaldarFolder,
  respaldarArchivo,
  descargarFolder,
  listaObjectosRespaldados,
} from "./RespaldoController.js";
import ValidarToken from "../Helpers/ValidarToken.js";
const router = express.Router();

router.post("/folder/:IdObjetos", ValidarToken, respaldarFolder);

router.post("/archivo/:IdObjetos", ValidarToken, respaldarArchivo);

router.get("/folder/:IdObjetos", ValidarToken, descargarFolder);

router.get("/lista", ValidarToken, listaObjectosRespaldados);

export default router;
