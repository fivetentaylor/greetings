import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Members from './Members.js';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { members: [] };
	}

	componentDidMount() {
		fetch('/members')
		  .then( result => result.json() )
		  .then( members => this.setState({ members }) );
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Members members={this.state.members}/>
      </div>
    );
  }
}

export default App;
