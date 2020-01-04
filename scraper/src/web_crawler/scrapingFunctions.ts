const cheerio = require("cheerio")
const request = require("request")
const cheer = require("./cheerioLib.js")



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
	return urls;
}

//--------------------------- for specific rosters ----------------------------
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
	return players.filter( (p) => (p.length >= numColumns));
}



module.exports = {
	getTeamPages, 			scrapeRosterGrid,
	createValidUrl, 		findTeamUrls,


};

export {};