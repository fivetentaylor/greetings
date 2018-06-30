import React, { Component } from 'react';
import { view } from 'react-easy-state';
import { Button } from 'semantic-ui-react'

import logo from './logo.svg';
import './App.css';
import store from './Store';

import Members from './Members.js';
import Meetups from './Meetups.js';
import Assignments from './Assignments.js';

function selectPage(page) {
  if(store.page == 'members')
      return <Members members={ store.members }/>;
  if(store.page == 'meetups')
      return <Meetups meetups={ store.meetups }/>;
  if(store.page == 'assignments')
      return <Assignments assignments={ store.assignments }/>;
}

class App extends Component {
	componentDidMount() {
    store.get('members');
    store.get('meetups');
    store.get('assignments');
	}

  render() {
    return (
      <div className="App">
        <Button onClick={ () => { store.page = 'members' } }>Members</Button>
        <Button onClick={ () => { store.page = 'meetups' } }>Meetups</Button>
        <Button onClick={ () => { store.page = 'assignments' } }>Assignments</Button>
        
        { selectPage( store.page ) }
      </div>
    );
  }
}

export default view(App);
