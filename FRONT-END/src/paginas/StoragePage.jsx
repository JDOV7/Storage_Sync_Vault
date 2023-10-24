import React from "react";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import TextoImagenCard from "../componentes/cards/TextoImagenCard";
import TextoImagenGridMiniCard from "../componentes/cards/TextoImagenGridMiniCard";
import eleccionIMG from "../../public/img/eleccion.png";
import rapidoIMG from "../../public/img/rapido.png";
import seguridadIMG from "../../public/img/seguridad-informatica.png";
import accesoIMG from "../../public/img/acceso-a-los-datos.png";
import archivoSubirIMG from "../../public/img/archivoSubir.png";
import descargarArchivoIMG from "../../public/img/archivo.png";
import almacenaCualquierArchivoIMG from "../../public/img/el-intercambio-de-datos.png";
import ampliarAlmacenamientoIMG from "../../public/img/carpeta.png";

const StoragePagina = () => {
  const datos = [
    {
      imagen: eleccionIMG,
      titulo: "Obtén la cantidad correcta de almacenamiento",
      texto:
        "Puedes elegir entre varios planes con diferentes límites de almacenamiento, desde 400 GB hasta 16 TB. También puedes obtener espacio de almacenamiento ilimitado con los planes Pro Flexi y Business. Estos planes tienen 3 TB de almacenamiento inicial, pero puedes usar más espacio cuando lo necesites.",
      textoPosicion: true,
    },
    {
      imagen: rapidoIMG,
      titulo: "Descargas y subidas rápidas",
      texto:
        "Nuestro eficiente administrador de transferencias, disponible en la aplicación de escritorio, te permite subir y descargar archivos hacia y desde MEGA de forma muy rápida. Ahora es incluso más rápido que antes y te da más control sobre tus transferencias.",
      textoPosicion: false,
    },
    {
      imagen: seguridadIMG,
      titulo: "Almacena de forma segura y privada",
      texto:
        "Almacena tus archivos con nosotros sabiendo que nadie, ni siquiera nosotros, puede acceder a ellos. Con MEGA, tus archivos están cifrados con conocimiento cero y eres el único que tiene la clave. Si quieres puedes añadir una capa adicional de seguridad a tu cuenta activando la autenticación de dos factores (2FA).",
      textoPosicion: true,
    },
    {
      imagen: accesoIMG,
      titulo: "Accede a tus archivos sobre la marcha",
      texto:
        "Accede fácilmente a tus archivos en la nube a través de la aplicación de escritorio, la aplicación móvil o la web. Si sincronizas o haces backups de datos desde tu equipo local a MEGA, tus archivos se sincronizarán automáticamente o se realizará un backup en tiempo real, por lo que podrás ver los archivos más recientes, sin importar dónde te encuentres.",
      textoPosicion: false,
    },
  ];

  const datosMiniCard = [
    {
      imagen: archivoSubirIMG,
      titulo: "Sube archivos grandes",
      texto:
        "MEGA permite cualquier tamaño de archivos, por lo que ningún archivo es demasiado grande.",
    },
    {
      imagen: descargarArchivoIMG,
      titulo: "Descarga muchos datos",
      texto:
        "Ofrecemos amplios límites de transferencia con todos nuestros planes, para que puedas descargar muchos datos desde MEGA.",
    },
    {
      imagen: almacenaCualquierArchivoIMG,
      titulo: "Almacena cualquier tipo de archivo o carpeta",
      texto:
        "Desde fotos que ocupan poco espacio hasta proyectos enteros, puedes almacenar cualquier tipo de archivo de forma segura con nosotros.",
    },
    {
      imagen: ampliarAlmacenamientoIMG,
      titulo: "Amplía fácilmente tu almacenamiento",
      texto:
        "Puedes obtener fácilmente más espacio de almacenamiento, sin importar el plan que tengas.",
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
            ALMACENAMIENTO EN LA NUBE
          </h1>
          <h1 className="  py-8 px-40 text-center text-6xl font-extrabold text-white">
            Almacena, administra y comparte de forma segura tus datos en línea
          </h1>
        </div>
        {datos.map((dato, index) => {
          return <TextoImagenCard datos={dato} key={index}></TextoImagenCard>;
        })}

        <div className="grid grid-cols-3 py-28">
          <div className="col-span-1">
            <h1 className="text-4xl text-center text-white font-bold px-4">
              Lo que nuestros clientes quieren
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

export default StoragePagina;
