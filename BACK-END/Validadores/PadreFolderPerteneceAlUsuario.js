import { folderPerteneceAlUsuarioServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const PadreFolderPerteneceAlUsuario = async (req, res, next) => {
  try {
    const {
      body: { Padre },
    } = req;
    const {
      usuario: { IdUsuarios },
    } = req;
    console.log(Padre);
    console.log(IdUsuarios);
    const folderPerteneceAlUsuarioServicioRespuesta =
      await folderPerteneceAlUsuarioServicio(Padre, IdUsuarios);
    console.log("------PadreFolderPerteneceAlUsuario mid---------");
    console.log(folderPerteneceAlUsuarioServicioRespuesta);
    if (
      !folderPerteneceAlUsuarioServicioRespuesta ||
      folderPerteneceAlUsuarioServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("El folder no existe");
    }
    return next();
  } catch (error) {
    console.log(error);
    console.log("-------PadreFolderPerteneceAlUsuario------");
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

export default PadreFolderPerteneceAlUsuario;
