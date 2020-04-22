'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
	return queryInterface.addColumn(
        'TicketReports',
        'lastcomment',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      );
  },

  down: (queryInterface, Sequelize) => {
	return  queryInterface.removeColumn('TicketReports', 'lastcomment')
    ;
  }
};
