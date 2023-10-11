import React from "react";
import { useState } from "react";
import nube from "../../public/img/nube.png";
import nube2 from "../../public/img/nube2.png";
import discoDuro from "../../public/img/disco-duro.png";
import discoDuro2 from "../../public/img/disco-duro2.png";
import compartir from "../../public/img/compartir.png";
import compartir2 from "../../public/img/compartir2.png";
import formTexto from "../../public/img/formato-de-texto.png";
import formTexto2 from "../../public/img/formato-de-texto2.png";
const HeaderLandingPage = () => {
  const [hover, setHover] = useState(false);
  const [hoverDiscoDuro, setHoverDiscoDuro] = useState(false);
  const [hoverCompartir, setHoverCompartir] = useState(false);
  const [hoverFormTexto, setHoverFormTexto] = useState(false);
  return (
    <>
      <header className=" w-full  lg:fixed ">
        <nav className="bg-slate-900 border-gray-200 py-2.5 ">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
            <a href="#" className="flex items-center">
              <span className="self-center text-xl text-white font-semibold whitespace-nowrap ">
                Storage Sync Vault
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="text-slate-700 bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-400 font-medium rounded-lg text-base px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0  focus:outline-none hover:cursor-pointer"
              >
                Crear Cuenta
              </a>
            </div>
            <div
              className="items-center justify-between  w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <div className="mx-auto flex  items-center justify-center ">
                    <div className="group  cursor-pointer  ">
                      <div className="flex items-center justify-between space-x-5  px-4">
                        <a className="menu-hover text-xl  block py-2 pl-3 pr-4 text-white  border-b lg:hover:bg-transparent lg:border-0  lg:p-0 ">
                          Productos
                        </a>
                      </div>
                      <div className="absolute text-white invisible  bg-slate-900 flex py-3 rounded-2xl px-4 shadow-xl group-hover:visible left-1/2 transform -translate-x-1/2 z-50">
                        <div>
                          <a
                            href="#"
                            className="my-2  py-1 border-b-2  md:mx-2"
                            onMouseEnter={() => {
                              setHover(true);
                            }}
                            onMouseLeave={() => {
                              setHover(false);
                            }}
                          >
                            <div className=" mx-auto items-center justify-center">
                              <span
                                className={`flex font-semibold   text-lg ${
                                  hover ? "text-cyan-500" : "text-white"
                                }`}
                              >
                                <img
                                  className="px-2"
                                  src={`${hover ? nube2 : nube}`}
                                  alt=""
                                />
                                Almacenamiento en la nube
                              </span>
                              {/* <br /> */}
                              <span className="font-light text-base">
                                Guarda tus archivos en un lugar seguro.
                              </span>
                            </div>
                          </a>

                          <a
                            href="#"
                            className="my-2  py-1 border-b-2  md:mx-2"
                          >
                            <div
                              className=""
                              onMouseEnter={() => {
                                setHoverDiscoDuro(true);
                              }}
                              onMouseLeave={() => {
                                setHoverDiscoDuro(false);
                              }}
                            >
                              <span
                                className={`flex font-semibold   text-lg ${
                                  hoverDiscoDuro
                                    ? "text-cyan-500"
                                    : "text-white"
                                }`}
                              >
                                <img
                                  className="px-2"
                                  src={`${
                                    hoverDiscoDuro ? discoDuro2 : discoDuro
                                  }`}
                                  alt=""
                                />
                                Backups
                              </span>
                              <span className="font-light text-center text-base">
                                Haz un backup de tus archivos de forma segura.
                              </span>
                            </div>
                          </a>
                        </div>

                        <div className="px-4">
                          <a
                            href="#"
                            className=" py-1 border-b-2  md:mx-2"
                            onMouseEnter={() => {
                              setHoverCompartir(true);
                            }}
                            onMouseLeave={() => {
                              setHoverCompartir(false);
                            }}
                          >
                            <div className="mx-auto items-center justify-center">
                              <span
                                className={`flex font-semibold   text-lg ${
                                  hoverCompartir
                                    ? "text-cyan-500"
                                    : "text-white"
                                }`}
                              >
                                <img
                                  className="px-2"
                                  src={`${
                                    hoverCompartir ? compartir2 : compartir
                                  }`}
                                  alt=""
                                />
                                Compartir
                              </span>
                              <span className="font-light   text-base">
                                Comparte tus archivos con amigos.
                              </span>
                            </div>
                          </a>
                          <a
                            href="#"
                            className="my-2  py-1 border-b-2  md:mx-2"
                          >
                            <div
                              className=""
                              onMouseEnter={() => {
                                setHoverFormTexto(true);
                              }}
                              onMouseLeave={() => {
                                setHoverFormTexto(false);
                              }}
                            >
                              <span
                                className={`flex font-semibold   text-lg ${
                                  hoverFormTexto
                                    ? "text-cyan-500"
                                    : "text-white"
                                }`}
                              >
                                <img
                                  className="px-2"
                                  src={`${
                                    hoverFormTexto ? formTexto2 : formTexto
                                  }`}
                                  alt=""
                                />
                                Ofimatica
                              </span>
                              <span className="font-light text-center text-base">
                                Edita tus presentaciones, documentos de texto,
                                etc.
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderLandingPage;
