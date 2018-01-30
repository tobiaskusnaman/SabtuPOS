'use strict';
module.exports = (sequelize, DataTypes) => {
  var Invoice = sequelize.define('Invoice', {
    customerId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    status : DataTypes.BOOLEAN
  });

  Invoice.associate = function (models) {
    Invoice.hasMany(models.InvoiceDetail)
    Invoice.belongsToMany(models.Product, {through: 'InvoiceDetail'});
  };



  return Invoice;
};
