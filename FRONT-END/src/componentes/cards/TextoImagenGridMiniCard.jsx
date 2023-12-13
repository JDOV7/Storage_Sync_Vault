import React from "react";

const TextoImagenGridMiniCard = ({ datos, col }) => {
  const { imagen, titulo, texto } = datos;

  console.log(datos);
  return (
    <>
      <div className={`text-black col-span-${col} p-8`}>
        <div>
          <img src={imagen} alt="" />
          <h1 className="text-center text-2xl p-2 font-extrabold">{titulo}</h1>
          <p className="text-left text-base">{texto}</p>
        </div>
      </div>
    </>
  );
};

export default TextoImagenGridMiniCard;
