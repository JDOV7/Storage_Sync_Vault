import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ObjectoElemento from "./ObjectoElemento";
import ObjectoElementoEliminado from "./ObjectoElementoEliminado";

function TablaObjectosEliminados() {
  const { auth, obtenerObjectosEliminados } = useAuth();
  const [objectos, setObjectos] = useState([]);

  useEffect(() => {
    const obtenerObjectos = async () => {
      const elementos = await obtenerObjectosEliminados();
      setObjectos(elementos[1]);
    };
    obtenerObjectos();
  }, [auth]);

  const actualizarTabla = async () => {
    const elementos = await obtenerObjectosEliminados();
    setObjectos(elementos[1]);
  };

  return (
    <>
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-black text-xl dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Creado
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  {/* <img src={borrar} alt="" /> */}
                  Recuperar
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {objectos && objectos.length >= 1 ? (
              <>
                {objectos.map((elemento, index) => {
                  return (
                    <ObjectoElementoEliminado
                      key={index}
                      objecto={elemento}
                      funcActualizarTabla={actualizarTabla}
                    ></ObjectoElementoEliminado>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablaObjectosEliminados;
