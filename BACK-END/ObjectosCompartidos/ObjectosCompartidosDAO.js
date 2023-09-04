import { Op } from "sequelize";
import { ObjetosCompartidos, Usuarios } from "../Models/index.js";

const compartirFolderConOtrosUsuariosParaLectura = async (datos = {}) => {
  try {
    const {
      folder: IdObjetos,
      body: { Correo },
    } = datos;
    const buscarPorCorreo = await Usuarios.findOne({
      where: {
        [Op.and]: [{ Correo }, { Activo: true }],
      },
    });
    const datosCompartidos = {
      IdObjetos,
      IdUsuarios: buscarPorCorreo.IdUsuarios,
      FechaCompartido: new Date(),
    };
    const crearObjectoCompartido = await ObjetosCompartidos.create(
      datosCompartidos
    );

    return {
      status: 200,
      message: `Folder compartida con el usuario: ${Correo}`,
      data: {},
    };
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor";
    return {
      status,
      message,
      data: {},
    };
  }
};

export { compartirFolderConOtrosUsuariosParaLectura };
