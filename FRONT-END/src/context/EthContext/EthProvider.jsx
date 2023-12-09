import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import archivoPago from "../../contracts/PaymentContract.json";

function EthProvider({ children }) {
  // console.log(abi);

  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(async (artifact) => {
    if (artifact) {
      const url = Web3.givenProvider || "ws://localhost:7545";
      console.log("----------------url2--------------");
      console.log(url);
      const web3 = new Web3(url);
      // console.log(await web3.eth);
      // console.log(await web3.eth.net.getId());
      const accounts = await web3.eth.requestAccounts();
      // const accounts = await web3.eth.getAccounts();
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      // console.log(abi);
      let address, contract;
      try {
        console.log("-------------networks----------------");
        console.log(artifact.networks);
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        console.log("-----------VIVE---------------");
      } catch (err) {
        console.log("se muere");
        console.error(err);
      }
      console.log("---------------pasando el try---------------------");

      console.log(artifact);
      // console.log(web3);
      console.log(accounts);
      console.log(networkID);
      // console.log(contract);
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract },
      });
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        console.log("-----------------leinia 54-----------------");
        let artifact;

        artifact = archivoPago;

        // const artifact = abiContract;

        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    console.log(window.ethereum);
    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
