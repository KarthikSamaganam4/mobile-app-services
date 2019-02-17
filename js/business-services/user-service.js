/**
 * Created by Ramkumar on 11/11/2016.
 */

var User = require('../models/User');

function UserService() {
    var remarks = 'Simple User Record';
    this.users =
        [
            new User(11, 'Northwind Traders', 'a@123', '123@gmail.com', 9999919919)
        ];
}

UserService.prototype.getUsers = function (callback) {
    var validation = callback && typeof callback === 'function';
    if (validation) {
        callback(this.users);
    }
};

UserService.prototype.addUser = function (user, callback) {
    var status = false;
    var validation = user && user instanceof User &&
        typeof callback === 'function';
    if (validation) {
        this.users.push(user);
        status = true;
        callback(status);
    }
};

module.exports = UserService;