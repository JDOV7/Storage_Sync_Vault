import { check, validationResult } from "express-validator";
import { validarVacios } from "../Validadores/index.js";

const validandoCrearUsuario = async (req, res, next) => {
  const { IdPlanes, Correo, Nombres, Apellidos } = req.body;
  const validarVaciosRespuesta = await validarVacios(
    ["IdPlanes", "Correo", "Nombres", "Apellidos"],
    req
  );
  console.log(validarVaciosRespuesta);
  if (!validarVaciosRespuesta) {
    return res.status(400).json({
      status: 400,
      message: "Los campos no pueden ir vacios",
    });
  }
  return next();
};

export { validandoCrearUsuario };
