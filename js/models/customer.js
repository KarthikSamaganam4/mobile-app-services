/**
 * Created by Ramkumar on 11/11/2016.
 */

var formatterUtils = require('../utilities/object-formatter');

function Customer(id, name, address, credit, status, remarks) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.credit = credit;
    this.status = status;
    this.remarks = remarks;
}

Customer.prototype.toString = function() {
    return formatterUtils.format(this);
};

module.exports = Customer;