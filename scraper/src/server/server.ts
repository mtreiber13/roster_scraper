const express = require("express");
const pup = require("../web_crawler/pupFunctions")
const bodyParser = require('body-parser');
const cors = require("cors")
const scraper = require("../web_crawler/siteScraper")


const app = express()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

app.get("/", (req:any, res:any) => {
	console.log("responding to root get")
	res.send("API is working at root")
});

app.post("/start_scrape", async (req:any, res:any) => {
	const url = req.body.value
	const [browser, page] = await pup.setUp(pup.options)
	try {
		await pup.goTo(page, url)
		await page.waitFor(40000)
		let links:string [] = await scraper.getSportLinks(page)
		console.log("GOT LINKS")
		await page.waitFor(40000)
		res.send(links)
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
	
	await pup.shutDown(browser)
	
})

app.set('port', process.env.PORT || 2999);

app.listen(2999, () => {
	console.log("++ Server is running")
})


export {};