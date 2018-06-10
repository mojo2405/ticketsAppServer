'use strict';
module.exports = (sequelize, DataTypes) => {
  var driver = sequelize.define('Driver', {
    userId: {
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: 'User',

            // This is the column name of the referenced model
            key: 'id'
        }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    drivingLicenseNumber: DataTypes.STRING,
    idNumber: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return driver;
};