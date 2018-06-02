'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Request_Apeals', {
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
                model: 'consultancy_trackings',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
      RequestType: {
        type: Sequelize.STRING
      },
      Appeal_ID: {
        type: Sequelize.INTEGER
      },
      TicketReportPhoto: {
        type: Sequelize.STRING
      },
      IDPhoto: {
        type: Sequelize.STRING
      },
      Proofs: {
        type: Sequelize.STRING
      },
      LawyerFamilyName: {
        type: Sequelize.STRING
      },
      LawyerFirstName: {
        type: Sequelize.STRING
      },
      LawyerLicenseNumber: {
        type: Sequelize.STRING
      },
      LawyerAddress: {
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
    return queryInterface.dropTable('Request_Apeals');
  }
};