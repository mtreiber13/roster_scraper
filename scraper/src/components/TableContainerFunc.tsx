import React, { useState } from 'react';
import Button from "./Button"

export interface containerState {
	urls: string[];
}

export interface containerProps {
	urls: string[];
}

function TableContainerFunc (props:string[]) {
	
	const [state, setState] = useState<containerState>({
		urls: props
	})
	console.log(props)
	return (
		<div className="TableContainer">
			{state.urls.map( (team, index) => {
				return(
					<div key={index.toString()}>
						<p> {team} </p>
						<br></br>
					</div>
					);
				})
			}
		</div>
	);
}


export default TableContainerFunc;
