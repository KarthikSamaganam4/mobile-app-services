/**
 * Created by Ramkumar on 11/11/2016.
 */
var express = require('express');
var User = require('../models/User');
var UserService = require('../business-services/user-service');

var RegisterServiceRouter = new express.Router();
var UserService = new UserService();

RegisterServiceRouter.post('/',
    function (request, response) {
        var user = request.body;
        user.__proto__ = new User();
        UserService.addUser(user,
            function (status) {
                if (!status) {
                    throw new Error('User Service Failed Adding the Record!');
                }

                response.json(user);
            });
    });

module.exports = RegisterServiceRouter;