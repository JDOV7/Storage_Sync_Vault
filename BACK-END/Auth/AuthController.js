import { creandoUsuarioServicio } from "./AuthServicio.js";

const creandoUsuarioController = async (req, res) => {
  try {
    const { IdPlanes, Correo, Nombres, Apellidos } = req.body;
    const usuario = { IdPlanes, Correo, Nombres, Apellidos };
    const respuesta = await creandoUsuarioServicio(usuario);
    if (respuesta.status !== 200) {
      throw new Error("Algo salio mal");
    }
    return res.status(200).json({
      status: 200,
      message: "Usuario creado correctamente controller",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Algo salio mal en el servidor",
    });
  }
};

export { creandoUsuarioController };
