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

module.exports = {
    registerUser: async(req, res) =>{
        try {
            var data = req.body;
            var userInstance = await contractUtil.getUserContractInstance();
            var account = await createAccount(data);
            
            var accounts = await getAccounts();
            console.log("account>>>>>",accounts)
            var result = await userInstance.methods.registerUser(data.username, account, data.role).send({from: accounts[0]});
            console.log("result>>>>>>>>>>>>>",result)
        } catch(error) {
            throw error;
        }
    },
    loginUser: async(req, res) => {

    },
    getUserRole: async(req, res) => {

    },
    getUserDetails: async(req, res) => {

    }
}