/**
 * Created by Ramkumar on 11/11/2016.
 */

var Customer = require('../models/customer');

function CustomerService() {
    var remarks = 'Simple Customer Record';

    this.customers =
        [
            new Customer(11, 'Northwind Traders', 'Bangalore', 12000, true, remarks),
            new Customer(12, 'Southwind Traders', 'Bangalore', 12000, true, remarks),
            new Customer(13, 'Eastwind Traders', 'Bangalore', 12000, true, remarks),
            new Customer(14, 'Westwind Traders', 'Bellary', 82000, false, remarks),
            new Customer(15, 'Oxyrich Traders', 'Mysore', 92000, false, remarks),
            new Customer(16, 'Adventureworks', 'Mysore', 12000, true, remarks),
            new Customer(17, 'Footmart', 'Mangalore', 22000, false, remarks),
            new Customer(18, 'ePublishers', 'Mangalore', 32000, true, remarks)
        ];
}

CustomerService.prototype.getCustomers = function (callback) {
    var validation = callback && typeof callback === 'function';

    if (validation) {
        callback(this.customers);
    }
};

CustomerService.prototype.getCustomer = function (id, callback) {
    var validation = id && typeof callback === 'function';
    var filteredCustomer = null;

    if (validation) {
        for (var index in this.customers) {
            var customer = this.customers[index];

            if (customer.id === id) {
                filteredCustomer = customer;
                break;
            }
        }

        callback(filteredCustomer);

    }
};

CustomerService.prototype.getIndex = function (id, callback) {
    var validation = id && typeof callback === 'function';

    if (validation) {
        for (var index in this.customers) {
            var customer = this.customers[index];

            if (customer.id === id) {
                callback(index);
                break;
            }
        }
    }
};

CustomerService.prototype.addCustomer = function (customer, callback) {
    var status = false;
    var validation = customer && customer instanceof Customer &&
        typeof callback === 'function';

    if (validation) {
        this.customers.push(customer);

        status = true;

        callback(status);
    }
};

CustomerService.prototype.updateCustomer = function (customer, callback) {
    var status = false;
    var validation = customer && customer instanceof Customer &&
        typeof callback === 'function';

    if (validation) {
        this.getCustomer(customer.id,
            function (record) {
                if (record) {
                    record.name = customer.name;
                    record.address = customer.address;
                    record.credit = customer.credit;
                    record.status = customer.status;
                    record.remarks = customer.remarks;

                    status = true;

                    callback(status);
                }
            });
    }
};

CustomerService.prototype.deleteCustomer = function (id, callback) {
    var self = this;
    var status = false;
    var validation = id && typeof callback === 'function';

    if (validation) {
        this.getIndex(id,
            function (index) {
                self.customers.splice(index, 1);

                status = true;

                callback(status);
            });
    }
};

module.exports = CustomerService;