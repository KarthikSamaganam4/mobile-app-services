/**
 * Created by Ramkumar on 11/11/2016.
 */
var express = require('express');
var jwt = require('jsonwebtoken');
var UserProfileService = require('../business-services/user-profile-service');

var authenticationRouter = new express.Router();
var authenticationRoute = authenticationRouter.route('/');
var userProfileService = new UserProfileService();
var ONE_HOUR = 60 * 60;

authenticationRoute.post(
    function (request, response) {
        var HTTP_UNAUTHORIZED = 401;
        var credentials = request.body;
        console.log("credentials>>>",credentials);
        var validation = credentials && credentials.userName &&
            credentials.password;

        if (!validation)
            throw new Error("Invalid Credential Data Specified!");

        userProfileService.validate(credentials.userName, credentials.password,
            function (status) {
                if (!status) {
                    response.sendStatus(HTTP_UNAUTHORIZED).send('Authentication Failed!');
                    return;
                }

                userProfileService.getProfile(credentials.userName,
                    function (profile) {
                        if (!profile)
                            throw new Error("Invalid User Name Specified for Profile!");

                        var signature = jwt.sign(profile, globalSecretKey, {
                            expiresIn: ONE_HOUR
                        });

                        response.json({
                            token: signature
                        });
                    });
            });
    });
    

module.exports = authenticationRouter;