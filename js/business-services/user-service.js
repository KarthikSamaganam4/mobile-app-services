/**
 * Created by Ramkumar on 11/11/2016.
 */

var User = require('../models/User');
var users =
    [
        new User(11, 'Northwind Traders', 'a@123', '123@gmail.com', 9999919919)
    ];
function UserService() {
    var remarks = 'Simple User Record';
}

UserService.prototype.getUsers = function (callback) {
    var validation = callback && typeof callback === 'function';
    if (validation) {
        callback(users);
    }
};

UserService.prototype.addUser = function (user, callback) {
    var status = false;
    var validation = user && user instanceof User &&
        typeof callback === 'function';
    if (validation) {
        users.push(user);
        status = true;
        callback(status);
    }
};

UserService.prototype.validate = function (userName, password, callback) {
    var status = false;
    var validation = userName && password &&
        typeof callback === 'function';
    if (validation) {
        this.getProfile(userName,
            function (profile) {
                if (profile.userName === userName && profile.password === password) {
                    status = true;
                }
                callback(status);
            });
    }
};

UserService.prototype.getProfile = function (userName, callback) {
    var validation = userName && typeof callback === 'function';
    if (validation) {
        for (var index in users) {
            var profile = users[index];
            if (profile.userName === userName) {
                callback(profile);
                break;
            }
        }
    }
};
module.exports = UserService;
