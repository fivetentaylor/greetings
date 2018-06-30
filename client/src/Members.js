import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';
import { Input, Table, Button } from 'semantic-ui-react'

function Members({ members }) {
  let fn = React.createRef();
  let ln = React.createRef();
  let pn = React.createRef();

  return (
    <Table className="Members">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Firstname</Table.HeaderCell>
        <Table.HeaderCell>Lastname</Table.HeaderCell>
        <Table.HeaderCell>Phone Number</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
    { members.map((m, index) => { 
        return (
         <Table.Row key={index} >
           <Table.Cell>{m.firstname}</Table.Cell>
           <Table.Cell>{m.lastname}</Table.Cell>
           <Table.Cell>{m.phonenumber}</Table.Cell>
          <Table.Cell>
          <Button onClick={() => {
            store.delete('members', m)
          }}>
          delete
          </Button>
          </Table.Cell>
         </Table.Row>
        )
    })}
      <Table.Row>
        <Table.Cell><Input ref={fn} type='text' placeholder='first name' /></Table.Cell>
        <Table.Cell><Input ref={ln} type='text' placeholder='last name' /></Table.Cell>
        <Table.Cell><Input ref={pn} type='text' placeholder='phone number' /></Table.Cell>
        <Table.Cell><Button onClick={() => {
          store.create(
            'members', {
              firstname: fn.current.inputRef.value,
              lastname: ln.current.inputRef.value,
              phonenumber: pn.current.inputRef.value
            }
          )
        }}>
          add member
        </Button></Table.Cell>
      </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default view(Members);
