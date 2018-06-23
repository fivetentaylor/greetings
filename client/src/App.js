import React, { Component } from 'react';
import { view } from 'react-easy-state';
import logo from './logo.svg';
import './App.css';
import store from './Store';

import Members from './Members.js';
import Meetups from './Meetups.js';

class App extends Component {
	componentDidMount() {
    store.get('members');
    store.get('meetups');
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
      </div>
    );
  }
}

export default view(App);
