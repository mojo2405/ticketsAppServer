'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
	return queryInterface.addColumn(
        'TicketReports',
        'apealReasonFreeText',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      );
  },

  down: (queryInterface, Sequelize) => {
	return  queryInterface.removeColumn('TicketReports', 'apealReasonFreeText');
  }
};
