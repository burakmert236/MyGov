import Web3 from 'web3';
const { my_gov_abi } = require('../contracts');

export const web3 = new Web3(new Web3.providers.HttpProvider("https://core.bloxberg.org/RPC"));

const contract_address = "0x9096fa8d183b4daa2e0c0532fe30d654ade386fc";
export const contract = new web3.eth.Contract(my_gov_abi, contract_address);

export default {contract, web3};