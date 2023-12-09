import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";

function ConfirmarCuenta() {
  const params = useParams();
  const { token } = params;
  const [confirmado, setConfirmado] = useState(false);

  useEffect(() => {
    const iniciar = async () => {
      const respuesta = await confirmarCuenta(token);
      console.log(respuesta);
      setConfirmado(respuesta);
    };
    iniciar();
  }, []);

  const confirmarCuenta = async (token) => {
    try {
      const url = `/auth/usuario-confirmar/${token}`;
      const respuesta = await clienteAxios.get(url);
      console.log(respuesta);
      return true;
    } catch (error) {
      console.log("-----------------confirmarCuenta--------------");
      console.log(error);
      return false;
    }
  };

  return (
    <>
      <h1 className="text-6xl font-black text-cyan-600 text-center p-10 font-sans">
        Storage Sync Vault
      </h1>

      {confirmado ? (
        <>
          <div className="m-10 p-10 rounded-3xl bg-cyan-300 flex items-center justify-center">
            <h1 className="text-3xl font-black text-center px-2">
              Cuenta confirmada, ya puedes{" "}
              <span className="text-4xl font-sans">Iniciar Sesion</span>
            </h1>
            <a
              href="/login"
              className="px-3 py-2 rounded-2xl bg-cyan-600 font-black text-black"
            >
              Iniciar Sesion
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="m-10 p-10 rounded-3xl bg-red-200 flex items-center justify-center">
            <h1 className="text-3xl font-black text-center px-2 ">
              La cuenta no se confirmo
            </h1>
            <a
              href="/crear-cuenta"
              className="px-3 py-2 rounded-2xl bg-cyan-500 font-black text-black"
            >
              Crear cuenta
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default ConfirmarCuenta;
