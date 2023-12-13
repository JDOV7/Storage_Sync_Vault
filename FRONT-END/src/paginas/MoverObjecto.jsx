// import React, { useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

// const TreeNode = ({ nodeId, nodeName, children, setFolder }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNode = () => {
//     setIsOpen(!isOpen);
//   };

//   const imprimir = async (childId) => {
//     // window.alert(nodeName);
//     console.log(childId);
//   };

//   // Object.keys(children).map((e) => {
//   //   console.log(e);
//   //   console.log(children[e]);
//   //   console.log(Object.keys(children[e]));
//   // });

//   return (
//     <div className="w-full">
//       <input type="checkbox" id={`node-${nodeId}`} className="hidden" />
//       <label
//         htmlFor={`node-${nodeId}`}
//         className="flex items-center cursor-pointer w-full"
//       >
//         <span onClick={toggleNode} className="w-full  hover:bg-red-300">
//           {nodeName}
//         </span>
//       </label>
//       {isOpen && children && (
//         <div className="pl-6 w-full ">
//           {Object.keys(children).map((childId) => (
//             <div
//               onClick={() => {
//                 imprimir(childId.split("*|*")[1]);
//               }}
//             >
//               <TreeNode
//                 key={childId}
//                 nodeId={childId.split("*|*")[0]}
//                 nodeName={
//                   `${
//                     children[childId] &&
//                     Object.keys(children[childId]) &&
//                     Object.keys(children[childId]).length >= 1
//                       ? "> "
//                       : ""
//                   }` + childId.split("*|*")[1]
//                 }
//                 children={children[childId]}
//               ></TreeNode>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const Tree = ({ treeData, setFolder }) => {
//   const rootNodeId = treeData ? Object.keys(treeData)[0] : {};
//   const name = treeData ? rootNodeId.split("*|*")[1] : "";
//   const id = treeData ? rootNodeId.split("*|*")[0] : "";
//   //   console.log(rootNodeId);
//   //   console.log(name);
//   //   console.log(id);
//   //   console.log(treeData[rootNodeId]);
//   return (
//     <div className="tree w-full">
//       <ul className="w-full">
//         <li className="w-full">
//           <TreeNode
//             nodeId={id}
//             nodeName={"> " + name}
//             children={treeData[rootNodeId]}
//             // setFolder={setFolder}
//           />
//         </li>
//       </ul>
//     </div>
//   );
// };

// const MoverObjecto = ({ modal, setModal }) => {
//   // Ejemplo de datos para el árbol
//   const navigate = useNavigate();
//   const { auth, obtenerArbolDeCarpetas, cargando } = useAuth();
//   const [arbol, setArbol] = useState(undefined);
//   const [folder, setFolder] = useState("XX");

//   useEffect(() => {
//     console.log("---------------MoverObjecto--------------");
//     const obtenerArbol = async () => {
//       console.log(auth);
//       console.log(cargando);
//       const datos = await obtenerArbolDeCarpetas();
//       console.log(datos);
//       setArbol(datos);
//     };
//     obtenerArbol();
//   }, [auth]);

//   if (!(auth.status || auth.IdPlanes)) {
//     console.log("esta vacio");
//     // navigate("/login");
//   }

//   return (
//     <>
//       <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//         <div className="relative w-auto my-6 mx-auto max-w-3xl">
//           <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//             <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//               <h3 className="text-3xl font-semibold">Mover Elemento</h3>
//             </div>
//             <div className="relative p-6 flex-auto">
//               <div className="max-w-md mx-auto m-8 p-2">
//                 <div className="bg-cyan-200 font-black  rounded shadow p-4  h-60 overflow-x-auto w-full">
//                   {arbol != undefined ? (
//                     <>
//                       <Tree treeData={arbol} setFolder={setFolder} />
//                     </>
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-blueGray-200 rounded-b">
//               <button
//                 className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setModal(!modal)}
//               >
//                 Cancelar
//               </button>
//               <button
//                 className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                 type="button"
//                 onClick={() => setModal(!modal)}
//               >
//                 Mover
//               </button>
//             </div>
//             <div className=" flex items-center justify-center pb-5">
//               {folder}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MoverObjecto;

