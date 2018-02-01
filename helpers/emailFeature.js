

function sendEmail(email,pdf){
  
  var api_key = 'key-9cd46c853dd4b8b9cd3e525dd4858aab';
  var domain = 'sandboxc22ff63d8bff40e5a395e649df8bc370.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var path = require("path");
  var filepath = path.join(__dirname + `/../${pdf}`);
  
  var data = {
    from: 'sabtuPOS<postmaster@sandboxc22ff63d8bff40e5a395e649df8bc370.mailgun.org>',
    to: 'komelvin123@gmail.com',
    subject: 'Hello from the other side',
    text: 'sabtuPOS',
    attachment: filepath,
  };
  

  mailgun.messages().send(data, function (error, body) {
    console.log("error: ",error);  
    console.log("body: ",body);
    // callback('doneee')
    
  });
    
  
}

module.exports = sendEmail;
