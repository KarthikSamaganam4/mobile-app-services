var config = require('../dlt/config.json');

var Web3 = require('../dlt/createWeb3');
var web3 = Web3.getWeb3Instance();

module.exports = {
    getUserContractInstance : function() {
        var userContract = require('../dlt/build/User.json');
        //console.log("web3>>>>", web3)
        const contractInstance = new web3.eth.Contract(userContract.abi, config["UserContract"]);
        //const contractInstance = contract.at(config["UserContract"]);
        return contractInstance;
    },

    getAuctionFlowContractInstance : function() {
        var auctionFlowContract = require('../dlt/build/AuctionFlow.json');
        const contractInstance = new web3.eth.Contract(auctionFlowContract.abi, config["AuctionFlowContract"]);
        //const contractInstance = contract.at(config["AuctionFlowContract"]);
        return contractInstance;
    }
}