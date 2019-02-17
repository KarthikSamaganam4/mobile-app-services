var formatterUtils = require('../utilities/object-formatter');

function Option(opId, option, isAns) {
    this.opId = opId;
    this.option = option;
    this.isAns = isAns;
}

Option.prototype.toString = function() {
    return formatterUtils.format(this);
};

module.exports = Option;