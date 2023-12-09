import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      console.log("validando existe ");
      const token = localStorage.getItem("jwt-storage-sync-vault");
      // console.log(token);
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      try {
        const { data } = await clienteAxios.get("/auth/validar-sesion", config);
        // console.log(data);
        setAuth(data);
        console.log(data);
      } catch (error) {
        setAuth({});
        console.log(error);
        setCargando(false);
      }

      // console.log("si hay token");
    };
    autenticarUsuario();
  }, []);

  const obtenerObjectosFolder = async (idObjectos) => {
    try {
      console.log(
        "--------------------obtenerObjectosFolder--------------------"
      );
      const url = `/objectos/folder/${idObjectos}`;
      console.log(url);
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clienteAxios.get(url, config);
      console.log(auth.IdUsuarios);
      const elementos = data.data?.elementos.filter(
        (e) => !e.NombreVista.includes(idObjectos)
      );
      // const elementos = data.data?.elementos
      console.log(elementos);
      return [data.data?.folder, elementos];
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const crearFolder = async (NombreVista, Padre) => {
    try {
      const url = "/objectos/folder";
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const body = { NombreVista, Padre };
      console.log(body);
      console.log(config);
      const { data } = await clienteAxios.post(url, body, config);
      // console.log(data);
      return true;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  };

  const eliminarFolder = async (idObjectos) => {
    try {
      const url = `/objectos/folder/${idObjectos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clienteAxios.delete(url, config);
      console.log(data);
      return true;
    } catch (error) {
      console.log(error.response);
      return false;
    }
  };

  const eliminarArchivo = async (idObjecto) => {
    try {
      const url = `/objectos/archivos/${idObjecto}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clienteAxios.delete(url, config);
      console.log(data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const subirArchivos = async (archivos, IdObjetos) => {
    const formData = new FormData();
    console.log("-----------------subiendo archivos:---------");
    console.log(archivos);
    archivos.forEach((image, index) => {
      formData.append("archivo", image.file);
      console.log(image);
    });
    try {
      const url = `/objectos/archivos`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
          Padre: IdObjetos,
        },
      };
      console.log(IdObjetos);
      console.log(url);
      console.log(formData.getAll("archivo"));
      const { data } = await clienteAxios.post(url, formData, config);
      console.log(data);
      return true;
    } catch (error) {
      console.log("imageUpload" + error);
      return false;
    }
  };

  const obtenerArchivo = async (IdObjetos) => {
    console.log("-----------------obtenerArchivo:---------");

    try {
      const url = `/objectos/archivo/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      const blob = await response.data;

      const urlPDF = URL.createObjectURL(blob);
      window.open(urlPDF, "_blank");
      return true;
    } catch (error) {
      console.log("obtenerArchivo: " + error);
      return false;
    }
  };

  const obtenerObjectosEliminados = async () => {
    try {
      console.log(
        "--------------------obtenerObjectosEliminados--------------------"
      );
      const url = `/objectos/archivos-eliminados`;
      console.log(url);
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clienteAxios.get(url, config);
      console.log(data);
      // const elementos = data.data?.elementos.filter(
      //   (e) => !e.NombreVista.includes(idObjectos)
      // );
      const elementos = data.elementos;
      console.log(elementos);
      return [data.data?.folder, elementos];
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };

  const recuperarFolderObjecto = async (idObjecto) => {
    try {
      console.log(
        "------------------------recuperarFolderObjecto------------------"
      );
      const url = `/objectos/folder/recuperar/${idObjecto}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      console.log(idObjecto);
      console.log(config);
      const { data } = await clienteAxios.put(url, {}, config);
      console.log(data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const recuperarArchivo = async (idObjecto) => {
    try {
      console.log("------------------------recuperarArchivo------------------");
      const url = `/objectos/archivos/${idObjecto}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      console.log(idObjecto);
      console.log(config);
      const { data } = await clienteAxios.put(url, {}, config);
      console.log(data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const obtenerArbolDeCarpetas = async () => {
    try {
      console.log(
        "------------------------obtenerArbolDeCarpetas------------------"
      );
      const url = `/objectos/arbol-carpetas`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await clienteAxios.get(url, config);
      console.log(data.data?.arbol);

      return data.data?.arbol;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const movelFolder = async (idFolder, Padre) => {
    try {
      console.log("------------------------movelFolder------------------");
      const url = `/objectos/folder/mover/${idFolder}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, { Padre }, config);
      console.log(data.data?.arbol);

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const movelArchivo = async (idArchivo, Padre) => {
    try {
      console.log("------------------------movelFolder------------------");
      const url = `/objectos/archivos/${idArchivo}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, { Padre }, config);
      console.log(data.data?.arbol);

      return true;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const compartirArchivo = async (idArchivo, Correo) => {
    try {
      console.log("------------------------compartirArchivo------------------");
      const url = `/objectos-compartidos/archivo/${idArchivo}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, { Correo }, config);
      console.log(data.data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const compartirFolder = async (idFolder, Correo) => {
    try {
      console.log("------------------------compartirFolder------------------");
      const url = `/objectos-compartidos/folder/${idFolder}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, { Correo }, config);
      console.log(data.data);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const obtenerCuentasAutorizadas = async (idArchivo) => {
    try {
      console.log(
        "------------------------obtenerCuentasAutorizadas------------------"
      );
      const url = `/objectos-compartidos/archivo/${idArchivo}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.get(url, config);
      console.log(data.data?.cuentas);

      return data.data?.cuentas;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const obtenerCuentasAutorizadasFolder = async (idFolder) => {
    try {
      console.log(
        "------------------------obtenerCuentasAutorizadasFolder------------------"
      );
      const url = `/objectos-compartidos/folder/${idFolder}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.get(url, config);
      console.log(data.data?.cuentas);

      return data.data?.cuentas;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const eliminarAccesoArchivo = async (idArchivo, IdUsuarios) => {
    try {
      console.log(
        "------------------------obtenerCuentasAutorizadas------------------"
      );
      const url = `/objectos-compartidos/archivo/${idArchivo}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.delete(url, {
        data: {
          IdUsuarios,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(data.data);

      return data.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const eliminarAccesoFolder = async (idFolder, IdUsuarios) => {
    try {
      console.log(
        "------------------------eliminarAccesoFolder------------------"
      );
      const url = `/objectos-compartidos/folder/${idFolder}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.delete(url, {
        data: {
          IdUsuarios,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(data.data);

      return data.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const descargarArchivo = async (IdObjetos, NombreVista) => {
    console.log("-----------------descargarArchivo:---------");

    try {
      const url = `/objectos/archivo/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      console.log(response);
      const blob = await response.data;

      const enlace = document.createElement("a");
      enlace.href = window.URL.createObjectURL(blob);
      enlace.download = NombreVista;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      return true;
    } catch (error) {
      console.log("obtenerArchivo: " + error);
      return false;
    }
  };

  const descargarCarpeta = async (IdObjetos, NombreVista) => {
    console.log("-----------------descargarCarpeta:---------");

    try {
      const url = `/objectos/descargar/carpeta/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      console.log(response);
      const blob = await response.data;

      const enlace = document.createElement("a");
      enlace.href = window.URL.createObjectURL(blob);
      enlace.download = NombreVista;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      return true;
    } catch (error) {
      console.log("obtenerArchivo: " + error);
      return false;
    }
  };

  const listaObjectosCompartidos = async () => {
    console.log("-----------------listaObjectosCompartidos:---------");

    try {
      const url = `/objectos-compartidos/objetos/compartidos`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data?.data?.objetos);

      return response.data?.data?.objetos;
    } catch (error) {
      console.log("obtenerArchivo: " + error);
      return [];
    }
  };

  const descargarArchivoCompartido = async (IdObjetos, NombreVista) => {
    console.log("-----------------descargarArchivoCompartido:---------");

    try {
      const url = `/objectos-compartidos/archivo/descargar/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      console.log(response);
      const blob = await response.data;

      const enlace = document.createElement("a");
      enlace.href = window.URL.createObjectURL(blob);
      enlace.download = NombreVista;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      return true;
    } catch (error) {
      console.log("descargarArchivoCompartido: " + error);
      return false;
    }
  };

  const crearDocumentoGoogle = async (IdObjetos, NombreVista, TipoArchivo) => {
    console.log("-----------------crearDocumentoGoogle:---------");

    try {
      const url = `/objectos-google/archivo/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(
        url,
        { NombreVista, TipoArchivo },
        config
      );
      console.log(data);
      return true;
    } catch (error) {
      console.log("error, crearDocumentoGoogle: " + error);
      return false;
    }
  };

  const respaldarArchivo = async (IdObjetos) => {
    console.log("-----------------respaldarArchivo:---------");

    try {
      const url = `/respaldos/archivo/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, {}, config);
      console.log(data);
      return true;
    } catch (error) {
      console.log("error, respaldarArchivo: " + error);
      return false;
    }
  };

  const respaldarFolder = async (IdObjetos) => {
    console.log("-----------------respaldarFolder:---------");

    try {
      const url = `/respaldos/folder/${IdObjetos}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.post(url, {}, config);
      console.log(data);
      return true;
    } catch (error) {
      console.log("error, respaldarFolder: " + error);
      return false;
    }
  };

  const listaObjectosRespaldados = async () => {
    console.log("-----------------listaObjectosRespaldados:---------");

    try {
      const url = `/respaldos/lista`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await clienteAxios.get(url, config);
      console.log(data.data);
      return data.data.objectos;
    } catch (error) {
      console.log("error, listaObjectosRespaldados: " + error);
      return [];
    }
  };

  const descargarObjectoRespaldado = async (idObjecto, NombreVista) => {
    console.log("-----------------descargarObjectoRespaldado:---------");

    try {
      const url = `/respaldos/folder/${idObjecto}`;
      const token = localStorage.getItem("jwt-storage-sync-vault");
      if (!token) {
        setCargando(false);
        return;
      }
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      console.log(response);
      const blob = await response.data;

      const enlace = document.createElement("a");
      enlace.href = window.URL.createObjectURL(blob);
      enlace.download = NombreVista;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      return true;
    } catch (error) {
      console.log("descargarObjectoRespaldado: " + error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        obtenerObjectosFolder,
        crearFolder,
        eliminarFolder,
        eliminarArchivo,
        subirArchivos,
        obtenerArchivo,
        obtenerObjectosEliminados,
        recuperarFolderObjecto,
        recuperarArchivo,
        obtenerArbolDeCarpetas,
        movelFolder,
        movelArchivo,
        compartirArchivo,
        compartirFolder,
        obtenerCuentasAutorizadas,
        obtenerCuentasAutorizadasFolder,
        eliminarAccesoArchivo,
        eliminarAccesoFolder,
        descargarArchivo,
        descargarCarpeta,
        listaObjectosCompartidos,
        descargarArchivoCompartido,
        crearDocumentoGoogle,
        respaldarArchivo,
        respaldarFolder,
        listaObjectosRespaldados,
        descargarObjectoRespaldado,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
