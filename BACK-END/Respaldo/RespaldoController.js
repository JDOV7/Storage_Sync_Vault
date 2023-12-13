import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import AdmZip from "adm-zip";
import fs from "fs";
import { Op } from "sequelize";
import axios from "axios";
import dotenv from "dotenv";
import { pipeline } from "stream";
import { promisify } from "util";
import { descargarArchivoGoogle } from "../ObjectosGoogle/ObjectosGoogleController.js";
import { Objetos, Respaldos } from "../Models/index.js";
import db from "../Config/db.js";
const pump = promisify(pipeline);
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const Bucket = process.env.AWS_BUCKET;
// const UserPoolId="us-east-1_ie9T62D7f"
// const ClientId= "6prj6eckhoe1kpj760pigjfp1h"

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const respaldarFolder = async (request, response) => {
  const transaction = await db.transaction();
  try {
    const zip = new AdmZip();
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = request;

    const folder = await Objetos.findByPk(IdObjetos);

    if (!folder) {
      throw new Error("Error: respaldarFolder, no existe el dir");
    }

    if (!(folder.Mime == "directory" || folder.EsDirectorio)) {
      throw new Error("Error: respaldarFolder, no es un directorio");
    }

    const contenido = await Objetos.findAll({
      where: {
        UbicacionLogica: {
          [Op.like]: `%${IdObjetos}%`,
        },
        IdUsuarios,
      },
    });

    if (!contenido || contenido.length == 0) {
      throw new Error("Error: respaldarFolder, no existe el elemento");
    }

    const ubicacionIndex = folder.UbicacionVista.indexOf(folder.NombreVista);
    // zip.addFile("p3/test1.mkv", blob);
    for (let i = 0; i < contenido.length; i++) {
      const objeto = contenido[i];
      // console.log(objeto.IdObjetos);
      // console.log(objeto.NombreVista);
      // console.log(objeto.UbicacionVista);
      // console.log(objeto.EsDirectorio);
      if (!objeto.EsDirectorio) {
        let blob;

        if (
          objeto.Mime ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          const resGoogle = await descargarArchivoGoogle(
            objeto.Cid,
            "arraybuffer"
          );
          // console.log(resGoogle);

          blob = await Buffer.from(resGoogle);
          objeto.UbicacionVista += ".xlsx";
          console.log(objeto.UbicacionVista);
          console.log(blob);
        } else if (
          objeto.Mime ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const resGoogle = await descargarArchivoGoogle(
            objeto.Cid,
            "arraybuffer"
          );
          // console.log(resGoogle);

          blob = await Buffer.from(resGoogle);
          objeto.UbicacionVista += ".docx";
          console.log(objeto.UbicacionVista);
          console.log(blob);
        } else if (
          objeto.Mime ==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) {
          const resGoogle = await descargarArchivoGoogle(
            objeto.Cid,
            "arraybuffer"
          );
          // console.log(resGoogle);

          blob = await Buffer.from(resGoogle);
          objeto.UbicacionVista += ".pptx";
          console.log(objeto.UbicacionVista);
          console.log(blob);
        } else {
          let url = `http://127.0.0.1:8080/ipfs/${objeto.Cid}`;

          const resIPFS = await axios.get(url, {
            responseType: "arraybuffer",
          });
          blob = await resIPFS.data;
        }

        // console.log(blob);
        console.log(objeto.UbicacionVista.substring(ubicacionIndex));

        zip.addFile(objeto.UbicacionVista.substring(ubicacionIndex), blob);
      }
    }
    await zip.writeZip(`./${IdObjetos}.zip`);

    // const data = await fs.readFileSync("./files.zip");
    const crearRespaldo = await Respaldos.create(
      { FechaDeRespaldo: new Date(), IdObjetos, IdUsuarios },
      { transaction }
    );

    const fileContent = fs.readFileSync(`./${IdObjetos}.zip`);
    console.log(fileContent);
    const zipFileName = `${IdObjetos}.zip`;
    const uploadParams = {
      Bucket,
      Key: `${zipFileName}`,
      Body: fileContent,
    };
    const data = await client.send(new PutObjectCommand(uploadParams));

    await transaction.commit();
    return response.status(201).json({
      status: 201,
      message: "respaldarFolder, folder respaldado",
      data: { contenido },
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return response.status(500).json({
      status: 500,
      message: "Error: respaldarFolder, no se pudo reslpadar el folder",
      data: {},
    });
  }
};

const respaldarArchivo = async (request, response) => {
  const transaction = await db.transaction();
  try {
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = request;

    const archivo = await Objetos.findByPk(IdObjetos);

    if (!archivo) {
      throw new Error("Error: respaldarArchivo, no existe el archivo");
    }

    if (archivo.IdUsuarios != IdUsuarios) {
      throw new Error(
        "Error: respaldarArchivo, no le pertenece a este usuario"
      );
    }

    if (archivo.Mime == "directory" || archivo.EsDirectorio) {
      throw new Error("Error: respaldarArchivo, no es un archivo");
    }

    let respuesta;
    let nombre;
    if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const resGoogle = await descargarArchivoGoogle(
        archivo.Cid,
        "arraybuffer"
      );
      // console.log(resGoogle);

      respuesta = resGoogle;
      nombre = archivo.IdObjetos + ".xlsx";
    } else if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const resGoogle = await descargarArchivoGoogle(
        archivo.Cid,
        "arraybuffer"
      );
      // console.log(resGoogle);

      respuesta = resGoogle;
      nombre = archivo.IdObjetos + ".docx";
    } else if (
      archivo.Mime ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      const resGoogle = await descargarArchivoGoogle(
        archivo.Cid,
        "arraybuffer"
      );
      // console.log(resGoogle);

      respuesta = resGoogle;
      nombre = archivo.IdObjetos + ".pptx";
    } else {
      let url = `http://127.0.0.1:8080/ipfs/${archivo.Cid}`;

      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      const indexPunto = archivo.NombreVista.indexOf(".");
      nombre = archivo.IdObjetos + archivo.NombreVista.substring(indexPunto);
      respuesta = response.data;
    }
    console.log(respuesta);

    const crearRespaldo = await Respaldos.create(
      { FechaDeRespaldo: new Date(), IdObjetos, IdUsuarios },
      { transaction }
    );
    console.log(nombre);
    const nombreArchivo = nombre;

    const uploadParams = {
      Bucket,
      Key: nombreArchivo,
      Body: respuesta,
    };
    const data = await client.send(new PutObjectCommand(uploadParams));

    await transaction.commit();
    return response.status(201).json({
      status: 201,
      message: "respaldarArchivo, archivo respaldado",
      data: { archivo },
    });
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return response.status(500).json({
      status: 500,
      message: "Error: respaldarArchivo, no se pudo reslpadar el archivo",
      data: {},
    });
  }
};

