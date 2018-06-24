import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';

function Members({ members }) {
  let fn = React.createRef();
  let ln = React.createRef();
  let pn = React.createRef();

  return (
    <div>
    <table className="Members">
    <tbody>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Phone Number</th>
    </tr>
    </tbody>
    { members.map((m, index) => { 
        return (
         <tbody key={index}>
         <tr>
           <td>{m.firstname}</td>
           <td>{m.lastname}</td>
           <td>{m.phonenumber}</td>
          <td>
          <button onClick={() => {
            store.delete('members', m)
          }}>
          delete
          </button>
          </td>
         </tr>
         </tbody>
        )
    })}
    <tbody>
      <tr>
        <td><input ref={fn} type='text' placeholder='first name' /></td>
        <td><input ref={ln} type='text' placeholder='last name' /></td>
        <td><input ref={pn} type='text' placeholder='phone number' /></td>
        <td><button onClick={() => {
          store.create(
            'members', {
              firstname: fn.current.value,
              lastname: ln.current.value,
              phonenumber: pn.current.value
            }
          )
        }}>
          add member
        </button></td>
      </tr>
    </tbody>
    </table>
    </div>
  );
}

export default view(Members);
