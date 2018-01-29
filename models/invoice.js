'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    customerId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    status : DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invoice;
};
