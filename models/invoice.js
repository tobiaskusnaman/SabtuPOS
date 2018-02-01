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

  Invoice.findProduct = function (id) {
    var Product = this.sequelize.import('./product');
    // var User = this.sequelize.import('./user')
    return Invoice.findOne({
      include : [Product],
      where : {
        customerId : id
      }
    })
  }


  return Invoice;
};
