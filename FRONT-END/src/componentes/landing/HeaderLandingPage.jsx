import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import nube from "../../../public/img/nube.png";
import nube2 from "../../../public/img/nube2.png";
import discoDuro from "../../../public/img/disco-duro.png";
import discoDuro2 from "../../../public/img/disco-duro2.png";
import compartir from "../../../public/img/compartir.png";
import compartir2 from "../../../public/img/compartir2.png";
import formTexto from "../../../public/img/formato-de-texto.png";
import formTexto2 from "../../../public/img/formato-de-texto2.png";
const HeaderLandingPage = ({ btnTexto, url }) => {
  const [hover, setHover] = useState(false);
  const [hoverDiscoDuro, setHoverDiscoDuro] = useState(false);
  const [hoverCompartir, setHoverCompartir] = useState(false);
  const [hoverFormTexto, setHoverFormTexto] = useState(false);
  return (
    <>
      <header className=" w-full  lg:fixed bg-cyan-100 rounded-b-3xl border-b border-solid border-cyan-600">
        <nav className=" py-2 ">
          <div className="flex items-center justify-between max-w-screen-xl  mx-auto">
            <Link to="/" className="flex items-center px-3">
              <span className="self-center text-xl text-cyan-700  whitespace-nowrap font-black font-sans">
                Storage Sync Vault
              </span>
            </Link>
            <div className="flex items-center lg:order-2">
              <Link
                to={url}
                className="bg-cyan-500 w-full py-2 px-6 rounded-xl text-black uppercase font-bold hover:cursor-pointer hover:bg-cyan-700  md:w-auto"
              >
                {btnTexto}
              </Link>
            </div>
            <div>
              <ul className="  font-medium">
                <li>
                  <div>
                    <div className="group  cursor-pointer">
                      <div className="  flex items-center text-center justify-center">
                        <a className="text-lg text-black font-semibold whitespace-nowrap">
                          Servicios
                        </a>
                      </div>
                      <div className="absolute text-white invisible  bg-cyan-100  py-3 rounded-2xl  shadow-xl group-hover:visible left-1/2  transform -translate-x-1/2 z-50 ">
                        <div>
                          <div className="grid grid-flow-col auto-cols-max">
                            <div className="">
                              <div className="px-4">
                                <div className="w-full h-full">
                                  <div className="pb-8">
                                    <Link
                                      to="/storage"
                                      className="my-2  py-1  "
                                    >
                                      <div
                                        onMouseEnter={() => {
                                          setHover(true);
                                        }}
                                        onMouseLeave={() => {
                                          setHover(false);
                                        }}
                                      >
                                        <div className="text-black">
                                          <div className="flex text-black">
                                            <div className="text-black flex items-center justify-center ">
                                              <img
                                                className="px-2"
                                                src={`${hover ? nube2 : nube}`}
                                                alt=""
                                              />
                                            </div>
                                            <span
                                              className={` font-semibold  flex items-center justify-center text-center text-base ${
                                                hover
                                                  ? "text-cyan-500 text-lg"
                                                  : "text-black font-semibold text-base"
                                              }`}
                                            >
                                              Almacenamiento en la nube
                                            </span>
                                          </div>
                                          <span className="font-semibold text-base">
                                            Guarda tus archivos en un lugar
                                            seguro.
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>

                                  <div>
                                    <Link
                                      to="/backup"
                                      className="my-2  py-1 border-b-2  md:mx-2"
                                    >
                                      <div
                                        className="text-black"
                                        onMouseEnter={() => {
                                          setHoverDiscoDuro(true);
                                        }}
                                        onMouseLeave={() => {
                                          setHoverDiscoDuro(false);
                                        }}
                                      >
                                        <div>
                                          <div className="flex">
                                            <div className=" flex items-center justify-center ">
                                              <img
                                                className="px-2"
                                                src={`${
                                                  hoverDiscoDuro
                                                    ? discoDuro2
                                                    : discoDuro
                                                }`}
                                                alt=""
                                              />
                                            </div>
                                            <span
                                              className={` font-semibold  flex items-center justify-center text-center text-base ${
                                                hoverDiscoDuro
                                                  ? "text-cyan-500 text-lg"
                                                  : "text-black text-base"
                                              }`}
                                            >
                                              Backups
                                            </span>
                                          </div>
                                          <span className="font-semibold text-base">
                                            Haz un backup de tus archivos de
                                            forma segura.
                                          </span>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="px-4">
                                <div className="pb-8">
                                  <Link to="/share" className=" py-1 ">
                                    <div
                                      onMouseEnter={() => {
                                        setHoverCompartir(true);
                                      }}
                                      onMouseLeave={() => {
                                        setHoverCompartir(false);
                                      }}
                                    >
                                      <div className="text-black">
                                        <div className="flex">
                                          <div className=" flex items-center justify-center text-center ">
                                            <img
                                              className="px-2"
                                              src={`${
                                                hoverCompartir
                                                  ? compartir2
                                                  : compartir
                                              }`}
                                              alt=""
                                            />
                                          </div>
                                          <span
                                            className={` font-semibold flex items-center justify-center text-centerr  text-base ${
                                              hoverCompartir
                                                ? "text-cyan-500 text-lg"
                                                : "text-black font-semibold text-base"
                                            }`}
                                          >
                                            Compartir
                                          </span>
                                        </div>
                                        <span className="font-semibold text-base">
                                          Comparte tus archivos con amigos.
                                        </span>
                                      </div>
                                    </div>
                                  </Link>
                                </div>

                                {/* <div className="pb-8">
                                  <a
                                    href="#"
                                    className="my-2  py-1 border-b-2  md:mx-2"
                                  >
                                    <div
                                      className="text-black"
                                      onMouseEnter={() => {
                                        setHoverFormTexto(true);
                                      }}
                                      onMouseLeave={() => {
                                        setHoverFormTexto(false);
                                      }}
                                    >
                                      <div>
                                        <div className="flex">
                                          <div className=" flex items-center justify-center ">
                                            <img
                                              className="px-2"
                                              src={`${
                                                hoverFormTexto
                                                  ? formTexto2
                                                  : formTexto
                                              }`}
                                              alt=""
                                            />
                                          </div>
                                          <span
                                            className={` font-semibold flex items-center justify-center text-center  text-base ${
                                              hoverFormTexto
                                                ? "text-cyan-500 text-lg"
                                                : "text-black font-semibold text-base"
                                            }`}
                                          >
                                            Ofimatica
                                          </span>
                                        </div>
                                        <span className="font-semibold text-base">
                                          Edita tus presentaciones, documentos
                                          de texto, etc.
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderLandingPage;
