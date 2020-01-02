// cheerioJS library for scraping use
const cheerio = require("cheerio")
var request = require('request');

var delayInMilliseconds = 3000; //1 second


function getRawHTML(url) {
	return new Promise((resolve, reject) => {
		return request(
			{
				url:url,
				headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'}
			}, function (error, response, body) {
	  		resolve(body);
			
		});
	})
}

function getResponseHref(url) {
	return new Promise((resolve, reject) => {
		request(
			{
				url:url,
				headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'}
			}, 	function (error, response, body) {
					resolve(response['request']['uri']['href'])
				}
		);	
	})
	
}

function createCheerio(rawHTML) {
	return cheerio.load(rawHTML)
}

module.exports = {
	getRawHTML,				createCheerio,
	getResponseHref
}