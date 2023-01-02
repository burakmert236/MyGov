import Web3 from 'web3';
const { my_gov_abi } = require('../contracts');

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

const contract_address = "0x8Ce6979e5D90B844790626C25702E44c480b730D";

const contract = new web3.eth.Contract(my_gov_abi, contract_address);

export default contract;