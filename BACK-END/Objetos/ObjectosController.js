import fs from "fs";
import AdmZip from "adm-zip";
import axios from "axios";
import { pipeline } from "stream";
import { promisify } from "util";
import { Op } from "sequelize";
import { create } from "ipfs-http-client";
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
  moverArchivoServicio,
  obtenerArchivoServicio,
} from "./ObjectosServicio.js";
import { descargarArchivoGoogle } from "../ObjectosGoogle/ObjectosGoogleController.js";
// import { ValidarPerteneceAlUsuarioM } from "../Validadores/ValidarPerteneceAlUsuario.js";

import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import db from "../Config/db.js";
import registrarObjectoEnETH from "../Helpers/ETH/RegistrarObjectoEnETH.js";
import { Objetos } from "../Models/index.js";
import { validarObjectoETH } from "../Validadores/ETH/ValidarFolderPerteneceAlUsuarioETH.js";
const pump = promisify(pipeline);

const subiendoArchivosController = async (req, res) => {
  try {
    // console.log(req.files);
    // throw new EntidadNoExisteError("No existe el padre");

    // console.log(req.files);

    const respuesta = await subiendoArchivosServicio(req);
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }

    return res.status(201).json({
      // message: `Archivo subido a IPFS. CID: ${cid}`,
      status: respuesta.status,
      message: respuesta.message,
      data: {},
    });
  } catch (error) {
    console.log(error);
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

    const registrarCarpetaEnETH = await registrarObjectoEnETH(
      IdUsuarios,
      respuesta.data.IdObjetos
    );
    if (!registrarCarpetaEnETH) {
      throw new Error("No se pudo registrar el objecto en ETH");
    }
    //---------------------Descomentar para usar el almacenamiento NO IPFS-------------
    // console.log("respuestaCrearDirReal llega");
    // const respuestaCrearDirReal = await crearDirectorioRealServicio(
    //   respuesta.data.UbicacionLogica
    // );
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

const moverArchivoController = async (req, res) => {
  try {
    const {
      params: { IdObjetos },
      body: { Padre },
    } = req;
    const respuesta = await moverArchivoServicio(IdObjetos, Padre);
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

const obtenerArchivoController = async (req, res) => {
  try {
    const {
      params: { IdObjetos },
      body: { Cid },
    } = req;

    const obtenerArchivo = await Objetos.findByPk(IdObjetos);
    let respuesta;
    if (
      obtenerArchivo.Mime ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const resGoogle = await descargarArchivoGoogle(Cid, "stream");
      // console.log(resGoogle);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      respuesta = resGoogle;
    } else {
      let url = `http://127.0.0.1:8080/ipfs/${Cid}`;

      const response = await axios.get(url, {
        responseType: "stream",
      });

      const tipoArchivo = response.headers["content-type"];
      console.log(tipoArchivo);
      res.setHeader("Content-Type", tipoArchivo);
      respuesta = response.data;
    }
    console.log(respuesta);

    await pump(respuesta, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

const obtenerObjectosEliminados = async (req, res) => {
  try {
    // /root/Eliminados-13e0f761-1912-4cb6-a109-2e88895fc604
    const {
      usuario: { IdUsuarios },
    } = req;
    const UbicacionVista = `/root/Eliminados-${IdUsuarios}`;

    const objecto = await Objetos.findOne({
      where: {
        UbicacionVista,
        Padre: IdUsuarios,
      },
    });

    if (!objecto) {
      throw new Error("Error: obtenerObjectosEliminados ");
    }

    const { Cid, IdObjetos } = objecto;

    const bvalidar = await validarObjectoETH(IdUsuarios, Cid);

    if (!bvalidar) {
      throw new Error(
        "Error:validarFolderParamPerteneceAlUsuarioETH No existe el objecto en la ETH"
      );
    }

    const elementos = await Objetos.findAll({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}/________-____-____-____-____________`,
            },
          },
          { IdUsuarios },
          { EstaEliminado: true },
        ],
      },
      attributes: {
        exclude: [
          "NombreLogico",
          "IdCajaFuertes",
          "IdUsuarios",
          // "UbicacionLogica",
          "Padre",
          "PesoMB",
          "EsDirectorio",
        ],
      },
    });

    return res.status(200).json({
      usuario: req.usuario,
      folder: objecto,
      elementos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

const arbolDeCarpetasController = async (req, res) => {
  try {
    const {
      usuario: { IdUsuarios },
    } = req;

    const [padres, carpetas] = await Promise.all([
      Objetos.findAll({
        where: {
          [Op.and]: [
            { EsDirectorio: true },
            { IdUsuarios },
            { Mime: "directory" },
            { EstaEliminado: false },
            {
              UbicacionVista: {
                [Op.notLike]: `%/root/Eliminados-${IdUsuarios}`,
              },
            },
          ],
        },
        attributes: ["IdObjetos", "NombreVista", "Padre"],
      }),
      Objetos.findAll({
        where: {
          [Op.and]: [
            { EsDirectorio: true },
            { IdUsuarios },
            { Mime: "directory" },
            { EstaEliminado: false },
            {
              UbicacionVista: {
                [Op.notLike]: `%/root/Eliminados-${IdUsuarios}`,
              },
            },
          ],
        },
      }),
    ]);

    // [
    //   { IdObjeto: 1, NombreVista: "Raíz", Padre: "/" },
    //   { IdObjeto: 2, NombreVista: "Hijo 1", Padre: 1 },
    //   { IdObjeto: 3, NombreVista: "Hijo 2", Padre: 1 },
    //   { IdObjeto: 4, NombreVista: "Nieto 1", Padre: 2 },
    //   { IdObjeto: 5, NombreVista: "Nieto 2", Padre: 2 },
    //   { IdObjeto: 6, NombreVista: "Hijo 3", Padre: 1 },
    //   { IdObjeto: 7, NombreVista: "Hijo 7", Padre: 6},
    // ]
    const arbol = construirArbol(padres, "/");

    return res.status(200).json({
      data: { usuario: req.usuario, arbol, padres, carpetas },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
      data: {},
    });
  }
};

const construirArbol = (objetos, padre) => {
  const nodo = {};

  objetos
    .filter((objeto) => objeto.dataValues.Padre == padre)
    .forEach((objeto) => {
      const { IdObjetos, NombreVista } = objeto.dataValues;
      nodo[`${IdObjetos}*|*${NombreVista}`] = construirArbol(
        objetos,
        IdObjetos
      );
    });
  return nodo;
};

const descargarCarpeta = async (request, response) => {
  try {
    const zip = new AdmZip();
    const {
      params: { IdObjetos },
    } = request;

    const folder = await Objetos.findByPk(IdObjetos);

    const contenido = await Objetos.findAll({
      where: {
        UbicacionLogica: {
          [Op.like]: `%${IdObjetos}%`,
        },
      },
    });
    const ubicacionIndex = folder.UbicacionVista.indexOf(folder.NombreVista);
    // zip.addFile("p3/test1.mkv", blob);
    for (let i = 0; i < contenido.length; i++) {
      const objeto = contenido[i];
      // console.log(objeto.IdObjetos);
      // console.log(objeto.NombreVista);
      // console.log(objeto.UbicacionVista);
      // console.log(objeto.EsDirectorio);
      if (!objeto.EsDirectorio) {
        let blob;

        if (
          objeto.Mime ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const resGoogle = await descargarArchivoGoogle(
            objeto.Cid,
            "arraybuffer"
          );
          // console.log(resGoogle);

          blob = await Buffer.from(resGoogle);
          objeto.UbicacionVista += ".xlsx";
          console.log(objeto.UbicacionVista);
          console.log(blob);
        } else {
          let url = `http://127.0.0.1:8080/ipfs/${objeto.Cid}`;

          const resIPFS = await axios.get(url, {
            responseType: "arraybuffer",
          });
          blob = await resIPFS.data;
        }

        // console.log(blob);
        console.log(objeto.UbicacionVista.substring(ubicacionIndex));

        zip.addFile(objeto.UbicacionVista.substring(ubicacionIndex), blob);
      }
    }
    await zip.writeZip("./files.zip");

    const data = await fs.readFileSync("./files.zip");

    console.log("------------enviando zip------------");
    console.log(Buffer.from(data));
    const blob = await Buffer.from(data);
    response.setHeader("Content-Type", "application/zip");

    // await pump(blob, response);
    response.end(blob);

    // res.set("Content-Type", "application/zip");
    // res.set("Content-Disposition", `attachment; filename=${fileName}`);
    // await pump(response.data, res);
    // res.send(data);
    // response.send(blob);

    // return response.status(200).json({
    //   status: 200,
    //   message: "descargarCarpeta",
    //   // data: { blob },
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error: descargarCarpeta",
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
  moverArchivoController,
  obtenerArchivoController,
  obtenerObjectosEliminados,
  arbolDeCarpetasController,
  descargarCarpeta,
};
