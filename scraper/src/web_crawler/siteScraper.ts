const pup = require("../web_crawler/pupFunctions")

async function getSportLinks(page:any) {
	console.log("++ Getting links")
	return await page.evaluate( () => {
		let htmlColl:any = document.forms;
		try {
			htmlColl = document.querySelectorAll('[aria-label="Teams"]')[0].children
		} catch {
			console.log("** Did not find any teams using `aria-label=\"Teams\"")
			return ["SOME ERROR"]
			try {
				htmlColl = document.querySelectorAll('[aria-label="Sports"]')[0].children
			} catch {
				console.log("** Did not find any teams using `aria-label=\"Sports\"")
				return ["SOME ERROR"]
			}
		}

		return [...htmlColl].map( (x) => {
			if (undefined == x.children[2]) 
				{
					return undefined
				} else {
					return x.children[2].href
				}
			}).filter( (x) => x != undefined)
	})
}



export {
	getSportLinks
}