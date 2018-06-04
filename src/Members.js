import React from 'react';

function Members({members}) {
    return (
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
    );
}

export default Members;
