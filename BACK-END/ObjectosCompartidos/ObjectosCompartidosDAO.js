import { Op } from "sequelize";
import { ObjetosCompartidos, Usuarios } from "../Models/index.js";
import registrarObjectoCompartidoETH from "../Helpers/ETH/RegistrarObjectoCompartidoETH.js";

const compartirFolderConOtrosUsuariosParaLectura = async (datos = {}) => {
  try {
    const {
      folder: IdObjetos,
      body: { Correo },
      usuario: { IdUsuarios },
      usuarioAutorizado: { IdUsuarios: IdUsuarioAutorizado },
    } = datos;
    const buscarPorCorreo = await Usuarios.findOne({
      where: {
        [Op.and]: [{ Correo }, { Activo: true }],
      },
    });
    const buscarSiYaSeCompartioElFolder = await ObjetosCompartidos.findOne({
      where: {
        IdUsuarios: IdUsuarioAutorizado,
        IdObjetos,
      },
    });
    console.log(buscarSiYaSeCompartioElFolder);
    if (buscarSiYaSeCompartioElFolder) {
      throw new Error(
        "Error: compartirFolderConOtrosUsuariosParaLectura, este folder ya fue compartido con este usuario"
      );
    }
    const datosCompartidos = {
      IdObjetos,
      IdUsuarios: buscarPorCorreo.IdUsuarios,
      FechaCompartido: new Date(),
    };
    const crearObjectoCompartido = await ObjetosCompartidos.create(
      datosCompartidos
    );

    const agregarETH = await registrarObjectoCompartidoETH(
      IdUsuarios,
      IdObjetos,
      IdUsuarioAutorizado
    );

    if (!agregarETH) {
      throw new Error(
        "Error: compartirFolderConOtrosUsuariosParaLectura, no se pudo meter a ETH"
      );
    }

    return {
      status: 200,
      message: `Folder compartida con el usuario: ${Correo}`,
      data: { IdObjetos, Correo, IdUsuarios, IdUsuarioAutorizado },
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

const compartirArchivoConOtrosUsuariosParaLectura = async (datos = {}) => {
  try {
    const {
      archivo: IdObjetos,
      body: { Correo },
      usuario: { IdUsuarios },
      usuarioAutorizado: { IdUsuarios: IdUsuarioAutorizado },
    } = datos;
    const buscarPorCorreo = await Usuarios.findOne({
      where: {
        [Op.and]: [{ Correo }, { Activo: true }],
      },
    });

    const buscarSiYaSeCompartioElArchivo = await ObjetosCompartidos.findOne({
      where: {
        IdUsuarios: IdUsuarioAutorizado,
        IdObjetos,
      },
    });
    console.log(buscarSiYaSeCompartioElArchivo);
    if (buscarSiYaSeCompartioElArchivo) {
      throw new Error(
        "Error: compartirArchivoConOtrosUsuariosParaLectura, este archivo ya fue compartido con este usuario"
      );
    }

    const datosCompartidos = {
      IdObjetos,
      IdUsuarios: buscarPorCorreo.IdUsuarios,
      FechaCompartido: new Date(),
    };
    const crearObjectoCompartido = await ObjetosCompartidos.create(
      datosCompartidos
    );

    const agregarETH = await registrarObjectoCompartidoETH(
      IdUsuarios,
      IdObjetos,
      IdUsuarioAutorizado
    );

    if (!agregarETH) {
      throw new Error(
        "Error: compartirArchivoConOtrosUsuariosParaLectura, no se pudo meter a ETH"
      );
    }

    return {
      status: 200,
      message: `Archivo compartido: ${Correo}`,
      data: { IdObjetos, IdUsuarios, Correo, IdUsuarioAutorizado },
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

export {
  compartirFolderConOtrosUsuariosParaLectura,
  compartirArchivoConOtrosUsuariosParaLectura,
};
