const cheerio = require("cheerio")
const request = require("request")
const cheer = require("./cheerioLib")
const pup = require("./pupScraper")


//--------------------------- core functions ----------------------------
async function createValidUrl(url:string) {
	let newUrl = await cheer.getResponseHref(url)
	return (newUrl + "?&print=true")
}
//--------------------------- for overall college ----------------------------
function findTeamUrls(rawHTML:string) {
	let $:any = cheerio.load(rawHTML)
	let teams =  $('a[href*="/roster.aspx?path="]')
	return teams;
}

async function getTeamPages(url:string) {
	let goodUrl = await createValidUrl(url)
	let raw = await cheer.getRawHTML(goodUrl)
	let hrefJSON:any = findTeamUrls(raw)
	let urls:string[] = []
	for (var key in hrefJSON) {
		try {
			let path = hrefJSON[key]['attribs']['href']
			if (path != undefined) {
				urls.push(url + path)	
			}
		} catch {
		}
	}
	let newUrls:string[] = []
	urls.map((x) => {
		if (!newUrls.includes(x)) {
			newUrls.push(x)
		}
	})
	return newUrls;
}

//--------------------------- for specific rosters ----------------------------
interface rosterResponse {
	players:string[][];
	title:string
}
async function scrapeRosterGrid(url:string, numColumns:number=4) {
	let goodUrl = await createValidUrl(url)
	let raw = await cheer.getRawHTML(goodUrl)
	let $ = cheer.createCheerio(raw)
	let rows = $('table').find('tr')
	let players:any[] = []
	rows.each(function (this:CheerioElement, index:number, value:any) {
		let data:string[] = []
		let children:any = $(this).children()
		for (let i = 0; i < children.length; i++) {
			data.push($(children[i]).text())
		}
		players.push(data)
	})
	let title:string = $('h2').eq(0).text()
	players = players.filter( (p) => (p.length >= numColumns))
	if (players.length == 0){
		players = await pup.pupScrape(goodUrl)
	}
	let resp:rosterResponse = {
		players: players,
		title: title
	}
	return resp;
}



module.exports = {
	getTeamPages, 			scrapeRosterGrid,
	createValidUrl, 		findTeamUrls,


};

export {};