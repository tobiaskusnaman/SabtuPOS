const pdfInvoice = require('pdf-invoice-tobi')

const document = pdfInvoice({
  company: {
    phone: '(99) 9 9999-9999',
    email: 'company@evilcorp.com',
    address: 'Av. Companhia, 182, Água Branca, Piauí',
    name: 'Tobi&co',
  },
  customer: {
    name: 'Tobias kusnaman',
    email: 'raque@gmail.com',
  },
  items: [
    {amount: 120000, name: 'XYZ', description: 'Lorem ipsum dollor sit amet', quantity: 12},
    {amount: 21300, name: 'ABC', description: 'Lorem ipsum dollor sit amet', quantity: 12},
    {amount: 100000000000000, name: 'DFE', description: 'Lorem ipsum dollor sit amet', quantity: 12},
  ],
})

// That's it! Do whatever you want now.
// Pipe it to a file for instance:

const fs = require('fs')

document.generate() // triggers rendering
document.pdfkitDoc.pipe(fs.createWriteStream('receipt.pdf'))
