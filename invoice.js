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

  // That's it! Do whatever you want now.
  // Pipe it to a file for instance:

  const fs = require('fs')

  document.generate() // triggers rendering
  document.pdfkitDoc.pipe(fs.createWriteStream('receipt.pdf'))
}

module.exports = {getInvoice};

// let dataItem =
//
// {
// "id": 77,
// "customerId": 172,
// "totalPrice": 16500,
// "paymentMethod": "cash",
// "status": true,
// "createdAt": "2018-02-01T08:05:10.034Z",
// "updatedAt": "2018-02-01T08:07:24.596Z",
// "Products": [
// {
// "id": 6,
// "name": "Fanta Kaleng Biru 330ml",
// "stock": 1161,
// "price": 8500,
// "description": "Rasa bluberry",
// "imgSource": "https://www.bizzy.co.id/media/catalog/product/cache/image/700x560/e9c3970ab036de70892d86c6d221abfe/C/O/CONF-xiBUEz7EEiXl7hWeelyL.jpg",
// "createdAt": "2018-01-27T05:19:27.960Z",
// "updatedAt": "2018-02-01T08:07:24.333Z",
// "InvoiceDetail": {
// "ProductId": 6,
// "InvoiceId": 77,
// "quantity": 1,
// "createdAt": "2018-02-01T08:07:11.892Z",
// "updatedAt": "2018-02-01T08:07:11.892Z"
// }
// },
// {
// "id": 4,
// "name": "Fanta Kaleng Orange 330ml",
// "stock": 25,
// "price": 8000,
// "description": "Rasa jeruk",
// "imgSource": "http://clipground.com/images/fanta-clipart-8.jpg",
// "createdAt": "2018-01-27T05:19:27.960Z",
// "updatedAt": "2018-02-01T08:07:24.334Z",
// "InvoiceDetail": {
// "ProductId": 4,
// "InvoiceId": 77,
// "quantity": 1,
// "createdAt": "2018-02-01T08:07:15.764Z",
// "updatedAt": "2018-02-01T08:07:15.764Z"
// }
// }
// ]
// }
//
// let dataUser =
//    { id: 172,
//      firstName: null,
//      lastName: null,
//      email: 'tobiaskusnaman@gmail.com',
//      password: null,
//      type: 'Customer',
//      isMember: false,
//      createdAt: "2018-02-01T08:07:24.067Z",
//      updatedAt: "2018-02-01T08:07:24.067Z "}
//
// // console.log(getEmail(dataUser));
// // console.log(getItem(dataItem));
// getInvoice(dataUser,dataItem)
