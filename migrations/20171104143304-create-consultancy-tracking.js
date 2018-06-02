'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Consultancy_Trackings', {
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
              model: 'ticketreports',

              // This is the column name of the referenced model
              key: 'id'
          }
      },
      EndingConsultancyDate: {
        type: Sequelize.DATE
      },
      PresentConsultancyDescription: {
        type: Sequelize.STRING
      },
      NewConsultancyDescription: {
        type: Sequelize.STRING
      },
      ReportHolderIDType: {
        type: Sequelize.STRING
      },
      ReportHolderID: {
        type: Sequelize.STRING
      },
      ReportHolderCompanyName: {
        type: Sequelize.STRING
      },
      ReportHolderLicenseNumber: {
        type: Sequelize.STRING
      },
      ReportHolderFamilyName: {
        type: Sequelize.STRING
      },
      ReportHolderPrivateName: {
        type: Sequelize.STRING
      },
      DeliveryDestination: {
        type: Sequelize.STRING
      },
      SecondAddress: {
        type: Sequelize.STRING
      },
      Telephone: {
        type: Sequelize.STRING
      },
      EmailAddress: {
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
    return queryInterface.dropTable('Consultancy_Trackings');
  }
};