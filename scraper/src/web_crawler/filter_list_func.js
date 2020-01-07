let l1 = [1,2,3]
let l2 = [1]
let l3 = [1,2,3,4,5,6]

lists = [l1,l1,
		 l2,l2,l2,l2,l2,l2,
		 l3,l3,l3]

console.log(lists)



function filterLongestLists(lists) {
	let listLens = lists.map( x => x.length)
	let uniqLens = [...new Set(listLens)]
	let occurs = {}
	uniqLens.map( x => {
		occurs[x.toString()] = 0
	})
	listLens.map( x => {
		occurs[x.toString()] += 1
	})
	
}