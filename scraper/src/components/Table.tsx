import * as React from 'react';
import "./Table.css"

interface tableProps {
	url:string;
}

interface tableState {
	url: string;
	headers:string[];
	rows:string[][];
}

class Table extends React.Component<tableProps,tableState> {

   	constructor(props:tableProps) {
      	super(props) 
      	this.state = { 
      		url: this.props.url,
      		headers: [],
      		rows: [],
      }
      this.getTableData()
   }

   renderTableData() {
      	return this.state.rows.map((player, index) => {
         	return (
	         	<tr>{
		         	player.map((data, index) => {
		               return (<td>{data}</td>);
		           	})
		         }</tr>
      		);
         })
   }

   renderTableHeader() {
      let header = this.state.headers
      return header.map((key, index) => {
         return <th key={key}>{key.toUpperCase()}</th>
      })
   }


   async getTableData() {
   		await fetch('http://localhost:2999/get_roster_data', {
  			method: 'POST',
  			headers: {
  				'Access-Control-Allow-Origin': '*',
  				'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({"value": this.state.url})
  		})
  			.then(async (response) => {
  				if (response.ok) {
  					await response.json().then(json => {
  						console.log("FROM TABLE = " + JSON.stringify(json.data))
  						if (json.data === []) {
  							this.setState({
	  							headers: [],
	  							rows: [],
  							})
  						} else {
  							this.setState({
  								headers: json.data[0],
  								rows: json.data.splice(1),
  							})
  						}
  					})
  				}
  			})
			.catch((e) => console.log("ERROR: " + e))
		console.log("OUTSIDE FETCH")

   }

   createTable () {
   	return (
   			<tbody>
	   			<tr className="Headers">{this.renderTableHeader()}</tr>
	                  {this.renderTableData()}
	      	</tbody>       
        );
   }

	render() {
	      try{
	      	return (
	        	<div>
	            	<table className='Table'>
	               			{this.createTable()}
	            	</table>
	         	</div>
	      	)
	      } catch (err) {
	      	return(
	      		<div>
	            	<p>
	            		{err.toString()}
	            	</p>
	         	</div>
	         	);
	      }
   }
}

export default Table;

// export interface column {
// 	title: string;
//     dataIndex: string;
//     key: string;
//     width: number;
// }

// export interface row {
// 	[key:string]: string
// }

// function createColumns(colNames:string[]) {
// 	let cols:column[] = []
// 	for (let i = 0; i < colNames.length; i++) {
// 		let newCol:column = {
// 			title: colNames[i],
// 			dataIndex: colNames[i],
// 			key: colNames[i],
// 			width: 100
// 		}
// 		cols.push(newCol)
// 	}
// 	return cols;
// }

// function createRows(data:string[][]) {
// 	let colIds:string[] = data[0]
// 	let rows:row[] = []
// 	for (let i = 1; i < data.length; i++) {
// 		let newRow:row = {}
// 		for (let j = 0; j < colIds.length; j++) {
// 			newRow[colIds[j]] = data[i][j]
// 		}
// 		rows.push(newRow)
// 	}
// 	return rows;
// }


// // function createTable(data:string[][]) {
// // 	let cols:column[] = createColumns(data[0])
// // 	let rows:row[] = createRows(data)
// // 	return (
// // 		<div className="Tables">
// // 			<Table columns={cols} data={rows} />
// // 		</div>
// // 	);
// // }

// module.exports = {
// 	createColumns,				createRows,
// 	createTable
// }