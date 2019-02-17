/**
 * Created by Ramkumar on 11/11/2016.
 */

var Question = require('../models/question');
var Option = require('../models/option');


function QuestionService() {
    this.options =
    [
        new Option(1, 'A', true),
        new Option(2, 'B', false),
        new Option(3, 'C', false),
        new Option(4, 'D', false),
    ];    
    this.questions =
        [
            new Question(1, 'Question 1', this.options),
            new Question(2, 'Question 2', this.options),
            new Question(3, 'Question 3', this.options),
            new Question(4, 'Question 4', this.options),
            new Question(5, 'Question 5', this.options),
            new Question(6, 'Question 6', this.options),
            new Question(7, 'Question 7', this.options),
            new Question(8, 'Question 8', this.options),
            new Question(9, 'Question 9', this.options),
            new Question(10, 'Question 10', this.options),
            new Question(11, 'Question 11', this.options),
            new Question(12, 'Question 12', this.options)
        ];
}

QuestionService.prototype.getQuestions = function (callback) {
    var validation = callback && typeof callback === 'function';
    if (validation) {
        callback(this.questions);
    }
};

module.exports = QuestionService;