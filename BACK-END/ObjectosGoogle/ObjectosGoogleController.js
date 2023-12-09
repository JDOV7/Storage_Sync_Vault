import { JWT } from "google-auth-library";
import { google } from "googleapis";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { v4 } from "uuid";
import axios from "axios";
import { Objetos, Usuarios } from "../Models/index.js";
import { validarObjectoETH } from "../Validadores/ETH/ValidarFolderPerteneceAlUsuarioETH.js";
import registrarObjectoEnETH from "../Helpers/ETH/RegistrarObjectoEnETH.js";
import registrarObjectoGoogleEnETH from "../Helpers/ETH/RegistrarObjectoGoogleETH.js";

const creados = [
  "1FRmt0uEndZ9eOBxC7mC4I0LkNr59b6AHn1usbxFtBmA",
  "1YNZZiws9R2bFCKPuu-cbcyNA1vFMOvC8xCVtcOYEKP4",
  "1-RjR5j2oy6RC2XUAAT5pM4k6Bt8CZ8y8S7UBgXH8zrs",
  "1eifA0_AO1CSOc_syW4dfWM8rI8kD83nY9XBTk96aepM",
  "1YOjL04TJsgOWUCnxtDJt_o9j5fccBdK3OqwDZk_CerA",
  "1fEaypFcF5sQDcr8eUj2Dsdu-i9WOke7l2wjlb0bUAiw",
];
const main = ["1lnauJ7DG7ZPag-Nwx7J5BsPz5uobGnGTflaMd3tERz4"];

const crearExcelFunc = async () => {
  const auth = new JWT({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
  });

  const service = google.sheets({ version: "v4", auth });
  const resource = {
    properties: {
      title: "sheet2:_06_12_2023",
    },
  };
  const spreadsheet = await service.spreadsheets.create({
    resource,
    fields: "spreadsheetId",
  });
  console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
};

const obtenerExcel = async () => {
  try {
    const auth = new JWT({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        // note that sharing-related calls require the google drive scope
        // "https://www.googleapis.com/auth/drive.file",
      ],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });
    const service = google.sheets({ version: "v4", auth });
    const sheet = await service.spreadsheets.get({
      spreadsheetId: creados[0],
    });
    console.log(sheet.data);
  } catch (error) {
    console.log("----------------obtenerExcel-------------");
    console.log(error);
  }
};

