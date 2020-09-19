var companysRepository = require('../repository/company');


module.exports = {
    get: function (company_id, user_id) {
        return new Promise(function (resolve, reject) {
            companysRepository.get(company_id, user_id).then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },
    filters: function (filters) {
        return new Promise(function (resolve, reject) {
            companysRepository.filters(filters).then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },

    filtersAdmin: function (filters) {
        return new Promise(function (resolve, reject) {
            companysRepository.filtersAdmin(filters).then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },


    update: function (newcompanyData) {
        return new Promise(function (resolve, reject) {
            companysRepository.update(newcompanyData).then(user => {
                resolve(user);
            }, error => {
                reject(error);
            });
        });
    },


    create: function (newcompanyData) {
        return new Promise(function (resolve, reject) {
            companysRepository.create(newcompanyData).then(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    },
    delete: function (company_id) {
        return new Promise(function (resolve, reject) {
            companysRepository.delete(company_id).then(delete_response => {
                resolve(delete_response);
            }, error => {
                reject(error);
            });
        });
    }
};