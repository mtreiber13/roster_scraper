const express = require("express");
const pup = require("../web_crawler/pupFunctions")
const bodyParser = require('body-parser');
const cors = require("cors")
const scraper = require("../web_crawler/scrapingFunctions")


const app = express()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

app.get("/", (req:any, res:any) => {
	console.log("responding to root get")
	res.send("API is working at root")
});


interface teamsObj {
	[key:string]: string[]
}

app.post("/get_teams", async (req:any, res:any) => {
	const url = req.body.value
	try {
		let teamLinks:string[] = await scraper.getTeamPages(url)
		console.log("++ Finished /get_teams API call")
		res.json({"teams": teamLinks})
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
})

app.post("/get_roster_data", async (req:any, res:any) => {
	const url = req.body.value
	try{
		let rosterData:string[][] = await scraper.scrapeRosterGrid(url)
		console.log("++ Finished /get_roster_data API call")
		res.json({"data": rosterData})
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
})

app.set('port', process.env.PORT || 2999);

app.listen(2999, () => {
	console.log("++ Server is running")
})


export {};