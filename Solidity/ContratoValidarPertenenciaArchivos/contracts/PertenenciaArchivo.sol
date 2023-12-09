// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract PertenenciaArchivo {
    // Mapping from address to uint
    mapping(string => string[]) public mapArchivos;

    function get(string memory idUsuario) public view returns (string[] memory) {
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.

        string[] memory cids = mapArchivos[idUsuario];

        if (cids.length == 0) {
            return new string[](0);
        }

        return cids;
    }

    function set(string memory idUsuario, string memory _cid) public {
        // Update the value at this address
        mapArchivos[idUsuario].push(_cid);
    }

    function getCID(string memory idUsuario, string memory _cid)
        public
        view
        returns (bool)
    {
        string[] memory cids = mapArchivos[idUsuario];

        if (cids.length == 0) {
            return false;
        }

        for (uint256 i = 0; i < cids.length; i++) {
            if (
                keccak256(abi.encodePacked(cids[i])) ==
                keccak256(abi.encodePacked(_cid))
            ) {
                return true; // El CID existe en el array
            }
        }
        return false;
    }
}
