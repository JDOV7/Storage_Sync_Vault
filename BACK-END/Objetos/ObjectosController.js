import {
  subiendoArchivosServicio,
  crearDirectorioServicio,
  //   obtenerDatosPadreServicio,
  crearDirectorioRealServicio,
  obtenerElementosDirectorioServicio,
  eliminarDirectorioServicio,
  recuperarDirectorioServicio,
  moverFolderServicio,
  obtenerInformacionArchivoServicio,
  eliminarArchivoServicio,
} from "./ObjectosServicio.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import db from "../Config/db.js";
// import { ValidarPerteneceAlUsuarioM } from "../Validadores/ValidarPerteneceAlUsuario.js";

const subiendoArchivosController = async (req, res) => {
  try {
    // console.log(req.files);
    // throw new EntidadNoExisteError("No existe el padre");

    const respuesta = await subiendoArchivosServicio(req);
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

const crearDirectorioController = async (req, res) => {
  const transaction = await db.transaction();
  try {
    // console.log(req.usuario);
    const { IdUsuarios } = req.usuario;
    const { NombreVista, Padre, padre } = req.body;
    const datosDirRaiz = {
      IdUsuarios,
      NombreVista,
      Padre,
      EsDirectorio: true,
      Mime: "directory",
      PesoMB: 0,
      FechaCreacion: new Date(),
      FechaActualizacion: new Date(),
      EstaEliminado: false,
    };
    // const padre = await obtenerDatosPadreServicio(Padre);
    // if (!padre || padre.IdUsuarios != IdUsuarios) {
    //   throw new EntidadNoExisteError("No existe el padre");
    // }
    datosDirRaiz.UbicacionVista = padre.datos.UbicacionVista;
    datosDirRaiz.UbicacionLogica = padre.datos.UbicacionLogica;
    const respuesta = await crearDirectorioServicio(datosDirRaiz, transaction);
    console.log(respuesta);
    if (respuesta.status != 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    console.log("respuestaCrearDirReal llega");
    const respuestaCrearDirReal = await crearDirectorioRealServicio(
      respuesta.data.UbicacionLogica
    );
    await transaction.commit();
    return res.status(200).json(respuesta);
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    let status = 500;
    let message = "Error en el servidor controller";

    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    }

    return res.status(status).json({
      status,
      message,
    });
  }
};

const obtenerElementosDirectorioController = async (req, res) => {
  try {
    const { IdObjetos } = req.params;
    const { IdUsuarios } = req.usuario;
    const datos = { IdObjetos, IdUsuarios };
    const respuesta = await obtenerElementosDirectorioServicio(datos);
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

const eliminarDirectorioController = async (req, res) => {
  try {
    // console.log(req.files);
    // throw new EntidadNoExisteError("No existe el padre");

    const respuesta = await eliminarDirectorioServicio({
      ...req.body,
      IdObjetos: req.params.IdObjetos,
      ...req.usuario,
    });
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

const recuperarDirectorioController = async (req, res) => {
  try {
    // console.log(req.files);
    // throw new EntidadNoExisteError("No existe el padre");
    const datos = {
      infoObjecto: req.body.inforDir,
    };
    const respuesta = await recuperarDirectorioServicio(datos);
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

const moverFolderController = async (req, res) => {
  try {
    // console.log(req.files);
    // throw new EntidadNoExisteError("No existe el padre");
    req.body.paramsObjecto.datos.IdObjetos = req.params.IdObjetos;
    req.body.padre.datos.Padre = req.body.Padre;
    const datos = {
      Objecto: req.body.paramsObjecto,
      Padre: req.body.padre,
    };
    const respuesta = await moverFolderServicio(datos);
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

const obtenerInformacionArchivoController = async (req, res) => {
  try {
    const respuesta = await obtenerInformacionArchivoServicio(
      req.params.IdObjetos
    );
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json(respuesta);
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

const eliminarArchivoController = async (req, res) => {
  try {
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = req;
    const respuesta = await eliminarArchivoServicio(IdObjetos, IdUsuarios);
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json(respuesta);
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

export {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
  eliminarDirectorioController,
  recuperarDirectorioController,
  moverFolderController,
  obtenerInformacionArchivoController,
  eliminarArchivoController,
};
