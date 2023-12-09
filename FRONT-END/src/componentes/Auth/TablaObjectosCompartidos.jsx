import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ObjectoCompartido from "./ObjectoCompartido";

function TablaObjectosCompartidos() {
  const { auth, listaObjectosCompartidos } = useAuth();
  const [objectos, setObjectos] = useState([]);

  useEffect(() => {
    const obtenerObjectos = async () => {
      const elementos = await listaObjectosCompartidos();
      setObjectos(elementos);
    };
    obtenerObjectos();
  }, [auth]);

  const actualizarTabla = async () => {
    const objS = await listaObjectosCompartidos();
    setObjectos(objS);
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
                Compartido
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Dueño
              </th>
            </tr>
          </thead>
          <tbody>
            {objectos && objectos.length >= 1 ? (
              <>
                {objectos.map((elemento, index) => {
                  return (
                    <ObjectoCompartido
                      key={index}
                      objecto={elemento}
                      funcActualizarTabla={actualizarTabla}
                      // FechaCompartido={elemento.}
                    ></ObjectoCompartido>
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

export default TablaObjectosCompartidos;
