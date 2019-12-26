import * as React from 'react';
import "./Header.css"


export interface HeaderElems {
	title: string;
	name: string;
	logo: string;
}

class Header extends React.Component<HeaderElems, {}> {
  render() {
	  const {title, name, logo} = this.props

	  return (
	    <div className="Header">
	      <div className="Header-title">
	        {title}
	      </div>
	      <div className="Header-name">
	        {name}
	      </div>
	      <div className="Header-logo">
	        <img id="img" src={logo}/>
	      </div>
	    </div>
	  );
	}
}

export default Header;