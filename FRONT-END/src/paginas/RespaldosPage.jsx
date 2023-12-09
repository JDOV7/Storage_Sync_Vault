import React, { useEffect } from "react";
import PanelIzquierdoOpciones from "../componentes/Auth/PanelIzquierdoOpciones";
import Header from "../componentes/Auth/Header";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import TablaObjectosRespaldo from "../componentes/Auth/TablaObjectosRespaldo";

function RespaldosPage() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    console.log("---------------RespaldosPage--------------");
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
        <h1 className="text-3xl">Respaldos</h1>
        <TablaObjectosRespaldo></TablaObjectosRespaldo>
      </div>
    </>
  );
}

export default RespaldosPage;
