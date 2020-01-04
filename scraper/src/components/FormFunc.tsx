import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import "./Form.css"
import TableContainer from "./TableContainer"


interface formState {
	value: string;
	showData: boolean;
	teamUrls: string[];
}

function FormFunc () {

	const [state, setTheState] = useState<formState>({
		value: '',
		showData: false,
		teamUrls: []
	})

	const [{ data, loading, error }, refetch] = useAxios({
			url: 'http://localhost:2999/get_teams',
  			method: 'POST',
  			headers: {
  				'Access-Control-Allow-Origin': '*',
  				'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			data: {"value": state.value}
  		}, {manual:true})

	function handleChange(event:any) {
		setTheState({
			value: event.target.value,
			showData: state.showData,
			teamUrls: state.teamUrls
		});
	}

	function handleSubmit(event:any) {
		event.persist()
		event.preventDefault();
		refetch();
		setTheState({
			value: event.target.value,
			showData: true,
			teamUrls: data['teams']
		});
	}

	if (loading) {
		return(
			<div className="FormData">
				<div className="Form">
					<form onSubmit={handleSubmit}>
			        	<p>Enter the school's athletics URL:</p>
			        	<input type="text" value={state.value} onChange={handleChange} />
			        	<br></br>
			        	<input type="submit" value="Submit"/>
			      	</form>
			    </div>
			    <h6> LOADING </h6>
			</div>
		);
	} else if (error) {
		return (
			<div className="FormData">
				<div className="Form">
					<form onSubmit={handleSubmit}>
			        	<p>Enter the school's athletics URL:</p>
			        	<input type="text" value={state.value} onChange={handleChange} />
			        	<br></br>
			        	<input type="submit" value="Submit"/>
			      	</form>
			    </div>
			    <h6> {JSON.stringify(error)} </h6>
			</div>
		);
	} else {
		console.log(data)
		return (
			<div className="FormData">
				<div className="Form">
					<form onSubmit={handleSubmit}>
			        	<p>Enter the school's athletics URL:</p>
			        	<input type="text" value={state.value} onChange={handleChange} />
			        	<br></br>
			        	<input type="submit" value="Submit"/>
			      	</form>
			    </div>
			    <div className="Tables">
					<TableContainer urls={state.teamUrls}/>
				</div>
			</div>
		);
		
	}
}



export default FormFunc;