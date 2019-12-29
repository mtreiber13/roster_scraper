const pup = require("./pupFunctions")
const cheerio = require("cheerio")

async function getHTML(page:any) {
	return await page.evaluate(() => document.body.innerHTML);
}

function getUrls(rawHTML:string) {
	let $:any = cheerio.load(rawHTML)
	let teams =  $('a[href*="/roster.aspx?path="]')
	// console.log(teams)
	return teams;
}

async function run(college:string) {
	let [browser, page] = await pup.setUp(pup.options)
	await pup.goTo(page, college)
	let rawHTML = await getHTML(page)
	let hrefJSON:any = getUrls(rawHTML)
	let urls:string[] = []
	for (var key in hrefJSON) {
		try {
			let url = hrefJSON[key]['attribs']['href']
			if (url != undefined) {
				urls.push(college + url)	
			}
		} catch {
		}
	}
	await pup.shutDown(browser)
	return urls;
}

async function runner() {
	let result = await run("https://nusports.com/")
	console.log(result)
}

runner()

export {};