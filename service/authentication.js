var UserRepository = require('../repository/users.js');
var bcrypt = require('bcryptjs');

var service = {
    login: function (phone, password) {
        return new Promise(function (resolve, reject) {
            UserRepository.Login(phone, password).then(users => {
                if (users == null) {
                    resolve(null);
                } else {
                    resolve(users['dataValues']);
                }

            }, error => {
                reject(error);
            });
        });
    },

};
module.exports = service;