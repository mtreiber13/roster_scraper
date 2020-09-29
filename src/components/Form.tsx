import * as React from 'react';
import "./Form.css"
import TableContainer from "./TableContainer"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



export interface formState {
	value: string;
	showData: boolean;
	teamUrls: string[];
}

export interface scrapeResponse {
	data:string[][][];
}

class Form extends React.Component<{}, formState> {
	constructor(props:any) {
	  	super(props);
	  	this.state = {
	  		value: '',
	  		showData: false,
	  		teamUrls: []
	  	}
	  	this.handleChange = this.handleChange.bind(this);
	  	this.handleSubmit = this.handleSubmit.bind(this);
	  	this.scrape = this.scrape.bind(this);
	}

	// gets the team URLs from the api
	async scrape () {
		await fetch('https://matthew-treiber.herokuapp.com/get_teams', {
  			method: 'POST',
  			headers: {
  				'Access-Control-Allow-Origin': '*',
  				'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({"value": this.state.value})
  		})
  			.then(async (response) => {
  				if (response.ok) {
  					await response.json().then(json => {
  						this.setState({
  							showData: true,
  							teamUrls: json.teams
  						})
  					})
  				}
  			})
			.catch((e) => console.log("ERROR: " + e))
	}

	// constantly updates the value based on input
	handleChange(event:any) {
		this.setState({value: event.target.value});
	}

	// handles the submit button, makes call to scraper
	async handleSubmit(event:any) {
		event.persist()
		event.preventDefault();
		await this.scrape();
	}


	render() {	
		return(
			<div className="FormData">
				<div className="Form">
					<p>Enter the school's athletics URL:</p>
					<form onSubmit={this.handleSubmit}>
			        	<TextField id="outlined-basic" label="URL" variant="outlined" value={this.state.value} onChange={this.handleChange}/>
			        	<br></br>
			      	</form>
			      	<br></br>
			      	<Button variant="contained" color="primary" onClick={this.handleSubmit}>
        				Get Athlete Data
      				</Button>
			    </div>
			    <div className="Tables">
			    	{ this.state.showData ? <TableContainer urls={this.state.teamUrls}/> : null }
			    </div>
			</div>
		);
	}
}



export default Form;