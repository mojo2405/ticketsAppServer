'use strict';
module.exports = (sequelize, DataTypes) => {
  var Leads = sequelize.define('Leads', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Leads;
};