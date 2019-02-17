/**
 * Created by Ramkumar on 11/11/2016.
 */

function applyCORSSettings(request, response, next) {
    if (response) {
        response.header('Access-Control-Allow-Credentials', 'true');
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }

    next();
}

module.exports = {
    applyCORSSettings: applyCORSSettings
};