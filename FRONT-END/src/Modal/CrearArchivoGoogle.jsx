import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import excelIMG from "../../public/img/app/excel.png";
import { useParams } from "react-router-dom";

function CrearArchivoGoogle({
  modal,
  setModal,
  idObjecto,
  funcActualizarTabla,
  setIsOpen,
  Mime,
}) {
  const { auth, crearDocumentoGoogle } = useAuth();
  const params = useParams();
  const { IdObjetos } = params;
  const [NombreVista, setNombreVista] = useState("");
  const [TipoArchivo, setTipoArchivo] = useState("");

  useEffect(() => {
    const obt = async () => {
      console.log("-------------CrearArchivoGoogle----------------");
      console.log(auth);
    };
    obt();
  }, [auth]);

  const crearDocumentoGoogleFunc = async () => {
    const respuesta = await crearDocumentoGoogle(
      IdObjetos,
      NombreVista,
      TipoArchivo
    );

    if (respuesta) {
      window.alert("Creado");
    } else {
      window.alert("No Creado");
    }
    await funcActualizarTabla(IdObjetos);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full h-full">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center py-4 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold px-4">Crear Archivo</h3>
            </div>
            {/* {cuentas && cuentas.length >= 1 ? <> {cuentas.length} </> : <>X</>} */}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                className="p-2 bg-cyan-100 rounded-2xl w-full font-black text-black"
                placeholder="Nombre del archivo"
                value={NombreVista}
                onChange={(e) => {
                  setNombreVista(e.target.value);
                }}
              />
              <div className="max-w-md mx-auto m-4 p-2">
                <div className="flex items-center justify-center">
                  <div className="px-2">
                    <label htmlFor="opcion1">
                      <div className="flex items-center justify-center">
                        <div className="bg-cyan-100 p-5 rounded-3xl shadow-2xl font-sans">
                          <div className="flex items-center justify-center">
                            <img src={excelIMG} alt="" />
                          </div>
                        </div>
                        <input
                          type="radio"
                          id="opcion1"
                          name="grupoOpciones"
                          onChange={(e) => {
                            setTipoArchivo(1);
                          }}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="px-2">
                    <label htmlFor="opcion2">
                      <div className="flex items-center justify-center">
                        <div className="bg-cyan-100 p-5 rounded-3xl shadow-2xl font-sans">
                          <div className="flex items-center justify-center">
                            <img src={excelIMG} alt="" />
                          </div>
                        </div>
                        <input
                          type="radio"
                          id="opcion2"
                          name="grupoOpciones"
                          onChange={(e) => {
                            setTipoArchivo(2);
                          }}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="px-2">
                    <label htmlFor="opcion3">
                      <div className="flex items-center justify-center">
                        <div className="bg-cyan-100 p-5 rounded-3xl shadow-2xl font-sans">
                          <div className="flex items-center justify-center">
                            <img src={excelIMG} alt="" />
                          </div>
                        </div>
                        <input
                          type="radio"
                          id="opcion3"
                          name="grupoOpciones"
                          onChange={(e) => {
                            setTipoArchivo(3);
                          }}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-6  border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setModal(!modal);
                  setIsOpen(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  //   window.alert(IdObjetos);
                  crearDocumentoGoogleFunc();
                  setModal(!modal);
                  setIsOpen(false);
                }}
              >
                Crear
              </button>
            </div>
            <div className=" flex items-center justify-center pb-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearArchivoGoogle;
