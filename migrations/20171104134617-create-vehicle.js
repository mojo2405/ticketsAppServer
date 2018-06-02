'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.INTEGER,

            references: {
                // This is a reference to another model
                model: 'drivers',

                // This is the column name of the referenced model
                key: 'id'
            }
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
    return queryInterface.dropTable('Vehicles');
  }
};