/**
 * Created by Ramkumar on 11/11/2016.
 */
var express = require('express');
var User = require('../models/User');
var UserService = require('../business-services/user-service');
var QuestionService = require('../business-services/questions-service');


var UserServiceRouter = new express.Router();
var UserService = new UserService();
var QuestionService = new QuestionService();


UserServiceRouter.get('/',
    function (request, response) {
        UserService.getUsers(
            function (records) {
                response.json(records);
            });
    });


UserServiceRouter.get('/questions',
    function (request, response) {
        QuestionService.getQuestions(
            function (records) {
                response.json(records);
            });
    });

module.exports = UserServiceRouter;
