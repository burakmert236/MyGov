import Web3 from 'web3';
const { my_gov_abi } = require('../contracts');

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const contract_address = "0x7d49433b0728Cf1e9D11f9d48cCA05A11fE867a2";

const contract = new web3.eth.Contract(my_gov_abi, contract_address);

export default contract;