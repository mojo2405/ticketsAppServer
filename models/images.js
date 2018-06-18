'use strict';
module.exports = (sequelize, DataTypes) => {
	var Images = sequelize.define('images', {
		ticketId:{
			type: DataTypes.INTEGER,

			references: {
				// This is a reference to another model
				model: 'ticketreports',

				// This is the column name of the referenced model
				key: 'id'
			}
		},
		imageType: DataTypes.STRING,
		imageBase64: DataTypes.BLOB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  } , {charset: 'utf8',collate: 'utf8_unicode_ci'});
  return Images;
};