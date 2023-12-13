// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract CompartirObjecto {
    // Mapping from address to uint
    mapping(string => mapping(string => string[])) public mapArchivos;

    function get(string memory idUsuario, string memory _cid)
        public
        view
        returns (string[] memory)
    {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.

        string[] memory personasAutorizadas = mapArchivos[idUsuario][_cid];

        if (personasAutorizadas.length == 0) {
            return new string[](0);
        }

        return personasAutorizadas;
    }

    function set(
        string memory idPropietario,
        string memory _cid,
        string memory idPersonaNueva
    ) public {
        // Update the value at this address
        mapArchivos[idPropietario][_cid].push(idPersonaNueva);
    }

    function getTienePermiso(
        string memory idPropietario,
        string memory _cid,
        string memory idConsultor
    ) public view returns (bool) {
        string[] memory personasAutorizadas = mapArchivos[idPropietario][_cid];

        if (personasAutorizadas.length == 0) {
            return false;
        }

        for (uint256 i = 0; i < personasAutorizadas.length; i++) {
            if (
                keccak256(abi.encodePacked(personasAutorizadas[i])) ==
                keccak256(abi.encodePacked(idConsultor))
            ) {
                return true; // El CID existe en el array
            }
        }
        return false;
    }

    // function eliminarAcceso(
    //     string memory idPropietario,
    //     string memory _cid,
    //     string memory idConsultor
    // ) public returns (bool) {
    //     string[] storage personasAutorizadas = mapArchivos[idPropietario][_cid];

    //     if (personasAutorizadas.length == 0) {
    //         return false;
    //     }

    //     for (uint256 i = 0; i < personasAutorizadas.length; i++) {
    //         if (
    //             keccak256(abi.encodePacked(personasAutorizadas[i])) ==
    //             keccak256(abi.encodePacked(idConsultor))
    //         ) {
    //             if (i != personasAutorizadas.length - 1) {
    //                 personasAutorizadas[i] = personasAutorizadas[
    //                     personasAutorizadas.length - 1
    //                 ];
    //             }
    //             personasAutorizadas.pop();
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}
