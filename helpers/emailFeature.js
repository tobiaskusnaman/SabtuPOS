

function sendEmail(email,pdf){

  var api_key = 'key-9cd46c853dd4b8b9cd3e525dd4858aab';
  var domain = 'sandboxc22ff63d8bff40e5a395e649df8bc370.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  var path = require("path");
  var filepath = path.join(__dirname + `/../${pdf}`);

  var data = {
    from: 'sabtuPOS<postmaster@sandboxc22ff63d8bff40e5a395e649df8bc370.mailgun.org>',
    to: email,
    subject: 'WrapItSocks Invoice',
    text: `I WRAP IT LIKE THAT!
    FUN FACT #1:
Bamboo is Anti-Bacterial – Bamboo contains a characteristic bio-operators known as Bamboo Kun which is actually hostile to bacterial. It is very effective to the point that it wipes out and averts more than 70% of microorganisms that tries to grow on it, whether this be in its natural or fabric form.
Curious?

FUN FACT #2:
Bamboo Fiber is Thermal Regulating - The insulating characteristics of bamboo fiber is outstanding at keeping the body temperature. It cools the body down when it's hot and warm the body up when it's cold.

FUN FACT #3:
Bamboo Fiber is Breathable and Absorbent – A marvelous feature of bamboo fiber is that it is great at retaining dampness, keeping the skin cool and dry. Even when wet, it doesn't stick to the skin - providing incredible breathability.
Amazing, ryt?`,
    attachment: filepath,
  };


  mailgun.messages().send(data, function (error, body) {
    console.log("error: ",error);
    console.log("body: ",body);
  });


}

module.exports = sendEmail;
