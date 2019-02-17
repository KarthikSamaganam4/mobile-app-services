/**
 * Created by Ramkumar on 11/11/2016.
 */
var express = require('express');
var Customer = require('../models/customer');
var CustomerService = require('../business-services/customer-service');

var customerServiceRouter = new express.Router();
var customerService = new CustomerService();
var customerServiceRoute = customerServiceRouter.route('/:customerId');

customerServiceRouter.get('/',
    function (request, response) {
        customerService.getCustomers(
            function (records) {
                response.json(records);
            });
    });

customerServiceRoute.get(
    function (request, response) {
        var customerId = request.params.customerId;

        if (!customerId) {
            throw new Error("Invalid Customer Id Specified!");
        }

        if (customerId) {
            customerService.getCustomer(parseInt(customerId),
                function (record) {
                    if(!record) {
                        response.sendStatus(404);
                        return;
                    }

                    response.json(record);
                });
        }
    });

customerServiceRoute.post(
    function (request, response) {
        var customer = request.body;

        customer.__proto__ = new Customer();

        customerService.addCustomer(customer,
            function (status) {
                if (!status) {
                    throw new Error('Customer Service Failed Adding the Record!');
                }

                response.json(customer);
            });
    });

customerServiceRoute.put(
    function (request, response) {
        var customerId = request.params.customerId;
        var customer = request.body;
        var validation = customerId && customer;

        if (!validation) {
            throw new Error('Invalid Customer Id Specified for Update!');
        }

        customer.__proto__ = new Customer();

        customerService.updateCustomer(customer,
            function (status) {
                if (!status) {
                    throw new Error("Customer Service Failed updating the Record!");
                }

                response.json(customer);
            });
    });

customerServiceRoute.delete(
    function (request, response) {
        var customerId = request.params.customerId;

        if (!customerId) {
            throw new Error("Invalid Customer Id Specified!");
        }

        customerService.deleteCustomer(parseInt(customerId),
            function (status) {
                if (!status) {
                    throw new Error("Customer Service Failed to Remove the Record!");
                }

                response.json({
                    status: status
                });
            });
    });

module.exports = customerServiceRouter;