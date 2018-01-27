'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    customerId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    paymenMethod: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Invoice;
};