'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transform_Report_To_Warnings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TicketNumber: {
        type: Sequelize.INTEGER,
          references: {
              // This is a reference to another model
              model: 'Consultancy_Trackings',

              // This is the column name of the referenced model
              key: 'id'
          }
      },
      RequestType: {
        type: Sequelize.STRING
      },
      TransformReportToWarningID: {
        type: Sequelize.INTEGER
      },
      Explanations: {
        type: Sequelize.STRING
      },
      UploadedDocuments: {
        type: Sequelize.STRING
      },
      ReportPhoto: {
        type: Sequelize.STRING
      },
      IdPhoto_and_signature: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transform_Report_To_Warnings');
  }
};