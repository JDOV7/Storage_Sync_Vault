import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";
import useAuth from "../hooks/useAuth";
import mensajeError from "../Mensajes/MensajeError";
import Swal from "sweetalert2";
import Header from "../componentes/Auth/Header";
import PanelIzquierdoOpciones from "../componentes/Auth/PanelIzquierdoOpciones";

export default function SubirArchivosPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { IdObjetos } = params;
  const { auth, subirArchivos } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log("---------------SubirArchivosPage--------------");
  }, [auth]);
  console.log(auth);

  if (!(auth.status || auth.IdUsuarios)) {
    console.log("esta vacio");
    navigate("/login");
  }

  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const handlerSubmit = async () => {
    const bControl = await subirArchivos(files, IdObjetos);
    if (!bControl) {
      mensajeError("No se pudo iniciar sesion", "Intentalo mas tarde");
      navigate("/login");
    }
    Swal.fire({
      title: "Archivos guardados corractamente",
      text: "se guardaron los archivos",
      icon: "success",
    }).then(navigate(`/app/${IdObjetos}`));
  };

  return (
    <>
      <PanelIzquierdoOpciones
        tipoBarra={0}
        botonSubirArchivos={handlerSubmit}
      ></PanelIzquierdoOpciones>
      <Header tipoDeBarra={0}></Header>
      <div className="flex items-center justify-center  py-24 pl-52 pr-10">
        <Dropzone
          // style={{ minWidth: "50px" }}
          onChange={updateFiles}
          minHeight="195px"
          value={files}
          localization="ES-es"
        >
          {files.length > 0 &&
            files.map((file) => (
              <FileMosaic
                {...file}
                key={file.id}
                onDelete={onDelete}
                preview
                info
              />
            ))}
        </Dropzone>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlerSubmit();
        }}
      >
        Enviar al Backend
      </button>
    </>
  );
}
