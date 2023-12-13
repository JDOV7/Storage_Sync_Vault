import React from "react";
import carpeta from "../../../public/img/app/carpeta.png";
import imagen from "../../../public/img/app/imagen.png";
import pdf from "../../../public/img/app/pdf.png";
import recuperarIMG from "../../../public/img/app/recuperar.png";
import excelIMG from "../../../public/img/app/excel.png";
import docIMG from "../../../public/img/app/doc.png";
import pptIMG from "../../../public/img/app/ppt.png";
import useAuth from "../../hooks/useAuth";
import mensajeError from "../../Mensajes/MensajeError";

function ObjectoCompartido({ objecto }) {
  const {
    Objeto: {
      IdObjetos,
      NombreVista,
      Mime,
      Usuario: { Correo },
    },
  } = objecto;

  const { descargarArchivoCompartido, descargarCarpeta } = useAuth();

  const elegirImagen = () => {
    let icono;
    switch (Mime) {
      case "directory":
        icono = carpeta;
        break;
      case "image/png":
        icono = imagen;
        break;
      case "application/pdf":
        icono = pdf;
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        icono = excelIMG;
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        icono = docIMG;
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        icono = pptIMG;
        break;
      default:
        break;
    }

    return icono;
  };

  const descargarArchivoFunc = async (idObjecto, NombreVista) => {
    try {
      const bArchivo = await descargarArchivoCompartido(idObjecto, NombreVista);
      console.log(idObjecto);
      if (!bArchivo) {
        throw new Error("No se pudo descargar el archivo");
      }
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo descargar el archivo", "intentalo mas tarde");
    }
  };

  const descargarFolderFunc = async (idObjecto, NombreVista) => {
    try {
      const bArchivo = await descargarCarpeta(idObjecto, NombreVista);
      console.log(idObjecto);
      if (!bArchivo) {
        throw new Error("No se pudo descargar el folder");
      }
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo descargar el folder", "intentalo mas tarde");
    }
  };

  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-500 dark:hover:bg-neutral-200">
        <td className="whitespace-nowrap  font-black text-base text-left flex">
          <div
            className="flex"
            onClick={(e) => {
              e.preventDefault();
              if (Mime == "directory") {
                descargarFolderFunc(IdObjetos, NombreVista);
              } else {
                descargarArchivoFunc(IdObjetos, NombreVista);
              }
            }}
          >
            <img src={elegirImagen()} alt="" className="px-2" />
            {NombreVista}
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-black text-base">
          <p className="text-center">
            {new Date(objecto.FechaCompartido).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-black text-base flex items-center justify-center">
          {Correo}
        </td>
      </tr>
    </>
  );
}

export default ObjectoCompartido;
