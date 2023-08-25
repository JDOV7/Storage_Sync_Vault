import { ObjetosEliminados } from "../Models/index.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";

const crearObjectosEliminados = async (datos = []) => {
  try {
    datos.map((dato) => {
      const diasASumar = 30;
      const milisegundosPorDia = 24 * 60 * 60 * 1000;
      const fechaResultado = new Date(
        new Date().getTime() + diasASumar * milisegundosPorDia
      );

      dato.dataValues.FechaEliminado = new Date();
      dato.dataValues.FechaMaxRecuperacion = new Date(fechaResultado);

      console.log(dato);
      return dato;
    });
    // console.log(datos);
    return {
      status: 200,
      message: "Datos eliminados correctamente",
      data: {
        datos,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

export { crearObjectosEliminados };
