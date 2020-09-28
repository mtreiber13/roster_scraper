const bodyParser = require('body-parser');
const cors = require("cors")
const scraper = require("../web_crawler/scrapingFunctions")
const express = require("express")
const path = require('path');
import {Application, Response, Request} from "express";


const app:Application = express()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

// for testing purposes
app.get("/", (req:Request, res:Response) => {
	console.log("responding to root get")
	res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html'));
});

// gets the team urls for a school
// responds json with list of all team URLS
interface teamsObj {
	[key:string]: string[]
}
app.post("/get_teams", async (req:Request, res:Response) => {
	const url = req.body.value
	try {
		let teamLinks:string[] = await scraper.getTeamPages(url)
		console.log("++ Finished /get_teams API call")
		res.json({"teams": teamLinks})
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
})

// gets the data for a single roster page
// responds with a json containing the name of the roster and the player data
interface rosterResponse {
	players:string[][];
	title:string
}
app.post("/get_roster_data", async (req:Request, res:Response) => {
	const url = req.body.value
	try{
		let rosterData:rosterResponse = await scraper.scrapeRosterGrid(url)
		console.log("++ Finished /get_roster_data API call")
		res.json(rosterData)
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
})

// sets the port to 29999 (react runs on 3000)
app.set('port', process.env.PORT || 2999);
app.listen(process.env.PORT || 2999, () => {
	console.log("++ Server is running")
})


export default app;