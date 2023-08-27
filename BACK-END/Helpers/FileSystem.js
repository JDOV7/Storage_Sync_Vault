import { mkdir, rmdir, rm, chmod } from "node:fs/promises";
import fs from "fs-extra";

const moverDir = async (lugarActual, lugarDestino) => {
  try {
    const moviendoDir = await fs.move(lugarActual, lugarDestino, {
      overwrite: true,
    });
    return {
      status: 200,
      message: "El directorio se movio exitosamente",
    };
  } catch (error) {
    let status = 500,
      message = "Error al mover el directorio";
    return {
      status,
      message,
    };
  }
};

export { moverDir };
