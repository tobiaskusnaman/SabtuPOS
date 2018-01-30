'use strict';
module.exports = (sequelize, DataTypes) => {
  var InvoiceDetail = sequelize.define('InvoiceDetail', {
    ProductId: DataTypes.INTEGER,
    InvoiceId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  InvoiceDetail.associate = function (models) {
    InvoiceDetail.belongsTo(models.Product);
    InvoiceDetail.belongsTo(models.Invoice)
  };


  InvoiceDetail.prototype.totalPrice = function (price, quantity) {
    return price*quantity
  }

  return InvoiceDetail;
};
