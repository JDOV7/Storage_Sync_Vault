import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import routerUsuario from "./Usuarios/index.js";
import routerAuth from "./Auth/AuthRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static("public"));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "public/logs/access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

dotenv.config();

app.use("/auth", routerAuth);
app.use("/usuarios", routerUsuario);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
