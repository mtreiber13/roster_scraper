// This file contains the scraper for teams that have less than 
// 4 columns of data. This function is only called when needed
// as this scraping method is slower and has a higher tedency of
// breaking.

// import the needed libraries
const puppeteer = require('puppeteer');

// prefered options for puppeteer
interface pupOptions {
	headless: boolean;
	ignoreHTTPSErrors: boolean;
	pipe: boolean;
	slowMo: number;
}
const options:pupOptions = {
    headless: true, // run in headless mode
    ignoreHTTPSErrors: true, // self explantory
    pipe: true,     // use pipes instead of websocket (no dev port opened)
    slowMo: 100,    // slow down the process slightly for clipping issues
}

// does the puppeteer set up (creates browser, page)
// open browser and go to page, wait for it to load
async function setUp() {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1100});
    console.log('-- Started Browser');
    return [browser, page];
}

// shuts down puppeteer operations 
// browser = puppeteer object   
async function shutDown(browser:any){
    await browser.close();
    console.log('-- Closed Browser')
}

interface pupReturn {
	team:string;
	players:string[][];
}

// gets url from the page puppeteer object
// input: page object
// output: the HTML of the current page location
async function getHTML(page:any) {
	return await page.evaluate(() => document.body.innerHTML);
}

// scrapes all roster data from any roster page that is found in
// on the print screen
// input: url to roster (in print form)
// output: string[][] 
async function pupScrape(url:string) {
	// get browser and page object
	const [browser, page] = await setUp()
	// go to the desired URL
	await page.goto(url)
	await page.waitFor(2000)	// extra buffer to allow page to load -> this might break if connection is bad and more time is needed
	// scrape the roster data
	let players:string[][] = await page.evaluate( () => {
		let players:string[][] = Array.from($('table#DataTables_Table_0').find('tr')).map( (x) => {
    		return Array.from(x.children).map( (y:any) => y.innerText)
		})	
    	return players
	})
	await shutDown(browser)
	return players;
}

module.exports = {
	pupScrape, getHTML
}


export {};