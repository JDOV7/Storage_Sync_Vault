import { Op } from "sequelize";
import { Planes, Usuarios } from "../Models/index.js";
import UsuarioDuplicadoError from "../Validadores/Errores/UsuarioDuplicadoError.js";
import TokenInvalidoError from "../Validadores/Errores/TokenInvalidoError.js";
import UsuarioInvalidoError from "../Validadores/Errores/UsuarioInvalidoError.js";
import creandoTokenAcceso from "../Helpers/CreandoTokenAcceso.js";
import generarJWT from "../Helpers/GenerarJWT.js";
// correo@gmail.com
const creandoUsuario = async (usuario = {}) => {
  try {
    const { IdPlanes, Correo, Nombres, Apellidos, Password } = usuario;
    const usuarioBuscar = await Usuarios.findOne({
      where: {
        Correo,
      },
    });
    if (usuarioBuscar && usuarioBuscar.Activo) {
      throw new UsuarioDuplicadoError(`El correo: ${Correo} ya esta en uso`);
    } else if (usuarioBuscar && !usuarioBuscar.Activo) {
      return {
        status: 200,
        message: `Se debe activar este correo: ${Correo}`,
      };
    }

    const crearUsuario = await Usuarios.create({
      IdPlanes,
      Correo,
      Nombres,
      Apellidos,
      Password,
      Activo: false,
    });

    return {
      status: 200,
      message:
        "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof UsuarioDuplicadoError) {
      status = 400;
      message = error.message;
    }
    if (error?.name === "SequelizeForeignKeyConstraintError") {
      status = 500;
      message =
        "Error en el servidor, el plan escogido no esta disponible o no existe";
    }
    return {
      status,
      message,
    };
  }
};

const confirmarCuenta = async (usuario = {}) => {
  try {
    const { TokenAcceso } = usuario;
    const buscarUsuario = await Usuarios.findOne({
      where: {
        TokenAcceso,
      },
    });

    if (!buscarUsuario) {
      throw new TokenInvalidoError("Token invalido");
    }

    if (buscarUsuario.Activo) {
      throw new TokenInvalidoError("Token invalido");
    }
    buscarUsuario.Activo = true;
    buscarUsuario.TokenAcceso = " ";
    await buscarUsuario.save();
    // console.log(buscarUsuario);
    return {
      status: 200,
      message: "Cuenta confirmada",
    };
  } catch (error) {
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof TokenInvalidoError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

const Login = async (usuario = {}) => {
  try {
    const { Correo, Password } = usuario;
    console.log(usuario);
    const buscarUsuario = await Usuarios.findOne({
      where: {
        [Op.and]: [{ Correo }, { Activo: true }],
      },
    });

    if (!buscarUsuario) {
      throw new UsuarioInvalidoError(`El correo: ${Correo} no es valido`);
    }

    if (!buscarUsuario.validarPassword(Password)) {
      throw new UsuarioInvalidoError(`La contraseña es invalida`);
    }
    const TokenAcceso = await creandoTokenAcceso();
    const info = {
      TokenAcceso,
    };
    buscarUsuario.TokenAcceso = TokenAcceso;
    await buscarUsuario.save();

    const tokenJWT = generarJWT(info);

    return {
      status: 200,
      message: "Logeado Existosamente",
      data: {
        tokenJWT,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof UsuarioInvalidoError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

export { creandoUsuario, confirmarCuenta, Login };
