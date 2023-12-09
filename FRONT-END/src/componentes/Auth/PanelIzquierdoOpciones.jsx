import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import mensajeError from "../../Mensajes/MensajeError";
import borrar from "../../../public/img/app/borrar.png";
import CrearArchivoGoogle from "../../Modal/CrearArchivoGoogle";

function PanelIzquierdoOpciones({
  tipoBarra,
  botonSubirArchivos,
  actualizarTabla,
  IdUsuarios,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const { IdObjetos } = params;
  const { auth, crearFolder } = useAuth();
  const [modalCrearArchivoGoogle, setModalCrearArchivoGoogle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const act = async () => {
      console.log(auth.IdUsuarios);
      console.log(IdUsuarios);
    };
    act();
  }, [auth]);

  const creandoFolder = async () => {
    try {
      const { value: nombre } = await Swal.fire({
        title: "Nombre folder",
        input: "text",
      });

      const bCarpetaCreada = await crearFolder(nombre, IdObjetos);

      if (!bCarpetaCreada) {
        throw new Erro("No se pudo crear el folder");
      }
      Swal.fire({
        icon: "success",
        title: "Carpeta creada correctamente",
        text: "la carpeta se creo",
      }).then(async (e) => {
        // window.location.href = `/app/${IdObjetos}`;
        // navigate(`/app/${IdObjetos}`);
        // await funcActualizarTabla(IdObjetos);
        await actualizarTabla(IdObjetos);
      });
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo crear el folder", "intentalo mas tarde");
    }
  };

  const funcActualizarTabla = async (id) => {
    window.location.href = "/app/" + id;
  };

  return (
    <>
      {tipoBarra == 0 ? (
        <>
          <div className="lg:fixed bg-cyan-50  absolute w-48  rounded-3xl h-full flex items-center justify-center">
            <div className="px-2 w-full">
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    `/app/${window.localStorage.getItem(
                      "IdUsuarios-storage-sync-vault"
                    )}`
                  );
                }}
              >
                Regresar
              </button>
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  botonSubirArchivos();
                }}
              >
                Subir
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {tipoBarra == 1 ? (
        <>
          <div className="lg:fixed bg-cyan-50  absolute w-48  rounded-3xl h-full flex items-center justify-center">
            <div className="px-2">
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/app/elementos-compartidos");
                }}
              >
                Compartidos Conmigo
              </button>
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/app/eliminados`);
                }}
              >
                <div className="flex items-center justify-center">
                  <img src={borrar} alt="" />
                  <p>Papelera</p>
                </div>
              </button>
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/app/respaldos");
                }}
              >
                Respaldos
              </button>
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  creandoFolder();
                }}
              >
                Nueva carpeta
              </button>
              <button className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600">
                <a href={`/app/${IdObjetos}/subir-archivos`}>Subir Archivos</a>
              </button>
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  setModalCrearArchivoGoogle(!modalCrearArchivoGoogle);
                }}
              >
                Crear Archivo
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {tipoBarra == 2 ? (
        <>
          <div className="lg:fixed bg-cyan-50  absolute w-48  rounded-3xl h-full flex items-center justify-center">
            <div className="px-2 w-full">
              <button
                className="p-2 bg-cyan-500 w-full rounded-3xl font-bold text-black my-2 hover:bg-cyan-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    `/app/${window.localStorage.getItem(
                      "IdUsuarios-storage-sync-vault"
                    )}`
                  );
                }}
              >
                Regresar
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {modalCrearArchivoGoogle ? (
        <>
          <CrearArchivoGoogle
            modal={modalCrearArchivoGoogle}
            setModal={setModalCrearArchivoGoogle}
            idObjecto={IdObjetos}
            funcActualizarTabla={funcActualizarTabla}
            setIsOpen={setIsOpen}
          ></CrearArchivoGoogle>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default PanelIzquierdoOpciones;
