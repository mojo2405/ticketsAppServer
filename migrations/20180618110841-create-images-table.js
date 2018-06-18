'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        ticketId: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'TicketReports',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
		imageType: {
          type: Sequelize.STRING
        },
		imageBase64: {
          type: Sequelize.BLOB
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
    return queryInterface.dropTable('images');
  }
};
