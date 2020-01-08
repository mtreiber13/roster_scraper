import React, { useState } from 'react';
import Table from "./Table"

export interface containerState {
	urls: string[];
}

export interface containerProps {
	urls: string[];
}

function TableContainer (props:containerProps) {
	const [state] = useState<containerState>({ 
      		urls: props.urls
      })

	return (
		<div className="TableContainer">
			{state.urls.map( (team:string, index:number) => {
				return(
					<div key={index.toString()}>
						<Table url={team}/>
						<br></br>
					</div>
					);
				})
			}
		</div>
	);
}


export default TableContainer;
