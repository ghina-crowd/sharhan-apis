var PartnersRepository = require('../repository/Partner');


module.exports = {
    getAll: function () {
        return new Promise(function (resolve, reject) {
            PartnersRepository.getAllPartners().then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },
    getAllAdmin: function () {
        return new Promise(function (resolve, reject) {
            PartnersRepository.getAllPartnersAdmin().then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },
    create: function (newPartnerData) {
        return new Promise(function (resolve, reject) {
            PartnersRepository.createPartner(newPartnerData).then(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    },
    update: function (credentials) {
        return new Promise(function (resolve, reject) {
            PartnersRepository.update(credentials).then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },
    Delete: function (partner_id) {
        return new Promise(function (resolve, reject) {
            PartnersRepository.deletePartner(partner_id).then(delete_response => {
                resolve(delete_response);
            }, error => {
                reject(error);
            });
        });
    }
};