import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ tipoDeBarra }) {
  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header className=" w-full  lg:fixed bg-cyan-100 rounded-b-3xl border-b border-solid border-cyan-600">
        <nav className=" py-2 ">
          {/* flex items-center justify-between max-w-screen-xl  mx-auto */}
          <div className="grid grid-cols-5">
            <div className="col-span-1 flex items-center justify-center">
              <Link to="/" className="flex items-center justify-center px-3">
                <span className="self-center text-xl text-cyan-700  whitespace-nowrap font-black font-sans">
                  Storage Sync Vault
                </span>
              </Link>
            </div>
            {/* flex items-center lg:order-2 */}
            <div className="col-span-3 flex items-center justify-center"></div>
            <div className="col-span-1 flex items-center text-center justify-center">
              <ul className="  font-medium">
                <li>
                  <div>
                    <div className="group  cursor-pointer">
                      <div className="  flex items-center text-center justify-center">
                        <a className="text-lg text-black font-semibold whitespace-nowrap">
                          Opciones
                        </a>
                      </div>
                      <div className="absolute text-white invisible  bg-cyan-100  py-3 rounded-2xl  shadow-xl group-hover:visible  right-5 transform  z-50 ">
                        <div className="w-56">
                          <div className="p-2">
                            <div>
                              <button
                                className="bg-cyan-500 w-full py-2 px-6 rounded-xl text-black uppercase font-bold hover:cursor-pointer hover:bg-cyan-700  md:w-auto"
                                onClick={cerrarSesion}
                              >
                                Cerrar Sesion
                              </button>
                            </div>
                          </div>
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
}

export default Header;
