'use strict';
module.exports = (sequelize, DataTypes) => {
  var InvoiceDetail = sequelize.define('InvoiceDetail', {
    productId: DataTypes.INTEGER,
    invoiceId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return InvoiceDetail;
};
