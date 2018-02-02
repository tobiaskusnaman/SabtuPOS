function getEmail(user){
  return user.email
}

function getItem(item){
  let result = []
  item.Products.forEach(product => {
    let obj = {}
    obj.amount = product.price,
    obj.name = product.name,
    obj.description = product.description,
    obj.quantity = product.InvoiceDetail.quantity
    result.push(obj)
  })
  return result
}

function getInvoice(dataUser,dataItem){
  const pdfInvoice = require('pdf-invoice-tobi')

  const document = pdfInvoice({
    company: {
      phone: '(+62) 89 665-559-2099',
      email: 'wrapItSocks@gmail.com',
      address: 'Sultan Tirtayasa 43 Bandung',
      name: 'WrapItSocks',
    },
    customer: {
      name: 'Customer',
      email: getEmail(dataUser),
    },
    items: getItem(dataItem),
  })

  const fs = require('fs')

  document.generate() // triggers rendering
  document.pdfkitDoc.pipe(fs.createWriteStream('receipt.pdf'))
}

module.exports = {getInvoice};
