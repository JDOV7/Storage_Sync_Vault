import React from "react";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import TextoImagenGridMiniCard from "../componentes/cards/TextoImagenGridMiniCard";
import subirNubeIMG from "../../public/img/computacion-en-la-nube.png";
import recuperarIMG from "../../public/img/reloj.png";
import accederArchivoIMG from "../../public/img/alfiler.png";

const BackUpPage = () => {
  const datos = [
    {
      imagen: subirNubeIMG,
      titulo: "Backups automáticos",
      texto:
        "Haz un backup automático desde tu equipo a MEGA para asegurarte de que tus archivos en la nube coincidan con los que tienes en local.",
    },
    {
      imagen: recuperarIMG,
      titulo: "Recuperar archivos antiguos",
      texto:
        "Recupera versiones eliminadas o anteriores de archivos y carpetas. También podrás descargar los archivos recuperados si tienes cuenta de pago.",
    },
    {
      imagen: accederArchivoIMG,
      titulo: "Acceso a tus archivos desde cualquier lugar",
      texto:
        "Una vez que hayas hecho un backup de tus archivos en MEGA, podrás acceder a ellos desde cualquier dispositivo.",
    },
  ];

  return (
    <>
      <div className="bg-slate-900">
        <HeaderLandingPage></HeaderLandingPage>
      </div>
      <div className="w-full bg-slate-900">
        <div>
          <h1 className="  pt-32 px-40 text-cyan-500 text-2xl text-center font-semibold">
            BACKUP
          </h1>
          <h1 className="  py-8 px-40 text-center text-6xl font-extrabold text-white">
            Backups y recuperación de archivos
          </h1>
          <p className="text-white text-center text-xl py-8 px-48">
            Sube backups de tus datos, como documentos y archivos importantes,
            desde tu equipo a MEGA para tu tranquilidad. MEGA Backup crea
            backups de datos de manera automática y constante para que puedas
            tener copias en la nube y recuperar versiones anteriores.
          </p>
        </div>

        <div className="grid grid-cols-3 py-14">
          <div className="col-span-3">
            <div className="grid grid-cols-6">
              {datos.map((dato, index) => {
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

export default BackUpPage;
