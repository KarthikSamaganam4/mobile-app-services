const fs = require('fs');
const updateJsonFile = require('update-json-file')
const Web3 = require('./createWeb3');
const web3 = Web3.getWeb3Instance();

var fileName = './config.json';
const config = require(fileName);

var userContact;
var auctionFlow;

function getContractInstance(contractObj) {
    return new web3.eth.Contract(contractObj.abi);
}

async function getAccounts() {
    const accounts = await web3.eth.getAccounts();
    return accounts;
} 

async function deployContract(contractObj) {
    var accounts = await getAccounts();
    var from = accounts[0];

    const contractDeployParams = {
        data: contractObj.bytecode,
        arguments: [from]
    };

    var contractInstance = await getContractInstance(contractObj);

    try{
        const contractRes = await contractInstance.deploy(contractDeployParams).send({
            from: from,
            gas: 4000000
        });

        config[contractObj.name] = contractRes.options.address;

        fs.writeFileSync(fileName, JSON.stringify(config));

        // updateJsonFile(fileName, (data) => {
        //     data[contractObj.name] = contractRes.options.address;
        //     return data
        //   });

          console.log(contractObj.name+":", contractRes.options.address)


        // .on('confirmation', function(confirmationNumber, receipt){  })
        // .then(function(newContractInstance){
        //     config[contractObj.name] = newContractInstance.options.address;
        //     //fs.writeFileSync(fileName, JSON.stringify(config));



        //     // fs.writeFile(fileName, JSON.stringify(config), function (err) {
        //     //     if (err) return console.log(err);
        //     //     console.log(JSON.stringify(config));
        //     //     console.log('writing to ' + fileName);
        //     //   });


            

            
        //     console.log(config) // instance with the new contract address
        // });;
        //console.log("contractRes>>>>", contractRes)
        return config;
    } catch(error){
        throw error;
    }
}


module.exports = {
    deployContracts : async function() {
        userContact = require('./build/User.json');
        auctionFlow = require('./build/AuctionFlow.json');

        userContact.name = "UserContract";
        auctionFlow.name = "AuctionFlowContract";

        deployContract(userContact)
        deployContract(auctionFlow)
    }
}