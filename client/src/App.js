import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Members from './Members.js';

const members = [
    { 
        first_name: 'taylor',
        last_name: 'sather',
        phone_number: '8583828381',
    },
    { 
        first_name: 'jessica',
        last_name: 'sather',
        phone_number: '7604293043',
    },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Members members={members}/>
      </div>
    );
  }
}

export default App;
