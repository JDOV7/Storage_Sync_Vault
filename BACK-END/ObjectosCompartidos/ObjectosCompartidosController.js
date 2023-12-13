import axios from "axios";
import { pipeline } from "stream";
import { promisify } from "util";
import EliminarAccesoCompartidoETH from "../Helpers/ETH/EliminarAccesoCompartidoETH.js";
import { ObjetosCompartidos, Usuarios, Objetos } from "../Models/index.js";
import { ValidarCuentasAutorizadasETH } from "../Validadores/ETH/ValidarExistenCuentasAutorizadasETH.js";
import {
  compartirFolderConOtrosUsuariosParaLecturaServicio,
  compartirArchivoConOtrosUsuariosParaLecturaServicio,
} from "./ObjectosCompartidosServicio.js";
import { descargarArchivoGoogle } from "../ObjectosGoogle/ObjectosGoogleController.js";
const pump = promisify(pipeline);
const compartirFolderConOtrosUsuariosParaLecturaController = async (
  req,
  res
) => {
  try {
    // console.log(req.files);

    const datos = {
      folder: req.params.IdObjetos,
      body: req.body,
      usuario: req.usuario,
      usuarioAutorizado: req.usuarioAutorizado,
    };
    const respuesta = await compartirFolderConOtrosUsuariosParaLecturaServicio(
      datos
    );
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const compartirArchivoConOtrosUsuariosParaLecturaController = async (
  req,
  res
) => {
  try {
    // console.log(req.files);
    const datos = {
      archivo: req.params.IdObjetos,
      body: req.body,
      usuario: req.usuario,
      usuarioAutorizado: req.usuarioAutorizado,
    };
    const respuesta = await compartirArchivoConOtrosUsuariosParaLecturaServicio(
      datos
    );
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const obtenerCuentasAutorizadasController = async (request, response) => {
  try {
    const {
      cuentasAutorizadas,
      usuario: { IdUsuarios },
      params: { IdObjetos },
    } = request;

    const cuentas = [];

    for (let i = 0; i < cuentasAutorizadas.length; i++) {
      const cuenta = cuentasAutorizadas[i];
      const buscaCuenta = await ObjetosCompartidos.findOne({
        where: {
          IdUsuarios: cuenta,
          IdObjetos,
        },
        include: {
          model: Usuarios,
          attributes: ["Correo", "IdUsuarios"],
        },
      });

      if (buscaCuenta) {
        // console.log(buscaCuenta.dataValues);
        cuentas.push(buscaCuenta.dataValues);
      }
    }

    return response.status(200).json({
      status: 200,
      message: "obtenerCuentasAutorizadasController",
      data: { cuentas },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: obtenerCuentasAutorizadasController, no se pudo obtener las cuentas autorizadas",
      data: {},
    });
  }
};

const eliminarAccesoArchivo = async (request, response) => {
  try {
    const {
      cuentasAutorizadas,
      usuario: { IdUsuarios },
      params: { IdObjetos },
      body: { IdUsuarios: idUsuarioQuitarPermiso },
    } = request;

    if (!cuentasAutorizadas.includes(idUsuarioQuitarPermiso)) {
      throw new Error(
        "Error: eliminarAccesoArchivo, esta cuenta no rtiene acceso"
      );
    }

    const buscarUsuario = await Usuarios.findOne({
      where: {
        IdUsuarios: idUsuarioQuitarPermiso,
        Activo: true,
      },
    });

    const eliminarRegistroBD = await ObjetosCompartidos.findOne({
      where: {
        IdUsuarios: idUsuarioQuitarPermiso,
        IdObjetos,
      },
    });

    if (!buscarUsuario) {
      throw new Error("Error: eliminarAccesoArchivo, esta cuenta no existe");
    }

    await EliminarAccesoCompartidoETH(
      IdUsuarios,
      IdObjetos,
      idUsuarioQuitarPermiso
    );

    await eliminarRegistroBD.destroy();
    // const eliminarRegistroBD = await ObjetosCompartidos.destroy({
    //   where: {
    //     IdUsuarios: idUsuarioQuitarPermiso,
    //     IdObjetos,
    //   },
    // });

    return response.status(200).json({
      status: 200,
      message: "eliminarAccesoArchivo",
      data: {
        IdUsuarios,
        idUsuarioQuitarPermiso,
        IdObjetos,
        cuentasAutorizadas,
        buscarUsuario,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: eliminarAccesoArchivo, no se pudo eliminar la asocionacion",
      data: {},
    });
  }
};

const obtenerCuentasAutorizadasFolderController = async (request, response) => {
  try {
    const {
      cuentasAutorizadas,
      usuario: { IdUsuarios },
      params: { IdObjetos },
    } = request;

    const cuentas = [];

    for (let i = 0; i < cuentasAutorizadas.length; i++) {
      const cuenta = cuentasAutorizadas[i];
      const buscaCuenta = await ObjetosCompartidos.findOne({
        where: {
          IdUsuarios: cuenta,
          IdObjetos,
        },
        include: {
          model: Usuarios,
          attributes: ["Correo", "IdUsuarios"],
        },
      });

      if (buscaCuenta) {
        // console.log(buscaCuenta.dataValues);
        cuentas.push(buscaCuenta.dataValues);
      }
    }

    return response.status(200).json({
      status: 200,
      message: "obtenerCuentasAutorizadasFolderController",
      data: { cuentas },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: obtenerCuentasAutorizadasFolderController, no se pudo obtener las cuentas autorizadas",
      data: {},
    });
  }
};

const eliminarAccesoFolder = async (request, response) => {
  try {
    const {
      cuentasAutorizadas,
      usuario: { IdUsuarios },
      params: { IdObjetos },
      body: { IdUsuarios: idUsuarioQuitarPermiso },
    } = request;

    if (!cuentasAutorizadas.includes(idUsuarioQuitarPermiso)) {
      throw new Error(
        "Error: eliminarAccesoFolder, esta cuenta no rtiene acceso"
      );
    }

    const buscarUsuario = await Usuarios.findOne({
      where: {
        IdUsuarios: idUsuarioQuitarPermiso,
        Activo: true,
      },
    });

    const eliminarRegistroBD = await ObjetosCompartidos.findOne({
      where: {
        IdUsuarios: idUsuarioQuitarPermiso,
        IdObjetos,
      },
    });

    if (!buscarUsuario) {
      throw new Error("Error: eliminarAccesoFolder, esta cuenta no existe");
    }

    await EliminarAccesoCompartidoETH(
      IdUsuarios,
      IdObjetos,
      idUsuarioQuitarPermiso
    );

    await eliminarRegistroBD.destroy();

    return response.status(200).json({
      status: 200,
      message: "eliminarAccesoFolder",
      data: {
        IdUsuarios,
        idUsuarioQuitarPermiso,
        IdObjetos,
        cuentasAutorizadas,
        buscarUsuario,
        eliminarRegistroBD,
      },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: eliminarAccesoFolder, no se pudo eliminar la asocionacion",
      data: {},
    });
  }
};

const objetosCompartidosUsuario = async (request, response) => {
  try {
    const {
      usuario: { IdUsuarios },
    } = request;

    const objetos = await ObjetosCompartidos.findAll({
      where: {
        IdUsuarios,
      },
      include: {
        model: Objetos,
        attributes: ["IdObjetos", "NombreVista", "Mime"],
        include: {
          model: Usuarios,
          attributes: ["Nombres", "Apellidos", "Correo"],
        },
      },
    });

    return response.status(200).json({
      status: 200,
      message: "objetosCompartidosUsuario  ",
      data: { objetos },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: objetosCompartidosUsuario, no se pudo obtener los archivos",
      data: {},
    });
  }
};

const descargarArchivoCompartido = async (request, response) => {
  try {
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = request;

    // ValidarCuentasAutorizadasETH

    const archivo = await Objetos.findOne({
      where: {
        IdObjetos,
        EsDirectorio: false,
      },
    });

    if (!archivo) {
      throw new Error(
        "Error: descargarArchivoCompartido, el IdObjetos debe ser para un archivo"
      );
    }
    const cuentasAutorizadas = await ValidarCuentasAutorizadasETH(
      archivo.IdUsuarios,
      IdObjetos
    );

    if (!cuentasAutorizadas.includes(IdUsuarios)) {
      throw new Error(
        "Error: descargarArchivoCompartido, este usuario no esta autorizado"
      );
    }

    const objectoCompartido = await ObjetosCompartidos.findOne({
      where: { IdUsuarios, IdObjetos },
    });

    if (!objectoCompartido) {
      throw new Error(
        "Error: descargarArchivoCompartido, este usuario no esta autorizado en la BD"
      );
    }
    let respuesta;
    if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const resGoogle = await descargarArchivoGoogle(archivo.Cid, "stream");
      // console.log(resGoogle);
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      respuesta = resGoogle;
    } else if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const resGoogle = await descargarArchivoGoogle(archivo.Cid, "stream");
      // console.log(resGoogle);
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
      respuesta = resGoogle;
    } else if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const resGoogle = await descargarArchivoGoogle(archivo.Cid, "stream");
      // console.log(resGoogle);
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      );
      respuesta = resGoogle;
    } else {
      let url = `http://127.0.0.1:8080/ipfs/${archivo.Cid}`;

      const res = await axios.get(url, {
        responseType: "stream",
      });

      const tipoArchivo = res.headers["content-type"];
      console.log(tipoArchivo);
      response.setHeader("Content-Type", tipoArchivo);
      respuesta = res.data;
    }

    await pump(respuesta, response);
    // return response.status(200).json({
    //   status: 200,
    //   message: "descargarArchivoCompartido",
    //   data: {
    //     IdObjetos,
    //     IdUsuarios,
    //     archivo,
    //     cuentasAutorizadas,
    //     objectoCompartido,
    //   },
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error:descargarArchivoCompartido, al descargar el archivo",
      data: {},
    });
  }
};

export {
  compartirFolderConOtrosUsuariosParaLecturaController,
  compartirArchivoConOtrosUsuariosParaLecturaController,
  obtenerCuentasAutorizadasController,
  eliminarAccesoArchivo,
  eliminarAccesoFolder,
  obtenerCuentasAutorizadasFolderController,
  objetosCompartidosUsuario,
  descargarArchivoCompartido,
};
