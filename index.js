/**
 * Created by Ramkumar on 11/11/2016.
 */

var os = require('os');
var util = require('util');
var express = require('express');
var expressjwt = require('express-jwt');
var bodyparser = require('body-parser');
var corsUtils = require('./js/utilities/cors-settings');
var authorizationUtils = require('./js/utilities/unauthorization-handlers');

var customerRouter = require('./js/routing/customer-service-routing');
var userServiceRouter = require('./js/routing/user-service-routing');

var registerServiceRouter = require('./js/routing/regiser-service-routing');

var authenticationRouter = require('./js/routing/authentication-service-routing');

var hostName = os.hostname();
var portNumber = process.env.PORT_NUMBER || 9090;
var app = new express();

globalSecretKey = 'Tecnotree Convergence, Bangalore';

app.use(corsUtils.applyCORSSettings);
app.use(authorizationUtils.handleUnauthorization);

app.use('/api/customers', expressjwt({
    secret: globalSecretKey
}));


app.use('/api/users', expressjwt({
    secret: globalSecretKey
}));


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

console.log("userServiceRouter,"+userServiceRouter)

app.use('/api/customers', customerRouter);
app.use('/api/users', userServiceRouter);
app.use('/api/register', registerServiceRouter);

app.use('/authenticate', authenticationRouter);

var webFolder = __dirname + '/app';
app.use('/', express.static(webFolder));

app.listen(portNumber);

var message = util.format(
    'REST Service is Ready at http://%s:%d/api/users', hostName, portNumber);

console.log(message);