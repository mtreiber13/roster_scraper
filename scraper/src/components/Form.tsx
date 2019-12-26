import * as React from 'react';
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
	}

	handleChange(event:any) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event:any) {
		alert('A name was submitted: ' + this.state.value);
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