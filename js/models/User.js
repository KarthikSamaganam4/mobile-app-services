var formatterUtils = require('../utilities/object-formatter');

function User(id, userName, password, emilId, phNumber) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.emilId = emilId;
    this.phNumber = phNumber;
}

User.prototype.toString = function() {
    return formatterUtils.format(this);
};

module.exports = User;