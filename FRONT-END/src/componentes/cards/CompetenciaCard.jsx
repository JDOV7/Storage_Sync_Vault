import React from "react";

const CompetenciaCard = ({ props }) => {
  const { empresa, precio } = props;
  console.log(props);
  return (
    <>
      <div className="bg-slate-900 col-span-3 px-6">
        <div className="rounded-3xl bg-slate-800">
          <div className=" p-10 ">
            <h1 className="text-2xl py-6 text-white font-bold">
              {empresa || ""}
            </h1>

            <h1 className="text-4xl text-white font-semibold pb-4 ">
              {precio || ""}
            </h1>
            <h1 className="text-sm text-left text-slate-300 font-light pb-6">
              al mes por cada TB
            </h1>
            <h1 className="text-base text-left text-white font-bold pb-8">
              Cifrado punto a punto
            </h1>
            <h1 className="text-sm text-left text-slate-300 font-light">
              * Precio basado en el plan anual Pro III.
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetenciaCard;
