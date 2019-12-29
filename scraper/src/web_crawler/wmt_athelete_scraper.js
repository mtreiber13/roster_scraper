const pup = require("./pupFunctions.js")
const fs = require ("fs")


async function scrapePlayers(page) {
	return await page.evaluate( () => {
		let athletes = [...document.querySelectorAll("div.person__info")].map( f => {
			let name = f.children[0].children[0].textContent.split(' ').filter(n => n != "").join(' ')
			let [height, weight] = ["n/a", "n/a"]
			let [pos, year, idc] = ["n/a", "n/a", "n/a"]
			try {
				[height, weight] = f.children[0].children[1].textContent.split(' ').filter(n => n != "")
			} catch (err) {
				
				console.log("-- Could not get height and weight for ", name)
			}
			try {
				[pos, year, idc] = [...f.children[1].children].map(f => f.textContent.split(' ').filter(f => f != "" && f != "Position:" && f != "Year:"))
				pos = pos[0]
				year = year[0]
			} catch (err) {
				console.log("-- Could not get position and year for ", name)
			}
			return {"name": name, "info": {"height": height, "weight": weight, "position": pos, "year": year}}
		})
		return athletes
	})
}

function saveDictAsJSON(dict, filename) {
	fs.writeFile(filename, JSON.stringify(dict), (err) => {
		if (err) {
			console.error(err)
			return
		}
		console.log("JSON file created!")
	})
}

function nameInfoDictToList(nameInfo) {
	newDict = {}
	for (var i = 0; i < nameInfo.length; i++) {
		newDict[nameInfo[i]["name"]] = nameInfo[i]["info"]
	}
	return newDict
}


async function scrape () {
	let [browser, page] = await pup.setUp(pup.options)
	await pup.goTo(page, 'https://ohiostatebuckeyes.com/sports/m-footbl/roster/')

	let player_dict = await scrapePlayers(page)

	saveDictAsJSON(nameInfoDictToList(player_dict), "./ohiostatebuckeyes.json")

	await pup.shutDown(browser)
}
scrape();