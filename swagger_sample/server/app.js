/**
 * Main application file
 */
'use strict';
var location_env = require('./config/local.env.js');
if (typeof process.env.EXECUTE_TEST_CASE === "undefined" || process.env.EXECUTE_TEST_CASE === "false" || process.env.EXECUTE_TEST_CASE === false) {
  process.env.CLIENT_ID = location_env.CLIENT_ID || 'default';
}
process.env.NODE_ENV = location_env.NODE_ENV || 'development';
process.env.PORT = location_env.PORT || '9000';
var clientIds = ["default", "CI", "CII", "CIII", "CIV", "CV", "CVI"]
if (clientIds.indexOf(process.env.CLIENT_ID) < 0) {
  process.exit();
}
var express = require('express');
var config = require('./config/environment');
var path = require('path');
var appRoot = path.join(require('app-root-dir').get(), '/server/');

var apiEndPoints = require('./api/common/config/settings-api-endpoints.js');


if (apiEndPoints.COMMON_CONFIGURATION.CLM.indexOf(process.env.CLIENT_ID) >= 0) {
  process.env.EXTERNAL_SYSTEM = "clm";
} else if (apiEndPoints.COMMON_CONFIGURATION.STANDALONE.indexOf(process.env.CLIENT_ID) >= 0) {
  process.env.EXTERNAL_SYSTEM = "cbs";
} else {
  process.env.EXTERNAL_SYSTEM = "clm";
}
var features = require('./api/common/config/configurable-features-' + process.env.CLIENT_ID + '.js')
var app = express();

var apiv = require('api-version');
process.api1 = apiv.version(app, '/service-mgmt', 'dv1');
process.api2 = apiv.version(app, '/service-mgmt', 'v2');
process.api3 = apiv.version(app, '/service-mgmt', 'v3');



var server = require('http').createServer(app);
require('./config/express')(app);
var fs = require('graceful-fs');
var path = require('path');
var appRoot1 = path.join(require('app-root-dir').get());
var logDirectory = appRoot1 + '/log'
if (fs.existsSync(logDirectory) === true) {} else {
  fs.mkdirSync(logDirectory);
}

const opts = {
  logDirectory: logDirectory, // NOTE: folder must exist and be writable...
  fileNamePattern: 'third-party-<DATE>.log',
  dateFormat: 'YYYY-MM-DD',
  writer: console.log
};
const thirdPartylog = require('simple-node-logger').createRollingFileLogger(opts);
thirdPartylog.setLevel('all');

//set up log4js
process.getLogger = require('./log4js.js');
process.logger = thirdPartylog;
process.errorHandler = require(path.join(appRoot, '/utils/errorhandler.js'));

var routes = require('./routes')(app);


server.listen(config.port, config.ip, function() {
   console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
