import { Op } from "sequelize";
import { Usuarios } from "../Models/index.js";
import UsuarioInvalidoError from "./Errores/UsuarioInvalidoError.js";

const ExisteElUsuarioCorreo = async (req, res, next) => {
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
    if (!buscarPorCorreo) {
      throw new UsuarioInvalidoError("El usuario no existe");
    }
    req.usuarioAutorizado = buscarPorCorreo;
    return next();
  } catch (error) {
    console.log(error);

    let status = 500,
      message = "Error en el servidor";

    if (error instanceof UsuarioInvalidoError) {
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

export { ExisteElUsuarioCorreo };
