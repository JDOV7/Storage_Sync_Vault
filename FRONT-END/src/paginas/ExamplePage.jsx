// ... (resto del código)
import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const TreeNode = ({ nodeId, nodeName, children, setFolder, onNodeClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNode = () => {
    setIsOpen(!isOpen);
  };

  const imprimir = async (childId, e) => {
    // window.alert(nodeName);
    // console.log(childId);
    // Llama a la función proporcionada desde las props
    e.stopPropagation();
    if (onNodeClick) {
      onNodeClick(childId);
    }
  };

  return (
    <div className="w-full">
      <input type="checkbox" id={`node-${nodeId}`} className="hidden" />
      <label
        htmlFor={`node-${nodeId}`}
        className="flex items-center cursor-pointer w-full"
      >
        <span onClick={toggleNode} className="w-full  hover:bg-red-300">
          {nodeName}
        </span>
      </label>
      {isOpen && children && (
        <div className="pl-6 w-full ">
          {Object.keys(children).map((childId) => (
            <div
              key={childId}
              onClick={(e) => {
                imprimir(childId.split("*|*")[1], e);
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

const Tree = ({ treeData, setFolder, onNodeClick }) => {
  const rootNodeId = treeData ? Object.keys(treeData)[0] : {};
  const name = treeData ? rootNodeId.split("*|*")[1] : "";
  const id = treeData ? rootNodeId.split("*|*")[0] : "";
  //   console.log(rootNodeId);
  //   console.log(name);
  //   console.log(id);
  //   console.log(treeData[rootNodeId]);
  return (
    <div className="tree w-full">
      <ul className="w-full">
        <li className="w-full">
          <TreeNode
            nodeId={id}
            nodeName={"> " + name}
            children={treeData[rootNodeId]}
            // setFolder={}
            onNodeClick={onNodeClick}
            // setFolder, onNodeClick
            // setFolder={setFolder}
          />
        </li>
      </ul>
    </div>
  );
};

const ExamplePage = ({ modal, setModal }) => {
  const navigate = useNavigate();
  const { auth, obtenerArbolDeCarpetas, cargando } = useAuth();
  const [arbol, setArbol] = useState(undefined);
  const [folder, setFolder] = useState("XX");

  useEffect(() => {
    const obtenerArbol = async () => {
      const datos = await obtenerArbolDeCarpetas();
      setArbol(datos);
    };
    obtenerArbol();
  }, [auth]);

  const handleNodeClick = (nodeId) => {
    // Aquí puedes realizar acciones específicas cuando se hace clic en un nodo
    console.log(`Nodo clicado: ${nodeId}`);
    setFolder(nodeId);
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
                <div className="bg-cyan-200 font-black  rounded shadow p-4  h-60 overflow-x-auto w-full">
                  {arbol != undefined ? (
                    <>
                      <Tree
                        treeData={arbol}
                        setFolder={setFolder}
                        onNodeClick={handleNodeClick}
                      />
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
                onClick={() => setModal(!modal)}
              >
                Cancelar
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setModal(!modal)}
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

export default ExamplePage;
