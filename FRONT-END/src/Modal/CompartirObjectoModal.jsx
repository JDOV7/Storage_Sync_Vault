import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import mensajeError from "../Mensajes/MensajeError";
import eliminarIMG from "../../public/img/app/eliminar.png";

function CompartirObjectoModal({
  modal,
  setModal,
  idObjecto,
  funcActualizarTabla,
  setIsOpen,
  Mime,
}) {
  const {
    auth,
    compartirArchivo,
    compartirFolder,
    obtenerCuentasAutorizadas,
    eliminarAccesoArchivo,
    eliminarAccesoFolder,
    obtenerCuentasAutorizadasFolder,
  } = useAuth();
  const [Correo, setCorreo] = useState("");
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    const obt = async () => {
      if (Mime != "directory") {
        const cuentasRes = await obtenerCuentasAutorizadas(idObjecto);
        setCuentas(cuentasRes);
      } else {
        const cuentasRes = await obtenerCuentasAutorizadasFolder(idObjecto);
        setCuentas(cuentasRes);
      }
    };
    obt();
  }, [auth]);

  const compartirArchivoFunc = async () => {
    const bControl = await compartirArchivo(idObjecto, Correo);
    console.log(bControl);
    if (bControl) {
      Swal.fire({
        icon: "success",
        title: "Compartido exitosamente",
      });
    } else {
      mensajeError("No se pudo compartir", "Verifica que el correo sea valido");
    }
  };

  const compartirFolderFunc = async () => {
    const bControl = await compartirFolder(idObjecto, Correo);
    console.log(bControl);
    if (bControl) {
      Swal.fire({
        icon: "success",
        title: "Compartido exitosamente",
      });
    } else {
      mensajeError("No se pudo compartir", "Verifica que el correo sea valido");
    }
  };

  const eliminarAccesoArchivoFunc = async (idArc, idUser) => {
    const bControl = await eliminarAccesoArchivo(idArc, idUser);
    if (bControl != false) {
      Swal.fire({
        icon: "success",
        title: "Quitado exitosamente",
      });
    } else {
      mensajeError("No se pudo eliminar", "Intentalo mas tarde");
    }
  };

  const eliminarAccesoFolderFunc = async (idFol, idUser) => {
    const bControl = await eliminarAccesoFolder(idFol, idUser);
    if (bControl != false) {
      Swal.fire({
        icon: "success",
        title: "Quitado exitosamente",
      });
    } else {
      mensajeError("No se pudo eliminar", "Intentalo mas tarde");
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-center py-4 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">Compartir Elemento</h3>
            </div>
            {/* {cuentas && cuentas.length >= 1 ? <> {cuentas.length} </> : <>X</>} */}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                className="p-2 bg-cyan-100 rounded-2xl w-full"
                placeholder="Correo electronico"
                value={Correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
              />
              <div className="max-w-md mx-auto m-4 p-2">
                <div className="bg-cyan-100 font-black  rounded shadow p-2  h-60 overflow-x-auto w-full">
                  <table>
                    <thead className="border-b font-black text-lg dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-center">
                          Correo
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Eliminar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cuentas && cuentas.length >= 1 ? (
                        <>
                          {cuentas.map((cuenta) => {
                            return (
                              <tr
                                className="border-b transition duration-300 ease-in-out hover:bg-cyan-300 rounded-2xl hover:rounded-2xl "
                                key={cuenta.Usuario.IdUsuarios}
                              >
                                <td className="whitespace-nowrap py-2  font-black text-base text-left">
                                  {cuenta.Usuario.Correo}
                                </td>
                                <td className="flex items-center py-2 justify-center">
                                  <button
                                    className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium rounded-mdtransition"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      //
                                      if (Mime == "directory") {
                                        // window.alert(cuenta.Usuario.IdUsuarios);
                                        eliminarAccesoFolderFunc(
                                          idObjecto,
                                          cuenta.Usuario.IdUsuarios
                                        );
                                      } else {
                                        eliminarAccesoArchivoFunc(
                                          idObjecto,
                                          cuenta.Usuario.IdUsuarios
                                        );
                                      }
                                      setModal(!modal);
                                      setIsOpen(false);
                                    }}
                                  >
                                    <img src={eliminarIMG} alt="" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <>No hay cuentas autorizadas</>
                      )}
                    </tbody>
                  </table>
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
                onClick={() => {
                  if (Mime == "directory") {
                    compartirFolderFunc();
                  } else {
                    compartirArchivoFunc();
                  }
                  setModal(!modal);
                  setIsOpen(false);
                }}
              >
                Compartir
              </button>
            </div>
            <div className=" flex items-center justify-center pb-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompartirObjectoModal;
