import express from "express";
import ValidarToken from "../Helpers/ValidarToken.js";
import { crearArchivoGoogle } from "./ObjectosGoogleController.js";
const router = express.Router();

router.post("/archivo/:IdObjetos", ValidarToken, crearArchivoGoogle);

export default router;
