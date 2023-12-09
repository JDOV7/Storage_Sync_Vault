import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ObjectoCompartido from "./ObjectoCompartido";
import ObjectoRespaldado from "./ObjectoRespaldado";

function TablaObjectosRespaldo() {
  const { auth, listaObjectosRespaldados } = useAuth();
  const [objectos, setObjectos] = useState([]);

  useEffect(() => {
    const obtenerObjectos = async () => {
      const elementos = await listaObjectosRespaldados();
      console.log(elementos);
      setObjectos(elementos);
    };
    obtenerObjectos();
  }, [auth]);

  const actualizarTabla = async () => {
    const objS = await listaObjectosRespaldados();
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
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {objectos && objectos.length >= 1 ? (
              <>
                {objectos.map((elemento, index) => {
                  return (
                    <ObjectoRespaldado
                      key={index}
                      objecto={elemento}
                      funcActualizarTabla={actualizarTabla}
                    ></ObjectoRespaldado>
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

export default TablaObjectosRespaldo;
