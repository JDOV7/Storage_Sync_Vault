import { recuperarArchivoServicio } from "./ObjectosEliminadosServicio.js";

const recuperarArchivoController = async (req, res) => {
  try {
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = req;
    const respuesta = await recuperarArchivoServicio(IdObjetos, IdUsuarios);
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

export { recuperarArchivoController };
