'use strict';
module.exports = (sequelize, DataTypes) => {
  var Request_For_Sentence = sequelize.define('Request_For_Sentence', {
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
    SentenceID: DataTypes.INTEGER,
    TicketReportPhoto: DataTypes.STRING,
    IDPhoto: DataTypes.STRING,
    SentenceRequestAppendix: DataTypes.STRING,
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
  return Request_For_Sentence;
};