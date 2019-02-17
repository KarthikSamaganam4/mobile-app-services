var formatterUtils = require('../utilities/object-formatter');

function Question(qId, question, options) {
    this.qId = qId;
    this.question = question;
    this.options = options;
}

Question.prototype.toString = function() {
    return formatterUtils.format(this);
};

module.exports = Question;