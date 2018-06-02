'use strict';
module.exports = (sequelize, DataTypes) => {
  var TransformTicket = sequelize.define('TransformTicket', {
    TicketNumber: {
        type : DataTypes.INTEGER,
          references: {
              // This is a reference to another model
              model: 'consultancy_trackings',

              // This is the column name of the referenced model
              key: 'id'
          }
      },
    RequestType: DataTypes.STRING,
    RealDriverViolationCommit: DataTypes.STRING,
    RealDriverLicensePhoto: DataTypes.STRING,
    RealDriverTicketPhoto: DataTypes.STRING,
    IdPhoto_and_RealDriverSignature: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TransformTicket;
};