const Web3 = require('../dlt/createWeb3');
const web3 = Web3.getWeb3Instance();
const contractUtil = require('../utils/contract_util')

async function createAccount(payload) {
    return web3.eth.personal.newAccount(payload.password);
}

async function getAccounts() {
    var accounts = await web3.eth.getAccounts();
    return accounts;
}

async function getAuctionInstance() {
    var auctionInstance = await contractUtil.getAuctionFlowContractInstance();
    return auctionInstance;
}
function getUsers(users) {
    var users = [];
    for(var i=0; i<users.length; i++){
        users.push(web3.utils.padRight(web3.utils.utf8ToHex(users[i])))
    }
    return users;
}
module.exports = {
    registerUser: async(req, res) =>{
        try {
            var data = req.body;
            var auctionInstance = await getAuctionInstance();
            var account = await createAccount(data);
            
            var accounts = await getAccounts();
            console.log("account>>>>>",accounts)
            var userId = web3.utils.padRight(web3.utils.utf8ToHex(data.username));
            
            var result = await auctionInstance.methods.createUser(userId, account, data.balance, data.role).send({from: accounts[0], gas:3000000});
            console.log("result>>>>>>>>>>>>>",result)
            res.send(account)
        } catch(error) {
            throw error;
        }
    },
    loginUser: async(req, res) => {

    },

    createAuction: async(req, res) => {
        try {
            data = req.body;
            var auctionInstance = await getAuctionInstance();
            var accounts = await getAccounts();
            var auctionId = web3.utils.padRight(web3.utils.utf8ToHex(data.auctionId));
            var bidStartTimestamp = parseInt(data.bidStartTimestamp);
            var bidEndTimestamp = parseInt(data.bidEndTimestamp);
            var users = data.users;
            var propertyId = web3.utils.padRight(web3.utils.utf8ToHex(data.propertyId));

            var result = await auctionInstance.methods.createAucton(auctionId, bidStartTimestamp, bidEndTimestamp, users,propertyId ).send({from: accounts[0], gas:3000000});
            console.log("result>>>",result);
            res.send("auctionId : "+auctionId);
        } catch(error) {
            throw error;
        }
    },

    placeBid : async(req, res) => {
        try {
            data = req.body;
            var auctionId = web3.utils.padRight(web3.utils.utf8ToHex(data.auctionId));
            var bidId = web3.utils.padRight(web3.utils.utf8ToHex(data.bidId));
            var bidAmount = parseInt(data.bidAmount);
            var address = data.userAddress;

            var result = await auctionInstance.methods.placeBid(auctionId, bidId, bidAmount).send({from: address, gas:3000000});
            console.log("result>>>", result);
            res.send("bidId : "+bidId);

        } catch (error) {
            console.log(error)
        }
    },

    registerWinningBid : async(req, res) => {
        try{
            data = req.body;
            var auctionId = web3.utils.padRight(web3.utils.utf8ToHex(data.auctionId));
            var bidId = web3.utils.padRight(web3.utils.utf8ToHex(data.bidId));

            var result = await auctionInstance.methods.registerWinningBid(auctionId, bidId).send({from: address, gas:3000000});

            console.log("result>>>", result)

        }catch(error) {
            console.log("error>>>", error)
        }
    },

    getWinningBid: async(req, res) => {
        try{
            var auctionId = web3.utils.padRight(web3.utils.utf8ToHex(req.query.auctionId));
            var result = await auctionInstance.methods.getWinningBid(auctionId).call();

            console.log("result>>>", result)

            res.send(result)
            
            

        }catch(error) {
            console.log(error)
        }
    },

    getAuctionBids: async(req, res) => {
        try{
            var auctionId = web3.utils.padRight(web3.utils.utf8ToHex(req.query.auctionId));
            var result = await auctionInstance.methods.getAuctionBids(auctionId).call();

            console.log("result>>>", result)

            res.send(result)


        }catch(error) {
            console.log(error)
        }
    }
}