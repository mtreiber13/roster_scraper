const cher = require('./cheerioLib')

// console.log(cher.getRawHTML('https://gofrogs.com//roster.aspx?path=baseball'))
console.log(cher.getResponseHref('https://gofrogs.com//roster.aspx?path=baseball'))

// var request = require('request');
// request(
// 	{
// 		url:'https://gofrogs.com//roster.aspx?path=baseball',
// 		headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'}

// 	}, function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });