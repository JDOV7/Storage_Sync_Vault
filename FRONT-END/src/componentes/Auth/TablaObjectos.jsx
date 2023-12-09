import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ObjectoElemento from "./ObjectoElemento";
import useAuth from "../../hooks/useAuth";
import eliminar from "../../../public/img/app/eliminar.png";

function TablaObjectos({
  objectos,
  ubicacionVista,
  ubicacionLogica,
  actualizarTabla,
}) {
  const params = useParams();
  const { IdObjetos } = params;
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const obtenerObjectos = async () => {
      await actualizarTabla(IdObjetos);
    };
    obtenerObjectos();
  }, [auth]);

  // if (!cargando) {
  //   navigate("/login");
  //   console.log(auth);
  // }

  return (
    <>
      <div className="m-10">
        <div className="flex text-2xl font-black">
          {ubicacionVista && ubicacionVista.length >= 1 ? (
            <>
              {ubicacionVista.map((e, index) => {
                return (
                  <button
                    key={index}
                    onClick={async (e) => {
                      e.preventDefault();
                      navigate(`/app/${ubicacionLogica[index]}`);
                      await actualizarTabla(ubicacionLogica[index]);
                    }}
                  >{`${e} > `}</button>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>

        <div>
          {/* <div className=" flex text-2xl font-black">{ubicacionLogica}</div> */}
        </div>

        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-black text-xl dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4 text-center">
                Nombre
              </th>
              <th scope="col" className="px-6 py-4 text-center">
                Creado
              </th>
              {/* <th scope="col" className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">
                  <img src={borrar} alt="" />
                  Eliminar
                </div>
              </th> */}
              <th scope="col" className="px-6 py-4 text-center">
                <div className="flex items-center justify-center">Opciones</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {objectos && objectos.length >= 1 ? (
              <>
                {objectos.map((elemento, index) => {
                  return (
                    <ObjectoElemento
                      key={index}
                      objecto={elemento}
                      funcActualizarTabla={actualizarTabla}
                    ></ObjectoElemento>
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

export default TablaObjectos;
