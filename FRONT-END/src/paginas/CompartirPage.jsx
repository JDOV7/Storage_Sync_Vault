import React from "react";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import TextoImagenGridMiniCard from "../componentes/cards/TextoImagenGridMiniCard";
import archivoCompartirIMG from "../../public/img/archivoCompartir.png";
import colaborarIMG from "../../public/img/red.png";

const Compartir = () => {
  const datosMiniCard = [
    {
      imagen: archivoCompartirIMG,
      titulo: "Comparte archivos y carpetas por medio de enlaces",
      texto:
        "Comparte archivos y carpetas de cualquier tamaño a través de un enlace. Quien tenga este enlace, incluso los que no tengan una cuenta de MEGA, podrá ver y descargar su contenido.",
    },
    {
      imagen: colaborarIMG,
      titulo: "Colabora",
      texto:
        "Comparte carpetas con tus contactos para que puedas colaborar de manera efectiva.",
    },
  ];

  return (
    <>
      <div className="bg-slate-900">
        <HeaderLandingPage
          btnTexto={"Inicia Sesion"}
          url={"/login"}
        ></HeaderLandingPage>
      </div>
      <div className="w-full bg-slate-900">
        <div>
          <h1 className="  pt-32 px-40 text-cyan-500 text-2xl text-center font-semibold">
            COMPARTIR
          </h1>
          <h1 className="  py-8 px-40 text-center text-6xl font-extrabold text-white">
            Comparte de forma segura con quien quieras y donde quieras
          </h1>
          <p className="text-white text-center text-xl p-8">
            Comparte carpetas y archivos con colegas y amigos de forma segura y
            sencilla
          </p>
        </div>

        <div className="grid grid-cols-3 py-14">
          <div className="col-span-1">
            <h1 className="text-4xl text-center text-white font-bold px-4">
              Comparte tus archivos y carpetas con quien quieras
            </h1>
          </div>
          <div className="col-span-2">
            <div className="grid grid-cols-4">
              {datosMiniCard.map((dato, index) => {
                return (
                  <TextoImagenGridMiniCard
                    datos={dato}
                    key={index}
                    col={2}
                  ></TextoImagenGridMiniCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compartir;
