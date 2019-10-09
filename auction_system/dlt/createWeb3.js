const Web3 = require('web3');

let web3 = null;

module.exports = {
    getWeb3Instance : function() {
        if(web3 === null) {
            const ethProvider = new Web3.providers.HttpProvider("http://localhost:8545");
            const  web3 = new Web3('http://');
            web3.setProvider(ethProvider);
            return web3;
        }

        return web3;
    }
}