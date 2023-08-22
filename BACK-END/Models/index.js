import Planes from "./Planes.js";
import Usuarios from "./Usuarios.js";
import CajaFuertes from "./CajaFuertes.js";
import Objetos from "./Objetos.js";
import ObjetosEliminados from "./ObjetosEliminados.js";
import ObjetosCompartidos from "./ObjetosCompartidos.js";

Usuarios.belongsTo(Planes, { foreignKey: "IdPlanes" });

CajaFuertes.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

Objetos.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

Objetos.belongsTo(CajaFuertes, { foreignKey: "IdCajaFuertes" });

ObjetosEliminados.belongsTo(Objetos, { foreignKey: "IdObjetos" });

ObjetosCompartidos.belongsTo(Usuarios, { foreignKey: "IdUsuarios" });

ObjetosCompartidos.belongsTo(Objetos, { foreignKey: "IdObjetos" });

export {
  Planes,
  Usuarios,
  CajaFuertes,
  Objetos,
  ObjetosEliminados,
  ObjetosCompartidos,
};
