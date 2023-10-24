import React from "react";

const TextoImagenCard = ({ datos }) => {
  console.log(datos);
  const { imagen, titulo, texto, textoPosicion } = datos;
  return (
    <>
      <div className="py-16">
        {textoPosicion ? (
          <>
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <div className="flex items-center justify-center">
                  <img src={imagen} alt="" />
                </div>
              </div>
              <div className="col-span-2">
                <div className=" p-10 text-center">
                  <h1 className="text-3xl text-left text-white font-bold">
                    {titulo}
                  </h1>

                  <p className="text-xl text-left text-white  py-4">{texto}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <div className=" p-10 text-center">
                  <h1 className="text-3xl text-left text-white font-bold">
                    {titulo}
                  </h1>

                  <p className="text-xl text-left text-white  py-4">{texto}</p>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex items-center justify-center">
                  <img src={imagen} alt="" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TextoImagenCard;
