'use strict';
module.exports = (sequelize, DataTypes) => {
  var Request_Apeal = sequelize.define('Request_Apeal', {
    TicketNumber: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: 'consultancy_trackings',

            // This is the column name of the referenced model
            key: 'id'
        }
    },
    RequestType: DataTypes.STRING,
    Appeal_ID: DataTypes.INTEGER,
    TicketReportPhoto: DataTypes.STRING,
    IDPhoto: DataTypes.STRING,
    Proofs: DataTypes.STRING,
    LawyerFamilyName: DataTypes.STRING,
    LawyerFirstName: DataTypes.STRING,
    LawyerLicenseNumber: DataTypes.STRING,
    LawyerAddress: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Request_Apeal;
};