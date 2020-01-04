import * as React from 'react';
import Button from "./Button"

export interface containerState {
	urls: string[];
}

export interface containerProps {
	urls: string[];
}

class TableContainer extends React.Component<containerProps, containerState> {
	constructor(props:containerProps) {
		super(props)
		this.state = {
			urls: this.props.urls,
		}

	}

	render() {
		return (
			<div className="TableContainer">
				{this.state.urls.map( (team, index) => {
					return(
						<div key={index.toString()}>
							<Button url={team} text={team}/>
							<br></br>
						</div>
						);
					})
				}
			</div>
		);
	}
}


export default TableContainer;
