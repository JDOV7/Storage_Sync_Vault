import React from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import PorqueEscogerSSV from "../componentes/landing/PorqueEscogerSSV";
import CompetenciaCard from "../componentes/cards/CompetenciaCard";
import intimidadFoto from "../../public/img/intimidad.png";
import dropboxLogo from "../../public/img/dropbox.png";
import megaLogo from "../../public/img/mega.png";
import driveLogo from "../../public/img/google-drive.png";

const LandingPage = () => {
  const datos = [
    { empresa: "MEGA", precio: "0.019 ETH*", icon: megaLogo },
    { empresa: "Dropbox", precio: "0.011 ETH*", icon: dropboxLogo },
    { empresa: "Google Drive", precio: "0.0024 ETH*", icon: driveLogo },
  ];
  return (
    <>
      <div className="bg-slate-900">
        <HeaderLandingPage></HeaderLandingPage>
      </div>
      <div className="py-20 px-4 bg-slate-900">
        <div className="pt-20 pb-10 text-center text-6xl font-extrabold text-white">
          <h1>Privacidad en línea para todos</h1>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center justify-center">
              <img src={intimidadFoto} alt="" />
            </div>
          </div>

          <div className="col-span-3 text-white">
            <div className="flex items-center justify-center">
              <p className="py-24 text-xl">
                La privacidad no es una opción con Storage Sync Vault, es un
                estándar. Creemos que todos deberían poder almacenar datos y
                comunicarse de forma segura y privada en línea.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Prueba Storage Sync Vault gratis"
            className="bg-cyan-500 w-full py-3 px-10 rounded-xl text-black uppercase font-bold mt-5 hover:cursor-pointer hover:bg-cyan-700  md:w-auto "
          />
        </div>
      </div>
      <PorqueEscogerSSV></PorqueEscogerSSV>
      <div className="py-20 px-4 bg-slate-900">
        <h1 className="text-5xl text-center text-white font-bold py-6">
          Compara Storage Sync Vault con otros
        </h1>
      </div>
      <div className="grid grid-cols-9 bg-slate-900 p-6">
        {datos.map((libro, index) => {
          return <CompetenciaCard key={index} props={libro}></CompetenciaCard>;
        })}
      </div>
    </>
  );
};

export default LandingPage;