const obtenerExcelAxios = async () => {
  try {
    // No me funcionoagregarContenidoExcel
    const spreadsheetId = creados[0];
    const apiKey = "AIzaSyAh7TzHlCKRFoZyjX05IzJROssxFtfSfUo";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?key=${apiKey}`;
    const response = axios.get(url);
    console.log((await response).data);
  } catch (error) {
    console.log(error);
  }
};

const crearExcelConPermiso = async () => {
  try {
    // No me funciono
    const auth = new JWT({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        // note that sharing-related calls require the google drive scope
      ],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = creados[0];

    // Dirección de correo electrónico del usuario con el que deseas compartir
    const emailAddress = "jesusmarzo7@gmail.com";

    const permissions = {
      role: "writer", // Puede ser 'owner', 'writer', o 'reader'
      type: "user",
      emailAddress: emailAddress,
    };

    // Llamada a la API para compartir la hoja de cálculo
    sheets.spreadsheets.create(
      {
        spreadsheetId: spreadsheetId,
        resource: {
          role: permissions.role,
          type: permissions.type,
          emailAddress: permissions.emailAddress,
        },
      },
      (err, res) => {
        if (err) {
          console.error("Error al compartir la hoja de cálculo:", err);
          return;
        }

        console.log("Hoja de cálculo compartida con éxito:", res.data);
      }
    );
  } catch (error) {
    console.log(
      "---------------------------Error:crearExcelConPermiso---------------------"
    );
    console.log(error);
  }
};

const agregarContenidoExcel = async () => {
  try {
    const auth = new JWT({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        // note that sharing-related calls require the google drive scope
        "https://www.googleapis.com/auth/drive.file",
      ],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: creados[0],
      range: "Sheet1",
    });
    console.log(res.data);

    // let values = [["daniel3", "peru3", "24", "español"]];
    // const resource = {
    //   majorDimension: "ROWS",
    //   values,
    // };

    // const result = await sheets.spreadsheets.values.append({
    //   spreadsheetId: "1lnauJ7DG7ZPag-Nwx7J5BsPz5uobGnGTflaMd3tERz4",
    //   range: "Hoja 1!A:B",
    //   valueInputOption: "USER_ENTERED",
    //   insertDataOption: "INSERT_ROWS",
    //   resource,
    // });
    // console.log(result.data);
  } catch (error) {
    console.log(
      "--------------------agregarContenidoExcel---------------------"
    );
    console.log(error);
  }
};

const compartirFile = async () => {
  try {
    const auth = new JWT({
      scopes: ["https://www.googleapis.com/auth/drive"],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });
    const service = google.drive({ version: "v3", auth });
    const result = await service.permissions.create({
      resource: {
        type: "user",
        role: "writer",
        emailAddress: "jesusmarzo7@gmail.com", // 'user@partner.com',
      },
      fileId: "1FRmt0uEndZ9eOBxC7mC4I0LkNr59b6AHn1usbxFtBmA",
      fields: "id",
    });
    console.log(`Inserted permission id: ${result.data.id}`);
  } catch (error) {
    console.log("----------------------Error:compartirFile--------------");
    console.log(error);
  }
};

/**
 * Crear archivo
 * @IdObjetos {id} carpeta padre
 * @NombreVista {string} nombre del archivo
 * @TipoArchivo {int} numero que idetifica si es excel, word,etc
 * */
const crearArchivoGoogle = async (request, response) => {
  try {
    //
    const {
      params: { IdObjetos },
      body: { NombreVista, TipoArchivo },
      usuario: { IdUsuarios },
    } = request;

    if (!(TipoArchivo >= 1 && TipoArchivo <= 3)) {
      throw new Error("Error: crearArchivoGoogle, tipo de archivo invalido");
    }

    const buscarFolder = await Objetos.findOne({
      where: {
        IdObjetos,
        EsDirectorio: true,
        EstaEliminado: false,
        IdUsuarios,
      },
    });

    if (!buscarFolder) {
      throw new Error("Error: crearArchivoGoogle, no existe en la BD");
    }

    const { Cid, UbicacionVista, UbicacionLogica } = buscarFolder;

    const validarExisteEnETH = await validarObjectoETH(IdUsuarios, Cid);

    console.log(validarExisteEnETH);
    if (!validarExisteEnETH) {
      throw new Error("Error: crearArchivoGoogle, no existe en la ETH");
    }

    const IdObjetosNuevo = v4();
    const Padre =
      UbicacionLogica.split("/")[UbicacionLogica.split("/").length - 1];
    const FechaCreacion = new Date();
    const FechaActualizacion = FechaCreacion;

    const buscarUsuario = await Usuarios.findByPk(IdUsuarios);

    const { Correo } = buscarUsuario;

    const auth = new JWT({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });

    const service = google.sheets({ version: "v4", auth });
    const resource = {
      properties: {
        title: NombreVista,
      },
    };
    const spreadsheet = await service.spreadsheets.create({
      resource,
      // fields: "spreadsheetId",
    });

    console.log(spreadsheet.data);
    const { spreadsheetId } = spreadsheet.data;
    // console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);

    const serviceDrive = google.drive({ version: "v3", auth });
    const driveCompartir = await serviceDrive.permissions.create({
      resource: {
        type: "user",
        role: "writer",
        emailAddress: Correo, // 'user@partner.com', nadia.portugal04@gmail.com,jesusmarzo7@gmail.com
      },
      fileId: spreadsheetId,
      fields: "id",
    });

    console.log(driveCompartir.data);

    const nuevoArchivo = {
      IdObjetosNuevo,
      Cid: spreadsheetId,
      NombreVista,
      NombreLogico: IdObjetosNuevo,
      UbicacionVista,
      UbicacionLogica,
      Padre,
      EsDirectorio: false,
      Mime:
        TipoArchivo == 1
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : TipoArchivo == 2
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      PesoMB: "0",
      FechaCreacion,
      FechaActualizacion,
      EstaEliminado: false,
      IdUsuarios,
    };

    const guardarArchivo = await Objetos.create(nuevoArchivo);

    const registrarETH = await registrarObjectoEnETH(
      IdUsuarios,
      nuevoArchivo.Cid
    );

    if (!registrarETH) {
      throw new Error("Error: crearArchivoGoogle, no se pudo subir a ETH");
    }

    const registrarArchivoGogleEth = await registrarObjectoGoogleEnETH(
      IdUsuarios,
      nuevoArchivo.Cid
    );

    if (!registrarArchivoGogleEth) {
      throw new Error(
        "Error: crearArchivoGoogle, no se pudo subir el id google a ETH"
      );
    }

    return response.status(201).json({
      status: 201,
      message: "Excel creado",
      data: { nuevoArchivo, spreadsheet: spreadsheet.data },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error: crearArchivoGoogle, no se pudo crear el archivo",
      data: {},
    });
  }
};

const descargarArchivoGoogle = async (cid, tipo) => {
  try {
    const auth = new JWT({
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
      ],
      keyFile: "./ObjectosGoogle/poised-gateway-333214-48018d3182ea.json",
    });

    const service = google.drive({ version: "v3", auth });
    const file = await service.files.export(
      {
        fileId: cid,
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      { responseType: tipo }
    );
    // console.log(file.data);
    const blob = await file.data;
    // console.log(blob);
    // console.log(file.data["Symbol(buffer)"]);
    return blob;
  } catch (error) {
    console.log("-----------------Error:descargarArchivoGoogle-------------");
    console.log(error);
    return false;
  }
};

export { crearArchivoGoogle, descargarArchivoGoogle };
