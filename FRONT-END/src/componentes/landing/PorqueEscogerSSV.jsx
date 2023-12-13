import React from "react";
import adjuntoArchivo from "../../../public/img/adjunto-archivo.png";
import intimidadFoto from "../../../public/img/intimidad.png";
import globalCompartir from "../../../public/img/global.png";
import dispositivos from "../../../public/img/sensible.png";

const PorqueEscogerSSV = () => {
  return (
    <div className="bg-cyan-50">
      <h1 className="text-5xl text-center text-black font-bold py-16">
        ¿Por qué elegir Storage Sync Vault?
      </h1>

      <div className="py-16">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className=" p-10 text-center">
              <h1 className="text-3xl text-left text-black font-bold">
                Nunca te quedes sin espacio de almacenamiento
              </h1>

              <p className="text-xl text-left text-black  py-4">
                ¿Necesitas mucho espacio de almacenamiento? No hay problema.
                Tenemos una gama de planes competitivos hasta 4 TB . Si
                necesitas aún más espacio, contrata un plan Pro Flexi o
                Business, donde solo pagas por el espacio de almacenamiento
                adicional que utilizas.
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <img src={adjuntoArchivo} alt="" />
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <img src={globalCompartir} alt="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className=" p-10 text-center">
              <h1 className="text-3xl text-left text-black font-bold">
                Comparte archivos con quien quieras
              </h1>

              <p className="text-xl text-left text-black  py-4">
                Comparte fácilmente tus archivos de Storage Sync Vault con
                amigos y colegas. Y al compartir, todavía tienes el control.
                Puedes dar acceso completo o de solo lectura a tus archivos, y
                puedes establecer una contraseña o crear enlaces con fecha de
                caducidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className=" p-10 text-center">
              <h1 className="text-3xl text-left text-black font-bold">
                Trabaja sin problemas en todos los dispositivos
              </h1>

              <p className="text-xl text-left text-black  py-4">
                Accede fácilmente a tus archivos en la nube desde la web. Y, si
                sincronizas o realizas un backup de los datos desde tu equipo a
                Storage Sync Vault, todos los cambios se replicarán
                automáticamente en tiempo real, por lo que podrás ver los
                archivos más recientes, sin importar dónde te encuentres.
              </p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <img src={dispositivos} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorqueEscogerSSV;
