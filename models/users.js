/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.INTEGER
    },
    type: {
      type: DataTypes.INTEGER
    },
  }, {
    tableName: 'users'
  });
};
