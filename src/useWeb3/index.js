import Web3 from 'web3';
const { my_gov_abi } = require('../contracts');

export const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

const contract_address = "0xc2663f661830dC52117379303780824a57A682A4";
export const contract = new web3.eth.Contract(my_gov_abi, contract_address);

export default {contract, web3};