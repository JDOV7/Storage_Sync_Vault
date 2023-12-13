import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import mensajeError from "../../Mensajes/MensajeError";
import MoverObjecto from "../../paginas/MoverObjecto";
import CompartirObjectoModal from "../../Modal/CompartirObjectoModal";
import carpeta from "../../../public/img/app/carpeta.png";
import imagen from "../../../public/img/app/imagen.png";
import pdf from "../../../public/img/app/pdf.png";
import eliminarIMG from "../../../public/img/app/eliminar.png";
import opcionesIMG from "../../../public/img/app/opciones.png";
import moverseIMG from "../../../public/img/app/moverse.png";
import compartirIMG from "../../../public/img/app/compartir.png";
import descargasIMG from "../../../public/img/app/descargas.png";
import excelIMG from "../../../public/img/app/excel.png";
import docIMG from "../../../public/img/app/doc.png";
import pptIMG from "../../../public/img/app/ppt.png";
import respaldoIMG from "../../../public/img/app/respaldo.png";

function ObjectoElemento({ objecto, funcActualizarTabla }) {
  const params = useParams();
  const navigate = useNavigate();
  const { IdObjetos: paramIdObjecto } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [modalMover, setModalMover] = useState(false);
  const [modalCompartir, setModalCompartir] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { IdObjetos, NombreVista, FechaCreacion, Mime, UbicacionVista, Cid } =
    objecto;

  const {
    eliminarFolder,
    eliminarArchivo,
    obtenerArchivo,
    descargarArchivo,
    descargarCarpeta,
    respaldarArchivo,
    respaldarFolder,
  } = useAuth();

  const eliminarFolderFunc = async (idObjecto) => {
    try {
      const bCarpetaEliminada = await eliminarFolder(idObjecto);
      console.log(idObjecto);
      if (!bCarpetaEliminada) {
        throw new Error("No se pudo eliminar el folder");
      }
      Swal.fire({
        icon: "success",
        title: "Carpeta eliminada correctamente",
        text: "la carpeta se creo",
      }).then(async (e) => {
        // window.location.href = `/app/${paramIdObjecto}`;
        await funcActualizarTabla(paramIdObjecto);
      });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo eliminar el folder", "intentalo mas tarde");
    }
  };

  const eliminarArchivoFunc = async (idObjecto) => {
    try {
      const bArchivoEliminado = await eliminarArchivo(idObjecto);
      console.log(idObjecto);
      if (!bArchivoEliminado) {
        throw new Erro("No se pudo eliminar el archivo");
      }
      Swal.fire({
        icon: "success",
        title: "Archivo eliminado correctamente",
        text: "El archivo se elimino",
      }).then(async (e) => {
        // window.location.href = `/app/${paramIdObjecto}`;
        await funcActualizarTabla(paramIdObjecto);
      });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo eliminar el archivo", "intentalo mas tarde");
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

  const obtenerArchivoFunc = async (idObjecto) => {
    try {
      console.log(
        `--------------------obtenerArchivoFunc: ${Mime}------------`
      );
      if (
        Mime ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        console.log(Cid);
        window.open(
          `https://docs.google.com/spreadsheets/d/${Cid}/edit`,
          "_blank"
        );
        return;
      }
      if (
        Mime ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        console.log(Cid);
        window.open(`https://docs.google.com/document/d/${Cid}/edit`, "_blank");
        return;
      }

      if (
        Mime ==
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        console.log(Cid);
        window.open(
          `https://docs.google.com/presentation/d/${Cid}/edit`,
          "_blank"
        );
        return;
      }

      const bArchivo = await obtenerArchivo(idObjecto);
      console.log(idObjecto);
      if (!bArchivo) {
        throw new Error("No se pudo obtener el archivo");
      }
      // Swal.fire({
      //   icon: "success",
      //   title: "Archivo eliminado correctamente",
      //   text: "El archivo se elimino",
      // }).then((e) => {
      //   window.location.href = `/app/${paramIdObjecto}`;
      // });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo obtener el archivo", "intentalo mas tarde");
    }
  };

  const descargarArchivoFunc = async (idObjecto, NombreVista) => {
    try {
      const bArchivo = await descargarArchivo(idObjecto, NombreVista);
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
        throw new Error("No se pudo descargar el archivo");
      }
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo descargar el archivo", "intentalo mas tarde");
    }
  };

  const respaldarArchivoFunc = async (idObjecto) => {
    const respuesta = await respaldarArchivo(idObjecto);
    if (respuesta) {
      Swal.fire({
        title: "¡Archivo respaldado!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "No se pudo respaldar el archivo",
        icon: "error",
      });
    }
  };

  const respaldarFolderFunc = async (idObjecto) => {
    const respuesta = await respaldarFolder(idObjecto);
    if (respuesta) {
      Swal.fire({
        title: "Folder respaldado!",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "¡Error!",
        text: "No se pudo respaldar el folder",
        icon: "error",
      });
    }
  };

  return (
    <>
      <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-50 dark:border-neutral-500 dark:hover:bg-neutral-200">
        <td className="whitespace-nowrap  font-black text-base text-left">
          <div className="flex text-left items-left justify-left">
            {Mime == "directory" ? (
              <>
                <button
                  // to={`/app/${IdObjetos}`}
                  onClick={async (e) => {
                    e.preventDefault();
                    await funcActualizarTabla(IdObjetos);
                    // window.alert(IdObjetos);
                    navigate(`/app/${IdObjetos}`);
                  }}
                >
                  <div className="flex text-left items-left justify-left">
                    <img src={elegirImagen()} alt="" className="px-2" />
                    <p className="text-left">{NombreVista}</p>
                  </div>
                </button>
              </>
            ) : (
              <>
                <div
                  className="flex text-left items-left justify-left"
                  onClick={(e) => {
                    obtenerArchivoFunc(IdObjetos);
                  }}
                >
                  <img src={elegirImagen()} alt="" className="px-2" />
                  <p className="text-left">{NombreVista}</p>
                </div>
              </>
            )}
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
        <td className=" font-black text-base ">
          <div className="w-full  flex items-center justify-center">
            {" "}
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                // onMouseEnter={toggleDropdown}
                // onMouseLeave={toggleDropdown}
                type="button"
                className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white  rounded-md hover:bg-gray-50  transition"
              >
                <img src={opcionesIMG} alt="" />
              </button>

              {/* Dropdown panel, start hidden */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      className="w-full   py-2 text-sm text-gray-700 hover:bg-gray-200 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        if (Mime == "directory") {
                          eliminarFolderFunc(IdObjetos);
                        } else {
                          eliminarArchivoFunc(IdObjetos);
                        }
                        setIsOpen(!isOpen);
                      }}
                    >
                      <img src={eliminarIMG} alt="" className="px-2" />
                      Eliminar
                    </button>
                    <button
                      className="w-full   py-2 text-sm text-gray-700 hover:bg-gray-200 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalMover(!modalMover);
                      }}
                    >
                      <img src={moverseIMG} alt="" className="px-2" />
                      Mover
                    </button>
                    <button
                      className="w-full   py-2 text-sm text-gray-700 hover:bg-gray-200 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalCompartir(!modalCompartir);
                      }}
                    >
                      <img src={compartirIMG} alt="" className="px-2" />
                      Compartir
                    </button>
                    <button
                      className="w-full   py-2 text-sm text-gray-700 hover:bg-gray-200 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        if (Mime == "directory") {
                          descargarFolderFunc(IdObjetos, NombreVista);
                        } else {
                          descargarArchivoFunc(IdObjetos, NombreVista);
                        }
                        // setModalCompartir(!modalCompartir);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <img src={descargasIMG} alt="" className="px-2" />
                      Descargar
                    </button>
                    <button
                      className="w-full   py-2 text-sm text-gray-700 hover:bg-gray-200 flex"
                      onClick={(e) => {
                        e.preventDefault();
                        if (Mime == "directory") {
                          respaldarFolderFunc(IdObjetos);
                        } else {
                          respaldarArchivoFunc(IdObjetos);
                        }
                        // setModalCompartir(!modalCompartir);
                        setIsOpen(!isOpen);
                      }}
                    >
                      <img src={respaldoIMG} alt="" className="px-2" />
                      Respaldar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {modalMover ? (
            <>
              <MoverObjecto
                modal={modalMover}
                setModal={setModalMover}
                idObjecto={IdObjetos}
                funcActualizarTabla={funcActualizarTabla}
                setIsOpen={setIsOpen}
                Mime={Mime}
              ></MoverObjecto>
            </>
          ) : (
            <></>
          )}
          {modalCompartir ? (
            <>
              <CompartirObjectoModal
                modal={modalCompartir}
                setModal={setModalCompartir}
                idObjecto={IdObjetos}
                funcActualizarTabla={funcActualizarTabla}
                setIsOpen={setIsOpen}
                Mime={Mime}
              ></CompartirObjectoModal>
            </>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
}

export default ObjectoElemento;
