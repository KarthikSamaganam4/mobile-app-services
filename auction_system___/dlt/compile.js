const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

module.exports = {
    compileContracts : async function() {
        const buildPath = path.resolve(__dirname, 'build');
        fs.removeSync(buildPath);

        const auctionFlowPath = path.resolve(__dirname, 'contracts', 'AuctionFlow.sol');
        console.log("auctionFlowPath>>>>", auctionFlowPath)
        const auctionFlowSource = fs.readFileSync(auctionFlowPath, 'utf8');
        var mainContract = 'AuctionFlow.sol';
        var input = {
            language: 'Solidity',
            sources: {
                'AuctionFlow.sol': {
                    content: auctionFlowSource
                }
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*']
                    }
                }
            }
        };

        console.log("auctionFlowSource>>>>", auctionFlowSource)

        var output = JSON.parse(solc.compile(JSON.stringify(input)));
        console.log("output>>>>>>", output)

        fs.ensureDirSync(buildPath);

        for(let contract in output.contracts[mainContract]) {
            const abi = output.contracts[mainContract][contract].abi;
            const bytecode = output.contracts[mainContract][contract].evm.bytecode.object;

            var contractObj = {
                "abi": abi,
                "bytecode": bytecode
            }

            fs.outputJSONSync(
                path.resolve(buildPath, contract.replace(':', '')+'.json'),
                contractObj
            );
        }
    }
}