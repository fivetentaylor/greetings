import { store } from 'react-easy-state';

let stateStore = store({
  members: [],
  fetchMembers: () => {
    fetch('/members')
		  .then( result => result.json() )
		  .then( members => stateStore.members = members );
  },
  createMember: (
    firstname,
    lastname,
    phonenumber,
  ) => {
    fetch('/members', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phonenumber,
      }),
    }).then( () => stateStore.fetchMembers() );
  },
});

export default stateStore;
