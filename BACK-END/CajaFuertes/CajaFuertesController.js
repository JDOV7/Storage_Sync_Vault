import { crearCajaFuerteServicio } from "./CajaFuertesServicio.js";

const crearCajaFuerteController = async (req, res) => {
  try {
    const { IdUsuario } = req.body;
    const respuesta = await crearCajaFuerteServicio(IdUsuario);
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

export { crearCajaFuerteController };
