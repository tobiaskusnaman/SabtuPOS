'use strict';
module.exports = (sequelize, DataTypes) => {
  var PurchaseOrder = sequelize.define('PurchaseOrder', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return PurchaseOrder;
};