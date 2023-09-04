import { compartirFolderConOtrosUsuariosParaLecturaServicio } from "./ObjectosCompartidosServicio.js";
const compartirFolderConOtrosUsuariosParaLecturaController = async (
  req,
  res
) => {
  try {
    // console.log(req.files);
    const datos = {
      folder: req.params.IdObjetos,
      body: req.body,
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

export { compartirFolderConOtrosUsuariosParaLecturaController };
