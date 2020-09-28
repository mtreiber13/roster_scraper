import * as React from 'react';
import "./Header.css"


export interface HeaderElems {
	title: string;
	name: string;
	logo: string;
}

function Header (props:HeaderElems) {
	const {title, name, logo} = props
	  return (
	    <div className="Header">
	      <div className="Header-title">
	        {title}
	      </div>
	      <div className="Header-name">
	        {name}
	      </div>
	      <div className="Header-logo">
	        <img id="img" alt="me playing" src={logo}/>
	      </div>
	    </div>
	  );
}

export default Header;