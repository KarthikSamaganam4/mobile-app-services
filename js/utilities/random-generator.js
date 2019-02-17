/**
 * Created by Ramkumar on 11/11/2016.
 */

var MIN_VALUE = 1;
var MAX_VALUE = 1000000;

function generateRandom(minValue, maxValue) {
    minValue = minValue || MIN_VALUE;
    maxValue = maxValue || MAX_VALUE;

    return Math.floor(Math.random() * (maxValue - minValue ) + minValue);
}

module.exports = {
    generateRandom: generateRandom
};