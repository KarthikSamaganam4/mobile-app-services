/**
 * Created by Ramkumar on 11/11/2016.
 */

var UserProfile = require('../models/user-profile');

function UserProfileService() {
    this.userProfiles =
        [
            new UserProfile('trguser11', 'admin@123', 'trguser11@tt.com', 'national'),
            new UserProfile('trguser12', 'admin@123', 'trguser12@tt.com', 'national'),
            new UserProfile('trguser13', 'admin@123', 'trguser13@tt.com', 'regional'),
            new UserProfile('trguser14', 'admin@123', 'trguser14@tt.com', 'national'),
            new UserProfile('trguser15', 'admin@123', 'trguser15@tt.com', 'regional'),
            new UserProfile('trguser16', 'admin@123', 'trguser16@tt.com', 'national'),
            new UserProfile('trguser17', 'admin@123', 'trguser17@tt.com', 'international')
        ];
}

UserProfileService.prototype.validate = function (userName, password, callback) {
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

UserProfileService.prototype.getProfile = function (userName, callback) {
    var validation = userName && typeof callback === 'function';

    if (validation) {
        for (var index in this.userProfiles) {
            var profile = this.userProfiles[index];

            if (profile.userName === userName) {
                callback(profile);

                break;
            }
        }
    }
};

module.exports = UserProfileService;