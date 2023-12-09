import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import HeaderLandingPage from "../componentes/landing/HeaderLandingPage";
import userIMG from "../../public/img/login/hombre.png";
import passwordIMG from "../../public/img/login/cerrar-con-llave.png";
import githubIMG from "../../public/img/login/github.png";
import facebookIMG from "../../public/img/login/facebook.png";
import mensajeError from "../Mensajes/MensajeError";
import clienteAxios from "../../config/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAuth } = useAuth();
  const [Correo, setCorreo] = useState("correo2@gmail.com");
  const [Password, setPassword] = useState("12345678_*-fgHGDb+");
  const [code, setCode] = useState();
  const scope = "user:email";
  const clienteId = import.meta.env.VITE_CLIENT_ID_GITHUB;
  console.log(clienteId);
  const url = `https://github.com/login/oauth/authorize?client_id=${clienteId}&scope=${scope}`;
  console.log(url);

  useEffect(() => {
    console.log(searchParams.get("code"));
    const codeRes = searchParams.get("code");
    setCode(searchParams.get("code"));
    const iniciar = async () => {
      if (codeRes && codeRes.length >= 1) {
        await crear_iniciarSesionGithub(codeRes);
      }
    };

    iniciar();
  }, []);

  const crear_iniciarSesionGithub = async (code) => {
    try {
      const url = `/auth/github/crear-iniciar-sesion?code=${code}`;
      const { data } = await clienteAxios.get(url);
      // if (!data) {
      //   throw new Error("Error, no se pudo iniciar sesion");
      // }
      // const {
      //   data: { tokenJWT, IdUsuarios },
      // } = data;
      console.log(data);

      if (data.status == 201) {
        console.log(
          "--------------------crear_iniciarSesionGithub: cuenta creada-------------"
        );
        Swal.fire({
          title: "¡Cuenta creada correctamente!",
          text: "Ya puedes iniciar sesion",
          icon: "success",
        });
      } else if (data.status == 200) {
        console.log(
          "--------------------crear_iniciarSesionGithub: iniciar sesion-------------"
        );
        // console.log(data.data.respuestaLoginGithub.data);
        const {
          data: { tokenJWT, IdUsuarios },
        } = data;
        console.log(data);
        setAuth(data);
        console.log(tokenJWT);
        window.localStorage.setItem("jwt-storage-sync-vault", tokenJWT);
        window.localStorage.setItem(
          "IdUsuarios-storage-sync-vault",
          IdUsuarios
        );
        Swal.fire({
          title: "¡Sesion iniciada correctamente!",
          text: "Haz iniciado sesion",
          icon: "success",
        }).then(navigate(`/app/${IdUsuarios}`));
      }
      // setAuth(data);
      // console.log(tokenJWT);
      // window.localStorage.setItem("jwt-storage-sync-vault", tokenJWT);
      // Swal.fire({
      //   title: "¡Sesion iniciada correctamente!",
      //   text: "Haz iniciado sesion",
      //   icon: "success",
      // }).then(navigate(`/app/${IdUsuarios}`));
    } catch (error) {
      console.log(error);
      // mensajeError("No se pudo iniciar sesion", "Intentalo mas tarde");
    }
  };

  const iniciarSesion = async () => {
    try {
      const url = "/auth/usuario/iniciar-sesion";
      const body = { Correo, Password };
      const { data } = await clienteAxios.post(url, body);
      if (!data) {
        throw new Error("Error, no se pudo iniciar sesion");
      }
      const {
        data: { tokenJWT, IdUsuarios },
      } = data;
      console.log(data);
      setAuth(data);
      console.log(tokenJWT);
      window.localStorage.setItem("jwt-storage-sync-vault", tokenJWT);
      window.localStorage.setItem("IdUsuarios-storage-sync-vault", IdUsuarios);
      Swal.fire({
        title: "¡Sesion iniciada correctamente!",
        text: "Haz iniciado sesion",
        icon: "success",
      }).then(navigate(`/app/${IdUsuarios}`));
    } catch (error) {
      console.log(error);
      mensajeError("No se pudo iniciar sesion", "Intentalo mas tarde");
    }
  };

  return (
    <>
      <div className="bg-slate-50">
        <HeaderLandingPage
          btnTexto={"Crear Cuenta"}
          url={"/crear-cuenta"}
        ></HeaderLandingPage>
      </div>
      <div className="pt-16 pb-6  bg-slate-50 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-20">
          <div className="col-span-1">
            <div className="p-8">
              <div className="bg-cyan-100 p-10 rounded-2xl shadow-2xl">
                <div>
                  <h1 className="text-center font-extrabold text-3xl">
                    Inicio de Sesion
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
                <div className="flex items-center justify-center py-4">
                  <button
                    className="bg-cyan-500 w-full py-2 px-6 rounded-xl text-black uppercase font-bold hover:cursor-pointer hover:bg-cyan-700  md:w-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      iniciarSesion();
                    }}
                  >
                    Iniciar Sesion
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
                <div className="flex items-center justify-center align-middle">
                  <div className="">
                    <button>
                      <div className="flex items-start justify-start ">
                        <img src={facebookIMG} alt="" className="px-2" />
                        <p className="font-extrabold">Facebok</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <div className="text-5xl font-black">
              <h1>
                Inicia sesion y empieza a subir tus archivos en{" "}
                <span className="text-6xl font-black text-cyan-700 font-sans">
                  Storage Sync Vault
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
