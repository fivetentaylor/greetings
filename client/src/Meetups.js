import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';
import { Input, Table, Button } from 'semantic-ui-react'

function Meetups({ meetups }) {
  let name = React.createRef();
  let loc = React.createRef();
  let day = React.createRef();
  let time = React.createRef();

  return (
    <Table className="Meetups">
      <Table.Header>
        <Table.Row>
          <th>Name</th>
          <th>Location</th>
          <th>Day</th>
          <th>Time</th>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      { meetups.map((m, index) => { 
        return (
         <Table.Row key={index}>
           <Table.Cell>{m.name}</Table.Cell>
           <Table.Cell>{m.location}</Table.Cell>
           <Table.Cell>{m.day}</Table.Cell>
           <Table.Cell>{m.time}</Table.Cell>
          <Table.Cell>
          <Button onClick={() => {
            store.delete('meetups', m)
          }}>
          delete
          </Button>
          </Table.Cell>
         </Table.Row>
        )
    })}
      <Table.Row>
        <Table.Cell><Input ref={name} type='text' placeholder='Meetup name' /></Table.Cell>
        <Table.Cell><Input ref={loc} type='text' placeholder='Meetup location' /></Table.Cell>
        <Table.Cell><Input ref={day} type='text' placeholder='Meetup day' /></Table.Cell>
        <Table.Cell><Input ref={time} type='text' placeholder='Meetup time' /></Table.Cell>
        <Table.Cell><Button onClick={() => {
          store.create(
            'meetups', {
              name: name.current.inputRef.value,
              location: loc.current.inputRef.value,
              day: day.current.inputRef.value,
              time: time.current.inputRef.value,
            }
          )
        }}>
          add meetup
        </Button></Table.Cell>
      </Table.Row>
    </Table.Body>
    </Table>
  );
}

export default view(Meetups);
