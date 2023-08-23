import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Usuarios } from "../Models/index.js";
import TokenInvalidoError from "../Validadores/Errores/TokenInvalidoError.js";
import UsuarioInvalidoError from "../Validadores/Errores/UsuarioInvalidoError.js";

export default async function ValidarToken(req, res, next) {
  let respuesta = {};
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new TokenInvalidoError("Error, no se pudo completar esta accion");
    }

    const verificar = jwt.verify(token, process.env.JWT_SECRET);
    if (!verificar.TokenAcceso) {
      throw new TokenInvalidoError("Error, no se pudo completar esta accion");
    }
    const { TokenAcceso } = verificar;
    const usuario = await Usuarios.findOne({
      where: {
        [Op.and]: [{ TokenAcceso }, { Activo: true }],
      },
    });

    if (!usuario) {
      throw new UsuarioInvalidoError("Error, el usuario no existe");
    }
    req.usuario = usuario.obtenerDatos();

    return next();
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (
      error instanceof UsuarioInvalidoError ||
      error instanceof TokenInvalidoError
    ) {
      status = 400;
      message = error.message;
    }

    return res.status(status).json({
      status,
      message,
    });
  }
}
