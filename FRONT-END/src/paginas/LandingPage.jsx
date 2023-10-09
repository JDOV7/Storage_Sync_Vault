import React from "react";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
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
                          >
                            <div className="mx-auto items-center justify-center">
                              <span className="font-semibold hover:text-red-500  text-lg">
                                Almacenamiento en la nube
                              </span>
                              <br />
                              <span className="font-light   text-base">
                                Guarda tus archivos en un lugar seguro
                              </span>
                            </div>
                          </a>

                          <a
                            href="#"
                            className="my-2  py-1 border-b-2  md:mx-2"
                          >
                            <div className="">
                              <span className="font-semibold hover:text-red-500  text-lg">
                                Backups
                              </span>
                              <br />
                              <span className="font-light   text-base">
                                Haz un backup de tus archivos de forma segura
                              </span>
                            </div>
                          </a>
                        </div>

                        <div>
                          <a
                            href="#"
                            className="my-2  py-1 border-b-2  md:mx-2"
                          >
                            <div className="mx-auto items-center justify-center">
                              <span className="font-semibold hover:text-red-500  text-lg">
                                Compartir
                              </span>
                              <br />
                              <span className="font-light   text-base">
                                Comparte tus archivos con amigos
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

      <div className="p-14 text-center">hola mundo</div>
    </>
  );
};

export default LandingPage;
