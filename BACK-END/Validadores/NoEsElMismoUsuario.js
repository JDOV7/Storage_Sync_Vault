import { Op } from "sequelize";
import { Usuarios } from "../Models/index.js";
import UsuarioInvalidoError from "./Errores/UsuarioInvalidoError.js";
import OperacionUsuarioNoValidaError from "./Errores/OperacionUsuarioNoValidaError.js";

const NoEsElMismoUsuarioCorreo = async (req, res, next) => {
  try {
    console.log(req.usuario);
    const { Correo } = req.body;
    if (!Correo) {
      throw new UsuarioInvalidoError("El correo no existe");
    }
    const buscarPorCorreo = await Usuarios.findOne({
      where: {
        [Op.and]: [{ Correo }, { Activo: true }],
      },
    });
    if (buscarPorCorreo.IdUsuarios === req.usuario.IdUsuarios) {
      throw new OperacionUsuarioNoValidaError("El usuario no existe");
    }
    return next();
  } catch (error) {
    console.log(error);

    let status = 500,
      message = "Error en el servidor";

    if (error instanceof UsuarioInvalidoError) {
      status = 400;
      message = error.message;
    }
    if (error instanceof OperacionUsuarioNoValidaError) {
      status = 400;
      message = error.message;
    }

    return res.status(status).json({
      status,
      message,
      data: {},
    });
  }
};

export { NoEsElMismoUsuarioCorreo };
