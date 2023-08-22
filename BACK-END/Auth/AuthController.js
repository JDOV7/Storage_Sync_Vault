import {
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
} from "./AuthServicio.js";

const creandoUsuarioController = async (req, res) => {
  try {
    const { IdPlanes, Correo, Nombres, Apellidos, Password } = req.body;
    const usuario = { IdPlanes, Correo, Nombres, Apellidos, Password };
    const respuesta = await creandoUsuarioServicio(usuario);
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

const confirmarCuentaController = async (req, res) => {
  try {
    const { TokenAcceso } = req.params;
    const usuario = { TokenAcceso };
    const respuesta = await confirmarCuentaServicio(usuario);
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

const LoginController = async (req, res) => {
  try {
    const { Correo, Password } = req.body;
    const usuario = { Correo, Password };
    const respuesta = await LoginServicio(usuario);
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

export { creandoUsuarioController, confirmarCuentaController, LoginController };
