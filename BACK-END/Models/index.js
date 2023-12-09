// import Planes from "./Planes.js";
import Usuarios from "./Usuarios.js";
// import CajaFuertes from "./CajaFuertes.js";
import Objetos from "./Objetos.js";
import ObjetosEliminados from "./ObjetosEliminados.js";
import ObjetosCompartidos from "./ObjetosCompartidos.js";
import Respaldos from "./Respaldos.js";

// Usuarios.belongsTo(Planes, { foreignKey: "IdPlanes" });

// CajaFuertes.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

Objetos.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

ObjetosEliminados.belongsTo(Objetos, { foreignKey: "IdObjetos" });

ObjetosCompartidos.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

ObjetosCompartidos.belongsTo(Objetos, { foreignKey: "IdObjetos" });

Respaldos.belongsTo(Objetos, { foreignKey: "IdObjetos" });

Respaldos.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

export {
  // Planes,
  Usuarios,
  // CajaFuertes,
  Objetos,
  ObjetosEliminados,
  ObjetosCompartidos,
  Respaldos,
};
