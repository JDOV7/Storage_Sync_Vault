import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PanelIzquierdoOpciones from "../componentes/Auth/PanelIzquierdoOpciones";
import Header from "../componentes/Auth/Header";
import TablaObjectosEliminados from "../componentes/Auth/TablaObjectosEliminados";

function ObjectosEliminados() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("---------------SubirArchivosPage--------------");
  }, [auth]);
  console.log(auth);

  if (!(auth.status || auth.IdUsuarios)) {
    console.log("esta vacio");
    navigate("/login");
  }

  return (
    <>
      <PanelIzquierdoOpciones
        tipoBarra={2}
        // IdUsuarios={auth.data.IdUsuarios}
        // botonSubirArchivos={handlerSubmit}
      ></PanelIzquierdoOpciones>
      <Header tipoDeBarra={0}></Header>

      <div className="py-20 px-52">
        <h1 className="text-4xl font-black text-black text-center">Papelera</h1>
        <TablaObjectosEliminados></TablaObjectosEliminados>
      </div>
    </>
  );
}

export default ObjectosEliminados;
