import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import mensajeError from "../../Mensajes/MensajeError";
import carpeta from "../../../public/img/app/carpeta.png";
import imagen from "../../../public/img/app/imagen.png";
import pdf from "../../../public/img/app/pdf.png";
import excelIMG from "../../../public/img/app/excel.png";
import docIMG from "../../../public/img/app/doc.png";
import pptIMG from "../../../public/img/app/ppt.png";
import recuperarIMG from "../../../public/img/app/recuperar.png";

function ObjectoElementoEliminado({ objecto, funcActualizarTabla }) {
  const { IdObjetos, NombreVista, FechaCreacion, Mime, UbicacionVista } =
    objecto;

  const { recuperarFolderObjecto, recuperarArchivo } = useAuth();

  const recuperarFolderFunc = async (idObjecto) => {
    try {
      const bFolderRecuperado = await recuperarFolderObjecto(idObjecto);
      console.log(idObjecto);
      if (!bFolderRecuperado) {
        throw new Erro("No se pudo recuperar el folder");
      }
      Swal.fire({
        icon: "success",
        title: "Carpeta recuperada correctamente",
        text: "la carpeta se recupero",
      }).then(async (e) => {
        // window.location.href = `/app/eliminados`;
        await funcActualizarTabla();
      });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo recuperar el folder", "intentalo mas tarde");
    }
  };

  const recuperarArchivoFunc = async (idObjecto) => {
    try {
      const bArchivoRecuperado = await recuperarArchivo(idObjecto);
      console.log(idObjecto);
      if (!bArchivoRecuperado) {
        throw new Erro("No se pudo recuperar el archivo");
      }
      Swal.fire({
        icon: "success",
        title: "Archivo recuperado correctamente",
        text: "El archivo se recupero",
      }).then(async (e) => {
        // window.location.href = `/app/eliminados`;
        await funcActualizarTabla();
      });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo recuperar el archivo", "intentalo mas tarde");
    }
  };

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

  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-500 dark:hover:bg-neutral-200">
        <td className="whitespace-nowrap  font-black text-base text-left">
          <div className="flex text-left items-left justify-left">
            <div
              className="flex text-left items-left justify-left"
              onClick={(e) => {
                // obtenerArchivoFunc(IdObjetos);
              }}
            >
              <img src={elegirImagen()} alt="" className="px-2" />
              <p className="text-left">{NombreVista}</p>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-black text-base">
          <p className="text-center">
            {new Date(FechaCreacion).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-black text-base flex items-center justify-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (Mime == "directory") {
                recuperarFolderFunc(IdObjetos);
              } else {
                recuperarArchivoFunc(IdObjetos);
              }
            }}
          >
            <img src={recuperarIMG} alt="" />
          </button>
        </td>
      </tr>
    </>
  );
}

export default ObjectoElementoEliminado;
