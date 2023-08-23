import {
  subiendoArchivosServicio,
  crearDirectorioServicio,
  //   obtenerDatosPadreServicio,
  crearDirectorioRealServicio,
  obtenerElementosDirectorioServicio,
} from "./ObjectosServicio.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
// import { ValidarPerteneceAlUsuarioM } from "../Validadores/ValidarPerteneceAlUsuario.js";

const subiendoArchivosController = async (req, res) => {
  try {
    throw new EntidadNoExisteError("No existe el padre");

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
    };
    // const padre = await obtenerDatosPadreServicio(Padre);
    // if (!padre || padre.IdUsuarios != IdUsuarios) {
    //   throw new EntidadNoExisteError("No existe el padre");
    // }
    datosDirRaiz.UbicacionVista = padre.UbicacionVista;
    datosDirRaiz.UbicacionLogica = padre.UbicacionLogica;

    const respuesta = await crearDirectorioServicio(datosDirRaiz);
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

    return res.status(200).json(respuesta);
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor controller";

    if (error instanceof EntidadNoExisteError) {
      status = 400;
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

export {
  subiendoArchivosController,
  crearDirectorioController,
  obtenerElementosDirectorioController,
};
