'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transform_Report_To_Warning = sequelize.define('Transform_Report_To_Warning', {
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
    TransformReportToWarningID: DataTypes.INTEGER,
    Explanations: DataTypes.STRING,
    UploadedDocuments: DataTypes.STRING,
    ReportPhoto: DataTypes.STRING,
    IdPhoto_and_signature: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Transform_Report_To_Warning;
};