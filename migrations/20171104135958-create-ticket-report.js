'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TicketReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        driverUserID: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'Drivers',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                // This is a reference to another model
                model: 'Users',

                // This is the column name of the referenced model
                key: 'id'
            }
        },
        DriverRequest: {
          type: Sequelize.STRING
        },
        OfficeStatus: {
            type: Sequelize.STRING
        },
        DriverName: {
            type: Sequelize.STRING
        },
      PenaltyNumber: {
        type: Sequelize.STRING
      },
      PrintingDate: {
        type: Sequelize.STRING
      },
      IdPassportNumber: {
        type: Sequelize.STRING
      },
      IdPassportType: {
        type: Sequelize.STRING
      },
      LicenseType: {
        type: Sequelize.STRING
      },
      LicenseNumber: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      Street: {
        type: Sequelize.STRING
      },
      HouseNumber: {
        type: Sequelize.STRING
      },
      ZipCode: {
        type: Sequelize.STRING
      },
      PhoneNumber: {
        type: Sequelize.STRING
      },
      PenaltyDate: {
        type: Sequelize.STRING
      },
      DayNumber: {
        type: Sequelize.STRING
      },
      PenaltyLocation: {
        type: Sequelize.STRING
      },
      PenaltyDescription: {
        type: Sequelize.STRING
      },
      PenaltyNotes: {
        type: Sequelize.STRING
      },
      DriverNotes: {
        type: Sequelize.STRING
      },
      PlateType: {
        type: Sequelize.STRING
      },
      VehiclePlateNumber: {
        type: Sequelize.STRING
      },
      VehicleType: {
        type: Sequelize.STRING
      },
      VehicleColor: {
        type: Sequelize.STRING
      },
      VehicleModel: {
        type: Sequelize.STRING
      },
      BMSymbol: {
        type: Sequelize.STRING
      },
      SeifTakana: {
        type: Sequelize.STRING
      },
      SemelAvera: {
        type: Sequelize.STRING
      },
      PenaltyPoints: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('TicketReports');
  }
};