/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('contact_us', {
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'contact_us'
  });
};
