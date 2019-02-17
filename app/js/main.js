/**
 * Created by Ramkumar on 11/11/2016.
 */

//var baseUrl = 'http://ramasuspc:9090';
var baseUrl = 'http://Lenovo-PC:9090';
var authenticateUrl = '/authenticate';
var customersUrl = '/api/customers';
var templateUrl = 'templates/customers-template.html';
var customerDetailTemplateUrl = 'templates/customer-detail-template.html';
var customers = null;
var compiledCustomersTemplate = null;

$(document).ready(function () {
    var socketUrl = baseUrl + "/";
    var socketClient = io.connect(socketUrl);

    if (socketClient) {
        console.log('Web Socket Client Connected to the Server!');

        socketClient.on('newCustomerRecord',
            function (data) {
                console.log('new customer record event received!');
                if (data) {
                    customers.push(data);

                    var markup = compiledCustomersTemplate({
                        customers: customers
                    });

                    $("#customers-result").html(markup);

                    hookDetailsLinkEvent();
                }
            });
    }

    $("#btnLogin").click(function () {
        var credentials = {
            userName: $("#txtUserName").val(),
            password: $("#txtPassword").val()
        };

        var authenticationServiceUrl = baseUrl + authenticateUrl;

        $.post(authenticationServiceUrl, credentials, function (result) {
            if (result.token) {
                window.localStorage.setItem('ttauthtoken', result.token);

                $.ajaxSetup({
                    headers: {
                        "Authorization": "Bearer " + result.token
                    }
                });

                $("#loginForm").hide();
            } else alert('Authentication Failed!');
        });
    });

    $("#btnLoad").click(function () {
        var customerServiceUrl = baseUrl + customersUrl;

        $.getJSON(customerServiceUrl, function (data) {
            if (data) {
                customers = data;

                $.get(templateUrl, function (content) {
                    compiledCustomersTemplate = _.template(content);
                    var markup = compiledCustomersTemplate({
                        customers: data
                    });

                    $("#customers-result").html(markup);

                    hookDetailsLinkEvent();
                });
            }
        });
    });
});

function hookDetailsLinkEvent() {
    $(".details-link").click(function () {
        var customerServiceUrl = baseUrl + customersUrl;
        var customerId = $(this).data('customer-id');
        var detailUrl = customerServiceUrl + '/' + customerId;

        $.getJSON(detailUrl, function (customerData) {
            $.get(customerDetailTemplateUrl, function (templateContent) {
                var compiledTemplate = _.template(templateContent);
                var markup = compiledTemplate({
                    customer: customerData
                });


                $("#customer-detail-result").html(markup);
            });
        });
    });
}