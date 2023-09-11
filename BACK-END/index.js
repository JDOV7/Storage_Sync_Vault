import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import routerUsuario from "./Usuarios/index.js";
import routerAuth from "./Auth/AuthRouter.js";
import routerCajaFuertes from "./CajaFuertes/CajaFuertesRouter.js";
import routerObjectos from "./Objetos/ObjectosRouter.js";
import routerObjectosCompartidos from "./ObjectosCompartidos/ObjectosCompartidosRouter.js";
import db from "./Config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "public/logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

dotenv.config();

try {
  await db.authenticate();
  db.sync();
  console.log("conexion correcta a la db");
} catch (error) {
  console.log(error);
}

app.use("/auth", routerAuth);
app.use("/usuarios", routerUsuario);
app.use("/caja-fuerte", routerCajaFuertes);
app.use("/objectos", routerObjectos);
app.use("/objectos-compartidos", routerObjectosCompartidos);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
