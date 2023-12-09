import { archivoPerteneceAlUsuarioServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";
const ArchivoPerteneceAlUsuario = async (req, res, next) => {
  try {
    const {
      params: { IdObjetos },
    } = req;
    const {
      usuario: { IdUsuarios },
    } = req;
    console.log(IdObjetos);
    console.log(IdUsuarios);
    const archivoPerteneceAlUsuarioServicioRespuesta =
      await archivoPerteneceAlUsuarioServicio(IdObjetos, IdUsuarios);
    console.log(archivoPerteneceAlUsuarioServicioRespuesta);
    if (
      !archivoPerteneceAlUsuarioServicioRespuesta ||
      archivoPerteneceAlUsuarioServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("Este Archivo no existe");
    }
    req.body.Cid = archivoPerteneceAlUsuarioServicioRespuesta.data.archivo.Cid;
    // return res.status(200).json({
    //   status: 200,
    //   message: "ArchivoPerteneceAlUsuario",
    //   data: {
    //     Cid: archivoPerteneceAlUsuarioServicioRespuesta.data.archivo.Cid,
    //     usuario: req.usuario,
    //   },
    // });
    return next();
  } catch (error) {
    console.log("-------ArchivoPerteneceAlUsuario------");
    console.log(error);
    let status = 500,
      message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
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

export default ArchivoPerteneceAlUsuario;
