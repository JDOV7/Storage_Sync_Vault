import { Op } from "sequelize";
import axios from "axios";

import db from "../Config/db.js";
import { Usuarios } from "../Models/index.js";

import { crearCajaFuerte } from "../CajaFuertes/CajaFuertesDAO.js";

import UsuarioDuplicadoError from "../Validadores/Errores/UsuarioDuplicadoError.js";
import TokenInvalidoError from "../Validadores/Errores/TokenInvalidoError.js";
import UsuarioInvalidoError from "../Validadores/Errores/UsuarioInvalidoError.js";
import EntidadNoCreadaError from "../Validadores/Errores/EntidadNoCreadaError.js";

import creandoTokenAcceso from "../Helpers/CreandoTokenAcceso.js";
import generarJWT from "../Helpers/GenerarJWT.js";
// correo@gmail.com

const validarCodeGithub = async (code = "") => {
  // console.log();
  try {
    const params = new URLSearchParams([
      ["client_id", process.env.CLIENT_ID_GITHUB],
      ["client_secret", process.env.CLIENT_SECRET_GITHUB],
      ["code", code],
    ]);

    const headers = {
      accept: "application/json",
    };

    const res = await axios.get(process.env.URL_ACCESS_TOKEN_GITHUB, {
      params,
      headers,
    });
    // console.log(res);
    return {
      status: 200,
      message: "validarCodeGithub",
      data: {
        datos: res.data,
      },
    };
  } catch (error) {
    let status = 500,
      message = "Error en el servidor";

    return {
      status,
      message,
      data: {},
    };
  }
};

const obtenerDatosCuentaGithub = async (access_token = "") => {
  try {
    const headers = {
      Authorization: "token " + access_token,
    };

    const res = await axios.get(process.env.URL_USER_DATA_GITHUB, {
      headers,
    });

    const resEmail = await axios.get(process.env.URL_USER_EMAIL_GITHUB, {
      headers,
    });

    // console.log(datosUser);
    return {
      status: 200,
      message: "Info user",
      data: {
        perfil: { ...res.data, ...resEmail.data[0] },
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error en el servidor",
      data: {},
    };
  }
};

const existeCuentaRegistradaGitHub = async (
  IdAutorizacion = "",
  Correo = ""
) => {
  try {
    const usuario = await Usuarios.findOne({
      where: {
        [Op.and]: [
          {
            IdAutorizacion,
          },
          { ServidorAutorizacion: "Github" },
          { Correo },
        ],
      },
    });
    console.log(`${IdAutorizacion}-${Correo}`);

    console.log(usuario);

    if (!usuario) {
      return {
        status: 404,
        message: "existeCuentaRegistradaGitHub",
        data: {},
      };
    }

    return {
      status: 200,
      message: "existeCuentaRegistradaGitHub",
      data: { usuario },
    };
  } catch (error) {
    let status = 500,
      message = "Error en el servidor";
    if (error instanceof UsuarioInvalidoError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
      data: {},
    };
  }
};

const crearCuentaGitHub = async (datos = {}) => {
  const transaction = await db.transaction();
  try {
    const {
      IdPlanes,
      email: Correo,
      login: Nombres,
      id: IdAutorizacion,
    } = datos;

    const crearUsuarioGitHubDatos = {
      IdPlanes,
      Correo,
      Nombres,
      Activo: false,
      IdAutorizacion,
      Password: "",
      ServidorAutorizacion: "Github",
    };

    const crearUsuario = await Usuarios.create(crearUsuarioGitHubDatos, {
      transaction,
    });
    // throw new Error("");

    const respuestaCajaFuerte = await crearCajaFuerte(
      crearUsuario.IdUsuarios,
      transaction
    );

    if (respuestaCajaFuerte.status !== 200) {
      throw new EntidadNoCreadaError(
        "Ocurrio un error, no se pudo crear el usuario"
      );
    }

    // await transaction.commit();
    return {
      status: 201,
      message: "Usuario creado correctamente",
      data: {},
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof UsuarioDuplicadoError) {
      await transaction.rollback();
      status = 400;
      message = error.message;
    } else if (error instanceof EntidadNoCreadaError) {
      status = 500;
      message = error.message;
    } else if (error?.name === "SequelizeForeignKeyConstraintError") {
      await transaction.rollback();
      status = 500;
      message =
        "Error en el servidor, el plan escogido no esta disponible o no existe";
    }

    return {
      status,
      message,
      data: {},
    };
  }
};

const verificarSiLaCuentaEstaConfirmadaGithub = async (IdAutorizacion = "") => {
  try {
    const buscarUsuario = await Usuarios.findOne({
      where: {
        [Op.and]: [
          { IdAutorizacion },
          { ServidorAutorizacion: "Github" },
          { Activo: true },
        ],
      },
    });

    if (!buscarUsuario) {
      throw new TokenInvalidoError("Cuenta no autorizada");
    }
    // console.log(buscarUsuario);
    return {
      status: 200,
      message: "Cuenta confirmada",
      data: { buscarUsuario },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof TokenInvalidoError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
      data: {},
    };
  }
};

const loginGithub = async (IdAutorizacion = "") => {
  try {
    console.log(IdAutorizacion);
    const buscarUsuario = await Usuarios.findOne({
      where: {
        [Op.and]: [
          { IdAutorizacion },
          { Activo: true },
          { ServidorAutorizacion: "Github" },
        ],
      },
    });

    if (!buscarUsuario) {
      throw new UsuarioInvalidoError(`No se puede iniciar sesion`);
    }
    const TokenAcceso = await creandoTokenAcceso(35);
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
      data: {},
    };
  }
};

const creandoUsuario = async (usuario = {}) => {
  let transaction = await db.transaction();
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

    const crearUsuarioDatos = {
      IdPlanes,
      Correo,
      Nombres,
      Apellidos,
      Password,
      Activo: false,
    };

    const crearUsuario = await Usuarios.create(crearUsuarioDatos, {
      transaction,
    });
    // throw new Error("");

    const respuestaCajaFuerte = await crearCajaFuerte(
      crearUsuario.IdUsuarios,
      transaction
    );

    if (respuestaCajaFuerte.status !== 200) {
      throw new EntidadNoCreadaError(
        "Ocurrio un error, no se pudo crear el usuario"
      );
    }

    // await transaction.commit();
    return {
      status: 200,
      message:
        "Usuario creado correctamente, revisa tu correo para confirmar tu cuenta",
    };
  } catch (error) {
    // console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof UsuarioDuplicadoError) {
      await transaction.rollback();
      status = 400;
      message = error.message;
    } else if (error instanceof EntidadNoCreadaError) {
      status = 500;
      message = error.message;
    } else if (error?.name === "SequelizeForeignKeyConstraintError") {
      await transaction.rollback();
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
    console.log(error);
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
    const TokenAcceso = await creandoTokenAcceso(35);
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

export {
  validarCodeGithub,
  obtenerDatosCuentaGithub,
  existeCuentaRegistradaGitHub,
  crearCuentaGitHub,
  loginGithub,
  creandoUsuario,
  confirmarCuenta,
  verificarSiLaCuentaEstaConfirmadaGithub,
  Login,
};
