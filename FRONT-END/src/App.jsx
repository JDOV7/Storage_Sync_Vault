import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./paginas/LandingPage";
import Login from "./paginas/LoginPage";
import StoragePagina from "./paginas/StoragePage";
import Compartir from "./paginas/CompartirPage";
import BackUpPage from "./paginas/BackUpPage";
import CrearUsuarioPage from "./paginas/CrearUsuarioPage";
import PrincipalPage from "./paginas/PrincipalPage";
import ExamplePage from "./paginas/ExamplePage";
import { AuthProvider } from "./context/AuthProvider";
import SubirArchivosPage from "./paginas/SubirArchivosPage";
import ObjectosEliminados from "./paginas/ObjectosEliminados";
import MoverObjecto from "./paginas/MoverObjecto";
import ObjetosCompartidos from "./paginas/ObjetosCompartidos";
import RespaldosPage from "./paginas/RespaldosPage";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import EthProvider from "./context/EthContext/EthProvider";

function App() {
  const [count, setCount] = useState(0);

  // return <LandingPage></LandingPage>;
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          //Area publica
          <Route path="/">
            <Route index element={<LandingPage></LandingPage>} />
            <Route
              path="storage"
              element={<StoragePagina></StoragePagina>}
            ></Route>
            <Route path="share" element={<Compartir></Compartir>}></Route>
            <Route path="backup" element={<BackUpPage></BackUpPage>}></Route>
            <Route
              path="login"
              element={
                <EthProvider>
                  <Login></Login>
                </EthProvider>
              }
            ></Route>
            <Route
              path="crear-cuenta"
              element={
                <EthProvider>
                  <CrearUsuarioPage></CrearUsuarioPage>
                </EthProvider>
              }
            ></Route>
            <Route
              path="confirmar/:token"
              element={<ConfirmarCuenta></ConfirmarCuenta>}
            ></Route>
          </Route>
          //Area privada
          <Route
            path="/app/eliminados"
            element={<ObjectosEliminados></ObjectosEliminados>}
          ></Route>
          <Route
            path="/app/elementos-compartidos"
            element={<ObjetosCompartidos></ObjetosCompartidos>}
          ></Route>
          <Route
            path="/app/respaldos"
            element={<RespaldosPage></RespaldosPage>}
          ></Route>
          <Route path="/app/:IdObjetos">
            <Route index element={<PrincipalPage></PrincipalPage>} />
            <Route
              path="subir-archivos"
              element={<SubirArchivosPage></SubirArchivosPage>}
            ></Route>
          </Route>
          {/* <Route
            path="/app/arbol"
            element={<MoverObjecto></MoverObjecto>}
          ></Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
