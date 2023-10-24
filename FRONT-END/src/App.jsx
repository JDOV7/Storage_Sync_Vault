import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./paginas/LandingPage";
import Login from "./paginas/LoginPage";
import StoragePagina from "./paginas/StoragePage";
import Compartir from "./paginas/CompartirPage";
import BackUpPage from "./paginas/BackUpPage";

function App() {
  const [count, setCount] = useState(0);

  // return <LandingPage></LandingPage>;
  return (
    <BrowserRouter>
      <Routes>
        //Area publica
        <Route path="/">
          <Route index element={<LandingPage></LandingPage>} />
          <Route
            path="storage"
            element={<StoragePagina></StoragePagina>}
          ></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route path="share" element={<Compartir></Compartir>}></Route>
          <Route path="backup" element={<BackUpPage></BackUpPage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
