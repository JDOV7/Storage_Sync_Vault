// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.13;

contract PaymentContract {
    address public owner;
    uint256 public regFee;
    mapping(address => uint256) public balances;
    mapping(address => bool) public paymentRecords;

    event LogPaymentReceived(address from, uint256 amount);

    constructor() {
        owner = msg.sender;
        regFee = 2 ether;
    }

    // Función para que cualquier cuenta externa realice un pago
    function makePayment() external payable {
        require(msg.value == regFee, "Payment amount must be exactly 2 ether");
        payable(owner).transfer(msg.value); // Transferir el ether al propietario
        balances[msg.sender] += msg.value;
        paymentRecords[msg.sender] = true; // Registrar que esta cuenta realizó un pago
        emit LogPaymentReceived(msg.sender, msg.value);
    }

    // Función para que el propietario del contrato consulte su saldo
    function checkBalance() external view returns (uint256) {
        require(msg.sender == owner, "Only the owner can check the balance");
        return address(this).balance;
    }

    // Función para que el propietario consulte si una cuenta ha realizado un pago
    function hasPaid(address account) external view returns (bool) {
        return paymentRecords[account];
    }
}