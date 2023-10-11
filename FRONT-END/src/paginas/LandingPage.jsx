import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLandingPage from "../componentes/headerLandingPage";

const LandingPage = () => {
  return (
    <>
      <HeaderLandingPage></HeaderLandingPage>
      <div className="p-14 text-center">hola mundo</div>
    </>
  );
};

export default LandingPage;
