import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../componentes/Auth/Header";
import PanelIzquierdoOpciones from "../componentes/Auth/PanelIzquierdoOpciones";
import TablaObjectos from "../componentes/Auth/TablaObjectos";

function PrincipalPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { IdObjetos } = params;
  const { auth, setAuth, cargando, obtenerObjectosFolder } = useAuth();
  const [objectos, setObjectos] = useState([]);
  const [ubicacionVista, setUbicacionVista] = useState([]);
  const [ubicacionLogica, setUbicacionLogica] = useState([]);

  useEffect(() => {
    console.log("---------------PrincipalPage--------------");
    console.log(auth);

    console.log(cargando);
  }, [auth]);

  if (!(auth.status || auth.IdUsuarios)) {
    console.log("esta vacio");
    navigate("/login");
  }

  const actualizarTabla = async (idObjeto) => {
    console.log("-------------------------actualizarTabla-------------------");
    console.log(idObjeto);
    const elementos = await obtenerObjectosFolder(idObjeto);
    setObjectos(elementos[1]);
    console.log(elementos[0]);
    console.log(elementos);

    const rutaVistaArreglo = elementos[0].UbicacionVista.split("/");
    const rutaLogicaArreglo = elementos[0].UbicacionLogica.split("/");

    console.log(rutaVistaArreglo.slice(1, rutaVistaArreglo.length));
    console.log(rutaLogicaArreglo.slice(1, rutaLogicaArreglo.length));
    setUbicacionVista(rutaVistaArreglo.slice(1, rutaVistaArreglo.length));
    setUbicacionLogica(rutaLogicaArreglo.slice(1, rutaLogicaArreglo.length));
  };

  return (
    <>
      <PanelIzquierdoOpciones
        tipoBarra={1}
        actualizarTabla={actualizarTabla}
      ></PanelIzquierdoOpciones>
      <Header tipoDeBarra={1}></Header>
      <div className="py-20 px-52">
        <TablaObjectos
          objectos={objectos}
          ubicacionVista={ubicacionVista}
          ubicacionLogica={ubicacionLogica}
          actualizarTabla={actualizarTabla}
        ></TablaObjectos>
      </div>
    </>
  );
}

export default PrincipalPage;
