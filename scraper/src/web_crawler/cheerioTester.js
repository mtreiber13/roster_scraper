var fs = require('fs');
const cheerio = require("cheerio")

// $ = cheerio.load(fs.readFileSync('./someHTML.html'));


// 	let rows = $('table#DataTables_Table_0').find('tr')
// 	let players = []
// 	rows.each(function (index, value) {
// 		let data = []
// 		let children = $(this).children()
// 		console.log(children.length)
// 		for (let i = 0; i < children.length; i++) {
// 			data.push($(children[i]).text())
// 		}
// 		players.push(data)
// 	})
// 	let resp = {
// 		players: players
// 	}

// console.log(resp)

