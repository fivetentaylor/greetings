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
      <th>first name</th>
      <th>last name</th>
      <th>phone number</th>
    </tr>
    </tbody>
    { members.map((m, index) => { 
        return (
         <tbody key={index}>
         <tr>
           <td>{m.firstname}</td>
           <td>{m.lastname}</td>
           <td>{m.phonenumber}</td>
         </tr>
         </tbody>
        )
    })}
    </table>
    <div>
     <input ref={fn} type='text' placeholder='first name' />
     <input ref={ln} type='text' placeholder='last name' />
     <input ref={pn} type='text' placeholder='phone number' />
    <button onClick={() => {
      store.createMember(fn.current.value, ln.current.value, pn.current.value)
    }}>
     add member
    </button>
    </div>
    </div>
  );
}

export default view(Members);
