'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vehicle = sequelize.define('Vehicle', {
    number: DataTypes.STRING,
    type: DataTypes.STRING,
    color: DataTypes.STRING,
    model: DataTypes.STRING,
    driver: {
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: 'drivers',

            // This is the column name of the referenced model
            key: 'id'
        }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Vehicle;
};