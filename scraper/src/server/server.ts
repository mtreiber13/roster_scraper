const express = require("express");
const pup = require("../web_crawler/pupFunctions")
const bodyParser = require('body-parser');


const app = express()


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req:any, res:any) => {
	console.log("responding to root get")
	res.send("API is working at root")
});

app.post("/start_scrape", async (req:any, res:any) => {
	console.log("responding to /start_scrape post")
	console.log("BODY = " + JSON.stringify(req.body))
	const url = req.body.value
	const [browser, page] = await pup.setUp(pup.options)
	try {
		console.log("TRYING again")
		console.log(url)
		await pup.goTo(page, url)
		res.send("SUCCESS: navigated to " + url + "\n")	
	} catch (err) {
		res.send("ERROR: " + err + "\nBAD URL = " + url + "\n")
	}
	
	await pup.shutDown(browser)
	
})

app.set('port', process.env.PORT || 2999);

app.listen(2999, () => {
	console.log("server is running")
})


export {};