import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';
import { Input, Table, Button } from 'semantic-ui-react'

function Assignments({ assignments }) {
  return (
    <Table className="Assignments">
    <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Member Firstname</Table.HeaderCell>
      <Table.HeaderCell>Member Lastname</Table.HeaderCell>
      <Table.HeaderCell>Member Phone Number</Table.HeaderCell>

      <Table.HeaderCell>Meetup Name</Table.HeaderCell>
      <Table.HeaderCell>Meetup Location</Table.HeaderCell>
      <Table.HeaderCell>Meetup Day</Table.HeaderCell>
      <Table.HeaderCell>Meetup Time</Table.HeaderCell>
    </Table.Row>
    </Table.Header>
    <Table.Body>
    { assignments.map((m, index) => { 
        return (
         <Table.Row key={index} >
           <Table.Cell>{m.firstname}</Table.Cell>
           <Table.Cell>{m.lastname}</Table.Cell>
           <Table.Cell>{m.phonenumber}</Table.Cell>

           <Table.Cell>{m.name}</Table.Cell>
           <Table.Cell>{m.location}</Table.Cell>
           <Table.Cell>{m.day}</Table.Cell>
           <Table.Cell>{m.time}</Table.Cell>
         </Table.Row>
        )
    })}
    </Table.Body>
    </Table>
  );
}

export default view(Assignments);
