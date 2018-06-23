import React from 'react';
import { view } from 'react-easy-state';
import store from './Store';

function Meetups({ meetups }) {
  let name = React.createRef();
  let loc = React.createRef();
  let day = React.createRef();
  let time = React.createRef();

  return (
    <div>
    <table className="Meetups">
    <tbody>
    <tr>
      <th>Name</th>
      <th>Location</th>
      <th>Day</th>
      <th>Time</th>
    </tr>
    </tbody>
    { meetups.map((m, index) => { 
        return (
         <tbody key={index}>
         <tr>
           <td>{m.name}</td>
           <td>{m.location}</td>
           <td>{m.day}</td>
           <td>{m.time}</td>
          <td>
          <button onClick={() => {
            store.delete('meetups', m)
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
        <td><input ref={name} type='text' placeholder='Meetup name' /></td>
        <td><input ref={loc} type='text' placeholder='Meetup location' /></td>
        <td><input ref={day} type='text' placeholder='Meetup day' /></td>
        <td><input ref={time} type='text' placeholder='Meetup time' /></td>
        <td><button onClick={() => {
          store.create(
            'meetups', {
              name: name.current.value,
              location: loc.current.value,
              day: day.current.value,
              time: time.current.value,
            }
          )
        }}>
          add meetup
        </button></td>
      </tr>
    </tbody>
    </table>
    </div>
  );
}

export default view(Meetups);
