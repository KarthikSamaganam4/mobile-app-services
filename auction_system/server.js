var express  = require('express');
var app      = express(); 
var bodyParser = require('body-parser');

var compileObj = require('./dlt/compile');
var deployObj = require('./dlt/deploy');


//var userHandler = require('./routes/user');
var auctionHandler = require('./routes/auctionFlow');

app.use(bodyParser.json({ type: 'application/json' }));


app.post('/registerUser', auctionHandler.registerUser);
app.post('/loginUser', auctionHandler.loginUser);

app.post('/createAuction', auctionHandler.createAuction);
app.post('/registerWinningBid', auctionHandler.registerWinningBid);
app.post('/getWinningBid', auctionHandler.getWinningBid);
app.post('/getAuctionBids', auctionHandler.getAuctionBids);


// function initializeData(){
//     initialzeRouteHandler.initializeData();
// }

// initializeData();

// app.get('/initializeManufacturerToDistributorContract', manufacturerToDistributorHandler.initializeContract);
// app.get('/getDistributorAddress', initialzeRouteHandler.getDistributorAddress);
// app.post('/submitManufacturerToDistributorProduct', manufacturerToDistributorHandler.submitManufacturerToDistributorProduct);

// app.get('/initializedistributorToRetailerContract', distributorToRetailerHandler.initializeContract);
// app.get('/getRetailerAddresses', initialzeRouteHandler.getRetailerAddresses);
// app.post('/submitDistributorToRetailerProduct', distributorToRetailerHandler.submitDistributorToRetailerProduct);

// app.get('/initializeConsumerContract', consumerHandler.initializeContract);
// app.get('/getProductInformation', consumerHandler.getProductsInformation);
app.listen(3000, async function(){
    
    //await compileObj.compileContracts();
    await deployObj.deployContracts();
    console.log("Application is listening on port 3000");
});

