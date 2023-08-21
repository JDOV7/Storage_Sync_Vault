const creandoUsuario = async (usuario = {}) => {
  try {
    const { IdPlanes, Correo, Nombres, Apellidos } = usuario;
    //TODO: Realiza la insercion a la BD

    return {
      status: 200,
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Algo salio mal en el servidor",
    };
  }
};

export { creandoUsuario };
