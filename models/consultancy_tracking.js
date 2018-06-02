'use strict';
module.exports = (sequelize, DataTypes) => {
  var Consultancy_Tracking = sequelize.define('Consultancy_Tracking', {
    TicketNumber: {
      type:DataTypes.INTEGER,
      references: {
          // This is a reference to another model
          model: 'ticketreports',

          // This is the column name of the referenced model
          key: 'id'
      }
    },
    EndingConsultancyDate: DataTypes.DATE,
    PresentConsultancyDescription: DataTypes.STRING,
    NewConsultancyDescription: DataTypes.STRING,
    ReportHolderIDType: DataTypes.STRING,
    ReportHolderID: DataTypes.STRING,
    ReportHolderCompanyName: DataTypes.STRING,
    ReportHolderLicenseNumber: DataTypes.STRING,
    ReportHolderFamilyName: DataTypes.STRING,
    ReportHolderPrivateName: DataTypes.STRING,
    DeliveryDestination: DataTypes.STRING,
    SecondAddress: DataTypes.STRING,
    Telephone: DataTypes.STRING,
    EmailAddress: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Consultancy_Tracking;
};