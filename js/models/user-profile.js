/**
 * Created by Ramkumar on 11/11/2016.
 */

var formatterUtils = require('../utilities/object-formatter');

function UserProfile(userName, password, email, type) {
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.type = type;
}

UserProfile.prototype.toString = function () {
    return formatterUtils.toString(this);
};

module.exports = UserProfile;