import React from 'react';

function createMember(
  firstname,
  lastname,
  phoneNumber,
) {
  fetch('/members', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname,
      lastname,
      phoneNumber,
    }),
  });
}

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
           <td>{m.first_name}</td>
           <td>{m.last_name}</td>
           <td>{m.phone_number}</td>
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
      createMember(fn.current.value, ln.current.value, pn.current.value)
    }}>
     add member
    </button>
    </div>
    </div>
  );
}

export default Members;
