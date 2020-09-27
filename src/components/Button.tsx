import * as React from 'react';
import Table from "./Table"


interface buttonProps {
	url:string;
	text:string;
}

interface buttonState {
	url:string;
	text:string;
	showTable:boolean;
}

class Button extends React.Component<buttonProps, buttonState> {
	// Using a class property instead of a constructor
	constructor(props:buttonProps) {
		super(props)
		this.state = {
			url: this.props.url,
			text: this.props.text,
			showTable: false,
		}
	}

	createTable() {
		this.setState({showTable:true})
	}
  	

  	render() {
        return (
        	<div>
	            <button onClick={() => {
	            	this.setState({showTable:true})
	            }}>
	            	{this.state.text}
	            </button>
	            <div className="Tables">
			    	{ this.state.showTable ? <Table url={this.state.url}/> : null }
			    </div>
	        </div>
		);
    }
}



export default Button;