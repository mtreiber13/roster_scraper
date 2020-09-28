import React, { useState } from 'react';
import "./Table.css"
import useAxios from 'axios-hooks';

interface tableProps {
	url:string;
}

interface tableState {
	url: string;
	headers:string[];
	rows:string[][];
}

interface apiRes {
	"data":string[][];
}

function Table (props:tableProps) {

   	const [state] = useState<tableState>({ 
      		url: props.url,
      		headers: [],
      		rows: [],
      })


   const [{ data, loading, error}] = useAxios({
		url: 'http://localhost:2999/get_roster_data',
		method: 'POST',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		data: {"value": state.url}
	})

   function renderTableData(rows:string[][]) {
      	return rows.map((player, index) => {
         	return (
	         	<tr key={index}>{
		         	player.map((data, index) => {
		               return (<td key={index}>{data}</td>);
		           	})
		         }</tr>
      		);
         })
   }

   function renderTableHeader(header:string[]) {
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

	interface rosterResponse {
		players:string[][];
		title:string
	}
   function createTable (rosterData:rosterResponse) {
   		try{
   			return (
	   			// creates the table header and the table rows based on the response from the API (given in TableContainer)
	   				<table>
			   			<tbody>
				   			<tr className="Headers">{renderTableHeader(rosterData['players'][0])}</tr>
			               		{renderTableData(rosterData['players'].splice(1))}
				    	</tbody>  
				    </table>   
	    	);
   		} catch (err) {       // displayes error if there is one
   			return (
   				<p> {JSON.stringify(error)} </p>
   				);
   		}
   }
   
   if (loading) {
   	return (
   		<div>
   			<p> LOADING {state.url} </p>
   		</div>
   	)
   }
   if (error) {
   	return (
   		<div>
   			<p> ERROR: {error.toString()} </p>
   		</div>
   	)
   }
   return (
   		<div>
	   		<h2> {data['title']} </h2>
   			{createTable(data)}
   		</div>
   		
   )
}

export default Table;