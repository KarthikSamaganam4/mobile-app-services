/**
 * Created by Ramkumar on 11/11/2016.
 */

var HTTP_UNAUTHORIZED = 401;

function handleUnauthorization(error, request, response, next) {
    var isAuthorizedError = error && error.constructor.name === 'UnauthorizedError';

    if (isAuthorizedError) {
        response.sendStatus(HTTP_UNAUTHORIZED).send('Authorization Failed!');
        return;
    }

    next();
}

module.exports = {
    handleUnauthorization: handleUnauthorization
};