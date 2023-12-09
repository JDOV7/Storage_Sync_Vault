import React from "react";

import carpeta from "../../../public/img/app/carpeta.png";
import imagen from "../../../public/img/app/imagen.png";
import pdf from "../../../public/img/app/pdf.png";
import eliminarIMG from "../../../public/img/app/eliminar.png";
import opcionesIMG from "../../../public/img/app/opciones.png";
import moverseIMG from "../../../public/img/app/moverse.png";
import compartirIMG from "../../../public/img/app/compartir.png";
import descargasIMG from "../../../public/img/app/descargas.png";
import excelIMG from "../../../public/img/app/excel.png";
import respaldoIMG from "../../../public/img/app/respaldo.png";
import useAuth from "../../hooks/useAuth";
import mensajeError from "../../Mensajes/MensajeError";
function ObjectoRespaldado({ objecto }) {
  const {
    Objeto: { IdObjetos, NombreVista, Mime },
    FechaDeRespaldo,
  } = objecto;

  const { descargarObjectoRespaldado } = useAuth();

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
      default:
        break;
    }

    return icono;
  };

  const descargarObjectoRespaldadoFunc = async (idObjecto, NombreVista) => {
    try {
      const bArchivo = await descargarObjectoRespaldado(idObjecto, NombreVista);
      console.log(idObjecto);
      if (!bArchivo) {
        throw new Error("No se pudo descargar el archivo");
      }
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo descargar el archivo", "intentalo mas tarde");
    }
  };

  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-500 dark:hover:bg-neutral-200">
        <td className="whitespace-nowrap  font-black text-base text-left ">
          <div
            className="flex items-start justify-start"
            onClick={(e) => {
              e.preventDefault();
              if (Mime == "directory") {
                descargarObjectoRespaldadoFunc(IdObjetos, NombreVista + ".zip");
              } else {
                if (
                  Mime ==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ) {
                  descargarObjectoRespaldadoFunc(
                    IdObjetos,
                    NombreVista + ".xlsx"
                  );
                } else {
                  descargarObjectoRespaldadoFunc(IdObjetos, NombreVista);
                }
              }
            }}
          >
            <img src={elegirImagen()} alt="" className="px-2 " />
            <p>{NombreVista}</p>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-black text-base">
          <p className="text-center">
            {new Date(FechaDeRespaldo).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </td>
      </tr>
    </>
  );
}

export default ObjectoRespaldado;
