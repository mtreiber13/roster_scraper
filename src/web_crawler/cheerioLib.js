// cheerioJS library for scraping use
const cheerio = require("cheerio")
var request = require('request');

// essentially curls to get the HTML from roster page
// input: url to page
// output: raw HTML of page
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

// gets the response URL of a request
// 		used when creating a scrapable URL to give to roster scraper
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

// creates cheerio object
// input: raw HTML
// output: cheerio object
function createCheerio(rawHTML) {
	return cheerio.load(rawHTML)
}

module.exports = {
	getRawHTML,				createCheerio,
	getResponseHref
}