const descargarFolder = async (request, response) => {
  try {
    const {
      params: { IdObjetos },
      usuario: { IdUsuarios },
    } = request;

    const objecto = await Objetos.findOne({
      where: { IdObjetos, IdUsuarios },
    });

    if (!objecto) {
      throw new Error("Error:descargarFolder, el objecto no existe ");
    }

    let extension;
    if (objecto.Mime == "directory") {
      extension = ".zip";
    } else {
      if (
        objecto.Mime ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        extension = ".xlsx";
      } else if (
        objecto.Mime ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        extension = ".docx";
      } else if (
        objecto.Mime ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        extension = ".pptx";
      } else {
        const indexPunto = objecto.NombreVista.indexOf(".");
        extension = objecto.NombreVista.substring(indexPunto);
      }
    }

    const downloadParams = {
      Bucket,
      Key: `${IdObjetos}${extension}`,
    };
    const data = await client.send(new GetObjectCommand(downloadParams));
    const metadata = await client.send(new HeadObjectCommand(downloadParams));
    const contentType = metadata.ContentType;
    // const fileContent = await streamToBuffer(data.Body);
    console.log(contentType);
    console.log(metadata);
    // console.log(data.Body);
    const tipoArchivo = "application/octet-stream";
    response.setHeader("Content-Type", tipoArchivo);
    const respuesta = data.Body;
    // const guardar = await fs.writeFileSync("./prueba.zip");

    await pump(respuesta, response);

    // return response.status(201).json({
    //   status: 201,
    //   message: "descargarFolder, folder descargado",
    //   //   data: { data },
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error: descargarFolder, no se pudo descargar el folder",
      data: {},
    });
  }
};

const listaObjectosRespaldados = async (request, response) => {
  try {
    const {
      usuario: { IdUsuarios },
    } = request;

    const objectos = await Respaldos.findAll({
      where: {
        IdUsuarios,
      },
      include: {
        model: Objetos,
      },
    });

    return response.status(200).json({
      status: 200,
      message: " lista de objectos respaldados",
      data: { objectos },
    });
  } catch (error) {
    console.log(
      "----------------------listaObjectosRespaldados-----------------"
    );
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: listaObjectosRespaldados, no se pudo obtener la lista de objectos respaldados",
      data: {},
    });
  }
};

export {
  respaldarFolder,
  respaldarArchivo,
  descargarFolder,
  listaObjectosRespaldados,
};
