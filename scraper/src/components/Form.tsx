import * as React from 'react';
// import axios from 'axios';
import "./Form.css"


export interface FormFields {
	url: string
}

class Form extends React.Component<{}, {value:string}> {
	constructor(props:any) {
	  	super(props);
	  	this.state = {value: ''}
	  	this.handleChange = this.handleChange.bind(this);
	  	this.handleSubmit = this.handleSubmit.bind(this);
	  	this.scrape = this.scrape.bind(this);
	}

	async scrape () {
		console.log("_____________________________________")
		console.log("STATE = " + JSON.stringify(this.state))
		await fetch('http://localhost:2999/start_scrape', {
  			method: 'POST',
  			mode: 'no-cors',
  			headers: {
  				'Accept': 'application/json',
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({"value": this.state.value})
  		})
  			.then((response) => console.log('sent url...'))
			.catch((e) => console.log("ERROR: " + e))
	}

	handleChange(event:any) {
		this.setState({value: event.target.value});
		console.log(this.state)
	}

	async handleSubmit(event:any) {
		console.log(this.state)
		await this.scrape()
    	event.preventDefault();
	}
	render() {	
		return(
			<div className="Form">
				<form onSubmit={this.handleSubmit}>
		        	<p>Enter the school's athletics URL:</p>
		        	<input type="text" value={this.state.value} onChange={this.handleChange} />
		        	<br></br>
		        	<input type="submit" value="Submit"/>
		      	</form>
		    </div>
		);
	}
}

export default Form;