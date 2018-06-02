'use strict';
module.exports = (sequelize, DataTypes) => {
  var TicketReport = sequelize.define('TicketReport', {
    driverUserId:{
        type: DataTypes.INTEGER,

        references: {
            // This is a reference to another model
            model: 'drivers',

            // This is the column name of the referenced model
            key: 'id'
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            // This is a reference to another model
            model: 'users',

            // This is the column name of the referenced model
            key: 'id'
        }
    },
      DriverRequest: DataTypes.STRING,
      OfficeStatus: DataTypes.STRING,
    DriverName: DataTypes.STRING,
    PenaltyNumber: DataTypes.STRING,
    PrintingDate: DataTypes.STRING,
    IdPassportNumber: DataTypes.STRING,
    IdPassportType: DataTypes.STRING,
    LicenseType: DataTypes.STRING,
    LicenseNumber: DataTypes.STRING,
    City: DataTypes.STRING,
    Street: DataTypes.STRING,
    HouseNumber: DataTypes.STRING,
    ZipCode: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    PenaltyDate: DataTypes.STRING,
    DayNumber: DataTypes.STRING,
    PenaltyLocation: DataTypes.STRING,
    PenaltyDescription: DataTypes.STRING,
    PenaltyNotes: DataTypes.STRING,
    DriverNotes: DataTypes.STRING,
    PlateType: DataTypes.STRING,
    VehiclePlateNumber: DataTypes.STRING,
    VehicleType: DataTypes.STRING,
    VehicleColor: DataTypes.STRING,
    VehicleModel: DataTypes.STRING,
    BMSymbol: DataTypes.STRING,
    SeifTakana: DataTypes.STRING,
    SemelAvera: DataTypes.STRING,
    PenaltyPoints: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TicketReport;
};