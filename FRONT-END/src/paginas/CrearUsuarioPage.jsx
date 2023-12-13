import React, { useState } from "react";
import Swal from "sweetalert2";
import Web3 from "web3";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import userIMG from "../../public/img/login/hombre.png";
import passwordIMG from "../../public/img/login/cerrar-con-llave.png";
import githubIMG from "../../public/img/login/github.png";
import facebookIMG from "../../public/img/login/facebook.png";
import ethIMG from "../../public/img/CrearCuenta/icons8-ethereum-32.png";
import mensajeError from "../Mensajes/MensajeError";
import clienteAxios from "../../config/axios";
import { useEth } from "../context/EthContext";
import axios from "axios";

function CrearUsuarioPage() {
  const [IdPlanes, setIdPlanes] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Nombres, setNombres] = useState("");
  const [Apellidos, setApellidos] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordRepetir, setPasswordRepetir] = useState("");
  const [direccion, setDireccion] = useState("");
  const {
    state: { contract, accounts },
  } = useEth();

  const scope = "user:email";
  const clienteId = import.meta.env.VITE_CLIENT_ID_GITHUB;
  console.log(clienteId);
  const url = `https://github.com/login/oauth/authorize?client_id=${clienteId}&scope=${scope}`;
  console.log(url);

  const crearCuenta = async () => {
    try {
      const body = {
        // IdPlanes,
        Correo,
        Password,
        Nombres,
        Apellidos,
        direccion,
      };
      console.log(body);
      const { data } = await clienteAxios.post(`/auth/usuario`, {
        // IdPlanes,
        Correo,
        Password,
        Nombres,
        Apellidos,
        direccion: accounts[0],
      });
      // const { data } = await clienteAxios.post(`/auth/usuario`);
      //   const { data } = await axios.get(`http://localhost:5000/auth/usuario`);
      console.log(data);
      Swal.fire({
        title: "Cuenta creada",
        text: "Se envio un link a tu correo, abrelo para confirmar tu cuenta",
        icon: "success",
      });

      //   throw new Error("Error al crear la cuenta");
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo crear la cuenta", "Intentalo mas tarde");
    }
  };

  return (
    <>
      <div className="bg-slate-50">
        <HeaderLandingPage
          btnTexto={"Inicia Sesion"}
          url={"/login"}
        ></HeaderLandingPage>
      </div>
      <div className="pt-16 pb-6  bg-slate-50 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-20">
          <div className="col-span-1">
            <div className="p-8">
              <div className="bg-cyan-100 p-10 rounded-2xl shadow-2xl">
                <div>
                  <h1 className="text-center font-extrabold text-3xl">
                    Crear Cuenta
                  </h1>
                </div>
                <div className="py-4">
                  <div className="py-2">
                    <label htmlFor="Correo" className="font-semibold text-xl">
                      Correo
                    </label>
                  </div>
                  <div className="flex items-center">
                    <img src={userIMG} alt="" className="px-2" />
                    <input
                      type="email"
                      id="Correo"
                      className="w-full font-extrabold text-xl p-2 rounded-lg"
                      value={Correo}
                      onChange={(e) => {
                        setCorreo(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <div className="py-2">
                    <label htmlFor="Nombres" className="font-semibold text-xl">
                      Nombre
                    </label>
                  </div>
                  <div className="flex items-center">
                    <img src={userIMG} alt="" className="px-2" />
                    <input
                      type="text"
                      id="Nombres"
                      className="w-full font-extrabold text-xl p-2 rounded-lg"
                      value={Nombres}
                      onChange={(e) => {
                        setNombres(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <div className="py-2">
                    <label
                      htmlFor="Apellidos"
                      className="font-semibold text-xl"
                    >
                      Apellidos
                    </label>
                  </div>
                  <div className="flex items-center">
                    <img src={userIMG} alt="" className="px-2" />
                    <input
                      type="text"
                      id="Apellidos"
                      className="w-full font-extrabold text-xl p-2 rounded-lg"
                      value={Apellidos}
                      onChange={(e) => {
                        setApellidos(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <div className="py-2">
                    <label htmlFor="Password" className="font-semibold text-xl">
                      Contraseña
                    </label>
                  </div>
                  <div className="flex items-center">
                    <img src={passwordIMG} alt="" className="px-2" />
                    <input
                      type="password"
                      id="Password"
                      className="w-full font-extrabold text-xl p-2 rounded-lg"
                      value={Password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="py-4">
                  <div className="py-2">
                    <label
                      htmlFor="PasswordRepetir"
                      className="font-semibold text-xl"
                    >
                      Repetir Contraseña
                    </label>
                  </div>
                  <div className="flex items-center">
                    <img src={passwordIMG} alt="" className="px-2" />
                    <input
                      type="password"
                      id="PasswordRepetir"
                      className="w-full font-extrabold text-xl p-2 rounded-lg"
                      value={PasswordRepetir}
                      onChange={(e) => {
                        setPasswordRepetir(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center py-4">
                  <button
                    className="bg-cyan-500 w-full py-2 px-6 rounded-xl text-black uppercase font-bold hover:cursor-pointer hover:bg-cyan-700  md:w-auto"
                    onClick={async (e) => {
                      e.preventDefault();

                      try {
                        if (!(Correo.length >= 8)) {
                          throw new Error("No se pudo crear la cuenta");
                        }
                        setDireccion(accounts[0]);
                        const respuesta = await contract.methods
                          .makePayment()
                          .send({
                            from: accounts[0], // Cambia esto según la cuenta que desees
                            value: Web3.utils.toWei("2", "ether"),
                          });
                        console.log(respuesta);
                        console.log(respuesta.transactionHash);
                        if (respuesta.transactionHash) {
                          await crearCuenta();
                        }
                      } catch (error) {
                        console.log(error);
                        mensajeError(
                          "No se creo la cuenta",
                          "intentalo mas tarde"
                        );
                      }
                    }}
                  >
                    Crear Cuenta
                  </button>
                </div>
                <div className="flex text-center justify-center items-center pb-4">
                  <hr className="w-64 h-px m-4 bg-black border-0  " />
                  <p className="px-6"> O </p>
                  <hr className="w-64 h-px m-4 bg-black border-0 " />
                </div>
                <div className="flex items-center justify-center align-middle pb-4">
                  <div className="">
                    <button>
                      {/* <div className="flex items-start justify-start bg-red-300">
                        <img src={githubIMG} alt="" className="px-2" />
                        <p className="font-extrabold">GitHub</p>
                      </div> */}
                      <a
                        href={url}
                        // target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start justify-start"
                      >
                        <img src={githubIMG} alt="" className="px-2" />
                        <p className="font-extrabold">GitHub</p>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 ">
            <div>
              <div className="text-5xl font-black pt-28">
                <h1>
                  Por solo 2{" "}
                  <span className="text-6xl font-black text-cyan-700 font-sans">
                    ETH
                  </span>{" "}
                  Crea tu cuenta y empieza a subir tus archivos en{" "}
                  <span className="text-6xl font-black text-cyan-700 font-sans">
                    Storage Sync Vault
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearUsuarioPage;