// ... (resto del código)
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const TreeNode = ({ nodeId, nodeName, children, onNodeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  const imprimir = async (nodoNombre, nodoId, e) => {
    // window.alert(nodeName);
    // console.log(childId);
    // Llama a la función proporcionada desde las props
    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(nodoNombre, nodoId);
    }
  };

  return (
    <div className="w-full">
      <input type="checkbox" id={`node-${nodeId}`} className="hidden" />
      <label
        htmlFor={`node-${nodeId}`}
        className="flex items-center cursor-pointer w-full"
      >
        <span onClick={toggleNode} className="w-full  hover:bg-cyan-300">
          {nodeName}
        </span>
      </label>
      {isOpen && children && (
        <div className="pl-6 w-full ">
          {Object.keys(children).map((childId) => (
            <div
              key={childId}
              onClick={(e) => {
                imprimir(childId.split("*|*")[1], childId.split("*|*")[0], e);
              }}
            >
              <TreeNode
                nodeId={childId.split("*|*")[0]}
                nodeName={
                  `${
                    children[childId] &&
                    Object.keys(children[childId]) &&
                    Object.keys(children[childId]).length >= 1
                      ? "> "
                      : ""
                  }` + childId.split("*|*")[1]
                }
                children={children[childId]}
                onNodeClick={onNodeClick} // Pasa la función a los nodos hijos
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ treeData, onNodeClick }) => {
  const rootNodeId = treeData ? Object.keys(treeData)[0] : {};
  const name = treeData ? rootNodeId.split("*|*")[1] : "";
  const id = treeData ? rootNodeId.split("*|*")[0] : "";
  //   console.log(rootNodeId);
  //   console.log(name);
  //   console.log(id);
  //   console.log(treeData[rootNodeId]);
  const imprimir = async (nodoNombre, nodoId, e) => {
    // window.alert(nodeName);
    // console.log(childId);
    // Llama a la función proporcionada desde las props
    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(nodoNombre, nodoId);
    }
  };
  return (
    <div className="tree w-full">
      <ul className="w-full">
        <li className="w-full">
          {/* <TreeNode
            nodeId={id}
            nodeName={"> " + name}
            children={treeData[rootNodeId]}
            // setFolder={}
            onNodeClick={onNodeClick}
            // setFolder, onNodeClick
            // setFolder={setFolder}
          /> */}
          <div
            key={id}
            onClick={(e) => {
              imprimir(name, id, e);
            }}
          >
            <TreeNode
              onNodeClick={onNodeClick} // Pasa la función a los nodos hijos
              nodeId={id}
              nodeName={"> " + name}
              children={treeData[rootNodeId]}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

const MoverObjecto = ({
  modal,
  setModal,
  idObjecto,
  funcActualizarTabla,
  setIsOpen,
  Mime,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const { IdObjetos: paramIdObjecto } = params;
  const { auth, obtenerArbolDeCarpetas, movelFolder, movelArchivo } = useAuth();
  const [arbol, setArbol] = useState(undefined);
  const [folder, setFolder] = useState("");
  const [folderId, setFolderId] = useState("");

  useEffect(() => {
    const obtenerArbol = async () => {
      const datos = await obtenerArbolDeCarpetas();
      setArbol(datos);
      // setFolderId(Object.keys(datos)[0]);
    };
    obtenerArbol();
  }, [auth]);

  const handleNodeClick = (nodeNombre, nodoId) => {
    // Aquí puedes realizar acciones específicas cuando se hace clic en un nodo
    console.log(`Nodo clicado: ${nodeNombre}`);
    setFolder(nodeNombre);
    setFolderId(nodoId);
  };

  const movelFolderFunc = async () => {
    // window.alert(`moviendo: ${idObjecto} al dir: ${folderId}`);
    try {
      const respuesta = await movelFolder(idObjecto, folderId);
      console.log(respuesta);
      setModal(false);
      if (respuesta == true) {
        Swal.fire({
          title: "Carpeta Actualizada",
          text: "La carpeta se cambio de lugar",
          icon: "success",
        });
        await funcActualizarTabla(paramIdObjecto);
      } else {
        console.log(respuesta.response.data);
        if (
          respuesta.response.data.message ==
          "El directorio destino es subcarpeta del origen "
        ) {
          Swal.fire({
            title:
              "El directorio destino no puede ser subcarpeta o ser el mismo",
            icon: "error",
          });
        } else if (respuesta != true) {
          throw new Error("Error");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "No se pudo mover",
        icon: "error",
      });
      console.log(error);
    }
    setIsOpen(false);
  };

  const moverArchivoFunc = async () => {
    try {
      const respuesta = await movelArchivo(idObjecto, folderId);
      console.log(respuesta);
      setModal(false);
      if (respuesta == true) {
        Swal.fire({
          title: "Carpeta Actualizada",
          text: "El archivo se cambio de lugar",
          icon: "success",
        });
        await funcActualizarTabla(paramIdObjecto);
      } else {
        throw new Error("Error");
      }
    } catch (error) {
      Swal.fire({
        title: "No se pudo mover",
        icon: "error",
      });
      console.log(error);
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Mover Elemento</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="max-w-md mx-auto m-8 p-2">
                <div className="bg-cyan-100 font-black  rounded shadow p-4  h-60 overflow-x-auto w-full">
                  {arbol != undefined ? (
                    <>
                      <Tree treeData={arbol} onNodeClick={handleNodeClick} />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setModal(!modal);
                  setIsOpen(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setModal(!modal);
                  if (Mime == "directory") {
                    movelFolderFunc();
                  } else {
                    moverArchivoFunc();
                  }

                  setIsOpen(false);
                }}
              >
                Mover
              </button>
            </div>
            <div className=" flex items-center justify-center pb-5">
              {folder}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoverObjecto;
