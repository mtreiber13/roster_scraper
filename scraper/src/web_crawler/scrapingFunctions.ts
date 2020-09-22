// contains two anys, coudlnt figure out how to make them be real types

const cheerio = require("cheerio")
const request = require("request")
const cheer = require("./cheerioLib")
const pup = require("./pupScraper")


// converts a roster url that was scraped from home to page to 
// one that can be used to scrape roster data
// input: url to a specific team
// output: url to print page of roster to be scraped
async function createValidUrl(url:string) {
	let newUrl = await cheer.getResponseHref(url)
	return (newUrl + "?&print=true")
}

// scrapes the links to all teams on the school's page
// input: school athletics url
// output: string[] of urls to specific tems
function findTeamUrls(rawHTML:string) {			// helper
	let $ = cheerio.load(rawHTML)
	return $('a[href*="/roster.aspx?path="]')
}
async function getTeamPages(url:string) {
	let goodUrl = await createValidUrl(url)		
	let raw = await cheer.getRawHTML(goodUrl)
	let hrefJSON = findTeamUrls(raw)
	let urls:string[] = []
	for (var key in hrefJSON) {		// create link with correct path
		try {
			let path = hrefJSON[key]['attribs']['href']
			if (path != undefined) {
				urls.push(url + path)	
			}
		} catch {
		}
	}
	// filter out diplicates
	let newUrls:string[] = []
	urls.map((x) => {
		if (!newUrls.includes(x)) {
			newUrls.push(x)
		}
	})
	return newUrls;
}


// scrapes the data for a given roster
// input: url to roster page
// output: rosterResponse{title, players[][]}
interface rosterResponse {
	players:string[][];
	title:string
}
async function scrapeRosterGrid(url:string) {
	let goodUrl = await createValidUrl(url)
	let raw = await cheer.getRawHTML(goodUrl)
	let $ = cheer.createCheerio(raw)
	let rows = $('table').find('tr') // get all table rows -> table ID does not exist in curl
	let players:any[] = [] 
	// get all rows from roster page
	rows.each(function (this:CheerioElement, index:number, value:CheerioElement) {
		let data:string[] = []
		let children:any = $(this).children()
		for (let i = 0; i < children.length; i++) {
			data.push($(children[i]).text())
		}
		players.push(data)
	})
	// get roster title
	let title:string = $('h2').eq(0).text()
	// filter out player rows
	players = players.filter( (p) => (p.length > 3)) // hard coded b/c coaches have 3 columns, usually players have more
	// check to see if we need to the pup scraper
	if (players.length == 0){
		players = await pup.pupScrape(goodUrl)
	}
	let resp:rosterResponse = {
		players: players,
		title: title
	}
	return resp;
}

async function scrapeImageUrls(url:string) {
	let newUrl = await cheer.getResponseHref(url)
	let root = newUrl.split('/sports')[0]
	let raw = await cheer.getRawHTML(url)
	let $ = cheer.createCheerio(raw)
	let rows = $('img')
	let players:string[] = [] 
	rows.each(function (this:CheerioElement, index:number, value:CheerioElement) {
		let link = $(this)['0'].attribs['data-src']
		if(link == undefined){
			return
		}
		players.push(root + link.split('?')[0])
	})
	return players
}

module.exports = {
	getTeamPages, 			scrapeRosterGrid,
	createValidUrl, 		findTeamUrls,
	scrapeImageUrls


};

export {};