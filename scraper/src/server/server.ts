const bodyParser = require('body-parser');
const cors = require("cors")
const scraper = require("../web_crawler/scrapingFunctions")
const express = require("express")
import {Application, Response, Request} from "express";


const app:Application = express()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

// for testing purposes
app.get("/", (req:Request, res:Response) => {
	console.log("responding to root get")
	res.send("API is working at root")
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
		try {
			let imgs:string[] = await scraper.scrapeImageUrls(url)
			rosterData.players.map((x, i) => {
				if(i == 0){
					x.push('Image Url')
				} else {
					x.push(imgs[i-1])	
				}
			})
		} catch (err) {
			res.send("ERROR: " + err + "\nDid not get images!")
		}
		console.log("++ Finished /get_roster_data API call")
		console.log(rosterData)
		res.json(rosterData)
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
})

// sets the port to 29999 (react runs on 3000)
app.set('port', process.env.PORT || 2999);
app.listen(2999, () => {
	console.log("++ Server is running")
})

// const scraper = require("./scrapingFunctions")

// async function runner() {
// 	let grid = await scraper.scrapeRosterGrid('https://rolltide.com/roster.aspx?path=baseball')
	
// 	let res = await scraper.scrapeImageUrls('https://rolltide.com/roster.aspx?path=baseball')
// 	grid.players.map((x, i) => {
// 		if(i == 0){
// 			return
// 		}
// 		x.push(res[i-1])
// 	})
// 	console.log(grid)
// }
// async function tester(){
// 	await runner()
// }

// tester()

export default app;