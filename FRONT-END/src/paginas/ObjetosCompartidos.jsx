import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PanelIzquierdoOpciones from "../componentes/Auth/PanelIzquierdoOpciones";
import Header from "../componentes/Auth/Header";
import TablaObjectosCompartidos from "../componentes/Auth/TablaObjectosCompartidos";

function ObjetosCompartidos() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("---------------ObjetosCompartidos--------------");
    console.log(auth);
  }, [auth]);

  if (!(auth.status || auth.IdUsuarios)) {
    console.log("esta vacio");
    navigate("/login");
  }

  return (
    <>
      <PanelIzquierdoOpciones
        tipoBarra={2}
        // IdUsuarios={auth.data.IdUsuarios}
      ></PanelIzquierdoOpciones>
      <Header tipoDeBarra={1}></Header>
      <div className="py-20 px-52">
        <h1 className="text-4xl font-black text-black text-center">
          Compartidos Conmigo
        </h1>

        <TablaObjectosCompartidos></TablaObjectosCompartidos>
      </div>
    </>
  );
}

export default ObjetosCompartidos;
