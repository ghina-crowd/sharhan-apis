var models = require('../models/models.js');
var bcrypt = require('bcryptjs');
var commonRepository = require('./common.js');


var UserRepository = {
    Login: function (email, password) {

        return new Promise(function (resolve, reject) {
            models.User.findOne({
                where: { email: email },
            }).then(users => {
                if (users) {
                    var passwordIsValid = bcrypt.compareSync(password, users.password);
                    console.log(passwordIsValid);
                    if (!passwordIsValid) {
                        resolve(null)
                    } else {
                        var isDeleted = delete users.dataValues['password'];
                        if (isDeleted) {
                            resolve(users)
                        } else {
                            resolve(null)
                        }
                    }
                } else {
                    resolve(null);
                }
            }, error => {
                reject(error);
            });
        });
    },


};
Object.assign(UserRepository, commonRepository);
module.exports = UserRepository;

