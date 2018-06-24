import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';

function Assignments({ assignments }) {
  return (
    <div>
    <table className="Assignments">
    <tbody>
    <tr>
      <th>Member Firstname</th>
      <th>Member Lastname</th>
      <th>Member Phone Number</th>

      <th>Meetup Name</th>
      <th>Meetup Location</th>
      <th>Meetup Day</th>
      <th>Meetup Time</th>
    </tr>
    </tbody>
    { assignments.map((m, index) => { 
        return (
         <tbody key={index}>
         <tr>
           <td>{m.firstname}</td>
           <td>{m.lastname}</td>
           <td>{m.phonenumber}</td>

           <td>{m.name}</td>
           <td>{m.location}</td>
           <td>{m.day}</td>
           <td>{m.time}</td>
         </tr>
         </tbody>
        )
    })}
    </table>
    </div>
  );
}

export default view(Assignments);
