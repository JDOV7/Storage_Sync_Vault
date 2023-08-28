import { Op } from "sequelize";
import { ObjetosEliminados, Objetos } from "../Models/index.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import db from "../Config/db.js";

const crearObjectosEliminados = async (datos = []) => {
  try {
    const newDatos = [];
    datos.forEach((dato) => {
      const diasASumar = 30;
      const milisegundosPorDia = 24 * 60 * 60 * 1000;
      const fechaResultado = new Date(
        new Date().getTime() + diasASumar * milisegundosPorDia
      );

      dato.dataValues.FechaEliminado = new Date();
      dato.dataValues.FechaMaxRecuperacion = new Date(fechaResultado);
      const newDato = dato.dataValues;
      newDatos.push(newDato);
    });
    // console.log(newDatos);
    const objectosEliminados = await ObjetosEliminados.bulkCreate(newDatos);
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

const crearCarpetaEliminada = async (IdObjetos, transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    // console.log(IdObjetos);
    // return IdObjetos;
    const diasASumar = 30;
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const fechaResultado = new Date(
      new Date().getTime() + diasASumar * milisegundosPorDia
    );
    const eliminarCarpeta = await ObjetosEliminados.create(
      {
        IdObjetos,
        FechaEliminado: new Date(),
        FechaMaxRecuperacion: fechaResultado,
      },
      { transaction }
    );
    return {
      status: 200,
      message: "Carpeta eliminada exitosamente",
    };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    let status = 500;
    let message = "Error en el servidor";
    return {
      status,
      message,
    };
  }
};

const esUnObjectoEliminado = async (IdObjetos, EsDirectorio) => {
  try {
    const objectoEliminado = await ObjetosEliminados.findOne({
      where: {
        IdObjetos,
      },
    });
    console.log(objectoEliminado);
    if (!objectoEliminado) {
      throw new EntidadNoExisteError("No existe");
    }

    const objecto = await Objetos.findOne({
      where: {
        [Op.and]: [{ IdObjetos }, { EsDirectorio }],
      },
    });

    if (!objecto) {
      throw new EntidadNoExisteError("No existe");
    }
    return {
      status: 200,
      message: "Esta eliminado",
      data: {
        objecto,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

const restaurarDirectorioDB = async (IdObjetos = "", transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    const restaurar = await ObjetosEliminados.destroy({
      where: {
        IdObjetos,
      },
      transaction,
    });
    return {
      status: 200,
      message: "Directorio restaurado",
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    let status = 500,
      message = "Error en el servidor";
    return { status, message };
  }
};

export {
  crearObjectosEliminados,
  crearCarpetaEliminada,
  esUnObjectoEliminado,
  restaurarDirectorioDB,
};
