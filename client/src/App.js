import React, { Component } from 'react';
import { view } from 'react-easy-state';
import logo from './logo.svg';
import './App.css';
import store from './Store';

import Members from './Members.js';
import Meetups from './Meetups.js';
import Assignments from './Assignments.js';

class App extends Component {
	componentDidMount() {
    store.get('members');
    store.get('meetups');
    store.get('assignments');
	}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Members members={ store.members }/>
        <Meetups meetups={ store.meetups }/>
        <Assignments assignments={ store.assignments }/>
      </div>
    );
  }
}

export default view(App);
