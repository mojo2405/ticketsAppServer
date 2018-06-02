'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransformTickets', {
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
      RealDriverViolationCommit: {
        type: Sequelize.STRING
      },
      RealDriverLicensePhoto: {
        type: Sequelize.STRING
      },
      RealDriverTicketPhoto: {
        type: Sequelize.STRING
      },
      IdPhoto_and_RealDriverSignature: {
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
    return queryInterface.dropTable('TransformTickets');
  }
};