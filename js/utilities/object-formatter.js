/**
 * Created by Ramkumar on 11/11/2016.
 */

function toString(obj) {
    if (obj) {
        var message = '';

        for (var property in obj) {
            var propValue = obj[property];

            if (typeof propValue !== 'function') {
                message += propValue + ', ';
            }
        }

        return message;
    }
}

module.exports = {
    toString: toString
};