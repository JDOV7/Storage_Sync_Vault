import { useState } from "react";

import LandingPage from "./paginas/LandingPage";
import Login from "./paginas/Login";

function App() {
  const [count, setCount] = useState(0);

  return <LandingPage></LandingPage>;
}

export default App;
