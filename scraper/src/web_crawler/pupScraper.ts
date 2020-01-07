const pup =  require("./pupFunctions.js")

interface pupReturn {
	team:string;
	players:string[][];
}

async function getHTML(page:any) {
	return await page.evaluate(() => document.body.innerHTML);
}

async function pupScrape(url:string) {
	const [browser, page] = await pup.setUp(pup.options)
	await pup.goTo(page, url)
	await page.waitFor(2000)
	let players:string[][] = await page.evaluate( () => {
		let players:string[][] = Array.from($('table#DataTables_Table_0').find('tr')).map( (x) => {
    		return Array.from(x.children).map( (y:any) => y.innerText)
		})	

    	return players
	})
	await pup.shutDown(browser)
	return players;
}

module.exports = {
	pupScrape
}


export {};